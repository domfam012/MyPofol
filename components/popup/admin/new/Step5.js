import { useEffect, useState } from "react";
import axios from "axios";
import { loadStorage } from "../../../../public/js/db";
import shortid from "shortid";
import Alert from "../../alert";

const Step5 = props => {
  const { onNext, onPrev, onClose } = props;
  const { handleTemplateChange, handleImgChange } = props;
  const { templateList } = props;
  const { site, logoImg } = props;
  const [template, setTemplate] = useState(site.template);

  const [openAlert, setOpenAlert] = useState(false);
  const closeAlert = () => {
    setOpenAlert(!openAlert);
  };
  const [msg, setMsg] = useState("");

  const handleTemplateSelect = idx => {
    setTemplate(idx);
    handleTemplateChange(idx);
  };

  const handleNext = () => {
    // template 선택 확인
    // site 에서 전체 확인

    if (!template) {
      setMsg("템플릿을 선택해주세요.");
      return setOpenAlert(true);
    }

    const isValidate = () => {
      if (!site.name) return false;
      else if (!site.url) return false;
      else if (!site.phone) return false;
      else if (!site.email) return false;
      else if (!site.categoryList) return false;
      else return site.template;
    };

    if (isValidate()) {
      console.log(`site: ${JSON.stringify(site)}`);

      const storageUpload = async () => {
        const storage = await loadStorage();
        const saveName = shortid.generate();
        const storageRef = storage.ref(`site/${site.url}/${saveName}`);
        const uploadTask = storageRef.put(logoImg);

        uploadTask.on(
          "state_changed",
          () => {},
          err => storageErrHandler(err),
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
              handleImgChange(saveName, url);
            });
          }
        );

        const storageErrHandler = err => {
          switch (err.code) {
            case "storage/unauthorized":
              return alert("User doesn't have permission to access the object\n관리자에게 문의해주세요.");
            case "storage/canceled":
              setMsg("이미지 업로드가 취소되었습니다.");
              return setOpenAlert(true);
            case "storage/unknown":
              return alert(
                "Unknown error occurred, inspect error.serverResponse\n관리자에게 문의해주세요."
              );
          }
        };
      };

      storageUpload();
    } else {
      alert("happy hacking");
    }

    // if(!template) alert('check');
    // else onNext();
  };

  useEffect(() => {
    const dbUpload = async () => {
      site.userId = localStorage.id;

      const url = site.url;
      const res = await axios.post(
        `http://localhost:8080/api/site/${url}`,
        site
      );
      // console.log(res);
      if (res.status === 200) onNext();
      else {
        setMsg("알 수 없는 오류가 발생했습니다.\n관리자에게 문의해주세요.");
        setOpenAlert(true);
        onClose();
      }
    };
    if (site.logo.saveName && site.logo.path) dbUpload();
  }, [site.logo]);

  return (
    <>
      {openAlert ? (
        <Alert message={msg} closeAlert={closeAlert} />
      ) : (
        <section className="container-fluid init select">
          <h2 className="sr-only">당신의 상세정보를 등록,혹은 편집 하세요.</h2>
          <p className="title font-weight-normal pl">
            <img src="/img/common/4.png" alt="1" />
            마음에 드는 템플릿을 <span className="font-weight-bold">선택</span>
            하세요.
          </p>

          <TemplateList
            key={"pofolTemplates"}
            templateList={templateList}
            onTemplateSelect={handleTemplateSelect}
          />

          <div className="btn-area mb mb-5">
            <button
              className="btn btn-xl btn-outline-secondary mr"
              onClick={onPrev}
            >
              이전
            </button>
            <button className="btn btn-xl btn-primary" onClick={handleNext}>
              다음
            </button>
          </div>
        </section>
      )}
    </>
  );
};

const TemplateList = props => {
  const { templateList } = props;
  const { onTemplateSelect } = props;

  const handlePreview = () => {
    //  template.preview => modal
  };

  return (
    <div className="card-box">
      {templateList.map((template, idx) => (
        <div className="d-inline-block" key={template.index}>
          <div className={`card mb-4 ${idx % 3 === 2 ? "mr-0" : ""}`}>
            <div className="img">
              <p>
                <i className="far fa-image" />
              </p>
            </div>
            <div className="card-body">
              <h3 className="card-title">{template.title}</h3>
            </div>
            <div className="btn-area">
              <button
                className="btn btn-outline-secondary mr-1"
                onClick={() => onTemplateSelect(template.index)}
              >
                선택
              </button>
              <button className="btn btn-primary" onClick={handlePreview}>
                미리보기
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Step5;
