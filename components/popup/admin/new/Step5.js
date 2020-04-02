import { useEffect, useState } from "react";
import axios from "axios";

const Step5 = props => {
  const { onNext, onPrev, onClose } = props;
  const { handleTemplateChange } = props;
  const { templateList } = props;
  const { site } = props;
  const [template, setTemplate] = useState(site.template);

  const handleTemplateSelect = idx => {
    setTemplate(idx);
    handleTemplateChange(idx);
  };

  const handleNext = () => {
    // template 선택 확인
    // site 에서 전체 확인

    if(!template) return alert('template!');

    const isValidate = () => {
      if(!site.name) return false;
      else if(!site.url) return false;
      else if(!site.tel) return false;
      else if(!site.email) return false;
      else if(!site.categoryList) return false;
      else return site.template;
    };

    if(isValidate()) {
      console.log('site insert');
      console.log(site);

      const register = async () => {
        const url = site.url;
        const res = await axios.post(`http://localhost/api/site/${url}`, site);
        console.log(res);
        if(res.status === 200) onNext();
        else {
          alert('error occured');
          onClose();
        }
      };

      register();
    } else {
      alert('happy hacking');
    }

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
  );
};

const TemplateList = props => {
  const { templateList } = props;
  const { onTemplateSelect } = props;

  return (
    <div className="card-box">
      {templateList.map((template, idx) => (
        <div className="d-inline-block" key={template.index}>
          <div className={`card ${idx % 3 === 2 ? "mr-0" : ""}`}>
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
              <button className="btn btn-primary">미리보기</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Step5;
