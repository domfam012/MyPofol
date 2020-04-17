import { useEffect, useState } from "react";
import axios from "axios";
import { loadStorage } from "../../../../public/js/db";
import shortid from "shortid";
import Alert from "../../alert";
import Preview from "../../Preview";

const Step5 = props => {
  const { onNext, onPrev, onClose } = props;

  // 입력값 처리 함수
  const { handleTemplateChange, handleImgChange } = props;

  // 등록 팝업 오픈시 조회한 템플릿 목록
  const { templateList } = props;

  // 등록 중인 사이트 정보, 로고 이미지 미리보기
  const { site, logoImg } = props;

  // 템플릿
  const [template, setTemplate] = useState(site.template);

  // 알림창
  const [openAlert, setOpenAlert] = useState(false);
  const closeAlert = () => {
    setOpenAlert(!openAlert);
  };
  const [msg, setMsg] = useState("");

  // 템플릿 선택 처리
  const handleTemplateSelect = idx => {
    // console.log(idx);
    setTemplate(idx);
    handleTemplateChange(idx);
  };

  // Step 이동
  const handleNext = () => {
    // 선택된 템플릿 있는지 확인
    if (!template) {
      setMsg("템플릿을 선택해주세요.");
      return setOpenAlert(true);
    }

    // 등록 전 사이트 등록 정보 확인
    const isValidate = () => {
      if (!site.name) return false;
      else if (!site.url) return false;
      else if (!site.phone) return false;
      else if (!site.email) return false;
      else if (!site.categoryList) return false;
      else return site.template;
    };

    if (isValidate()) {
      // 로고 이미지 업로드
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
            // firestore storage 로고 이미지 저장 위치 확인
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
              // 이미지 저장 경로(path) 사이트 정보에 저장
              handleImgChange(saveName, url);
            });
          }
        );

        // storage 업로드 에러 핸들러
        const storageErrHandler = err => {
          switch (err.code) {
            case "storage/unauthorized":
              return alert(
                "User doesn't have permission to access the object\n관리자에게 문의해주세요."
              );
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

      // 이미지 업로드 실행
      storageUpload();
    } else {
      // hacking tried
      alert("happy hacking");
    }

    // if(!template) alert('check');
    // else onNext();
  };

  // Firestore 에 사이트 정보 insert
  useEffect(() => {
    const dbUpload = async () => {
      site.userId = localStorage.id;

      const url = site.url;
      const res = await axios.post(
        `${process.env.ASSET_PREFIX}/api/site/${url}`,
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
    <section className="container-fluid init select">
      <h2 className="sr-only">당신의 상세정보를 등록,혹은 편집 하세요.</h2>
      <p className="title font-weight-normal pl">
        <img src="/img/common/4.png" alt="1" />
        마음에 드는 템플릿을 <span className="font-weight-bold">선택</span>
        하세요.
      </p>

      <TemplateList
        key={"pofolTemplates"}
        selected={template}
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
      {openAlert ? <Alert message={msg} closeAlert={closeAlert} /> : ""}
    </section>
  );
};


/*
 *  템플릿 목록
 *  팝업 오픈(./Popup.js)시 조회한 templateList 로 바인딩
 */
const TemplateList = props => {
  const { templateList } = props;
  // 선택된 템플릿
  const { onTemplateSelect } = props;
  const { selected } = props;

  // 템플릿 미리보기
  const [openPreview, setOpenPreview] = useState(false);
  const closePreview = () => setOpenPreview(!openPreview);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewPath, setPreviewPath] = useState("");

  // 미리보기 팝업 열기 | 닫기
  const handlePreview = template => {
    setPreviewTitle(template.title);
    setPreviewPath(template.img.path);
    setOpenPreview(true);
  };

  return (
    <div className="card-box">
      {templateList.map((template, idx) => (
        <div className="d-inline-block" key={template.index}>
          <div
            className={`card mb-4 ${idx % 3 === 2 ? "mr-0" : ""} ${
              idx + 1 === selected ? "active" : ""
            }`}
          >
            <div className="img">
              {template.img ? (
                <img
                  src={template.img.path}
                  alt="템플릿 이미지"
                  style={{
                    width: "100%",
                    height: "118px"
                  }}
                />
              ) : (
                <p>
                  <i className="far fa-image" />
                </p>
              )}
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
              <button className="btn btn-primary" onClick={() => handlePreview(template)}>
                미리보기
              </button>
            </div>
          </div>
        </div>
      ))}
      {openPreview ? <Preview title={previewTitle} path={previewPath} closePreview={closePreview} /> : ""}
    </div>
  );
};

export default Step5;
