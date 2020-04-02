import { useEffect, useState } from "react";
import axios from "axios";

const Step4 = props => {
  const { onNext, onPrev, onClose } = props;
  const { handleTemplateChange } = props;
  const { site } = props;
  const [template, setTemplate] = useState({});

  const onTemplateChange = e => {
    setTemplate(e.target.value);
    handleTemplateChange(e.target.value);
  };

  const handleNext = () => {
    // template 선택 확인
    // site 에서 전체 확인

    // name: "a"
    // url: "b"
    // tel: "c"
    // email: "d"
    // category: (2) ["e", "f"]
    // template: 1

    console.log(site);
    onNext();

    // if(!template) alert('check');
    // else onNext();
  };

  return (
    <section className="container-fluid init select">
      <h2 className="sr-only">당신의 상세정보를 등록,혹은 편집 하세요.</h2>
      <p className="title font-weight-normal pl">
        <img src="/img/common/4.png" alt="1" />
        마음에 드는 템플릿을 <span className="font-weight-bold">선택</span>
        하세요.
      </p>

      <TemplateList />

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
  );
};

const TemplateList = () => {
  const [templateList, setTemplateList] = useState([]);

  useEffect(() => {
    const fetchTemplate = async () => {
      const res = await axios.get(`http://localhost/api/template/list`);
      setTemplateList(res.data.data);
    };
    fetchTemplate();
  }, []);

  return (
    <div className="card-box">
      {templateList.map((template, idx) => (
          <div className="d-inline-block">
            <div className={`card ${idx%3 === 2 ? 'mr-0' : ''}`}>
              <div className="img">
                <p>
                  <i className="far fa-image" />
                </p>
              </div>
              <div className="card-body">
                <h3 className="card-title">{template.title}</h3>
              </div>
              <div className="btn-area">

                <button className="btn btn-outline-secondary mr-1">선택</button>
                <button className="btn btn-primary">미리보기</button>
              </div>
            </div>
          </div>
      ))}
    </div>
  );
};

export default Step4;
