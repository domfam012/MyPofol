import { useState } from "react";

const Step3 = props => {
  const { onNext, onPrev } = props;
  const { handleTelChange, handleEmailChange } = props;
  const { site } = props;
  const [tel, setTel] = useState(site.tel);
  const [email, setEmail] = useState(site.email);

  const onTelChange = e => {
    setTel(e.target.value);
    handleTelChange(e.target.value);
  };
  const onEmailChange = e => {
    setEmail(e.target.value);
    handleEmailChange(e.target.value);
  };

  const handleNext = () => {
    if(!tel) alert('tel!');
    else if(!email) alert('email!');
    else onNext();
  };

  return (
    <section className="container-fluid init detail info-pf">
      <h2 className="sr-only">당신의 상세정보를 등록,혹은 편집 하세요.</h2>
      <p className="title font-weight-normal pl">
        <img src="/img/common/2.png" alt="1" />
        당신의 상세정보를 <span className="font-weight-bold">등록,</span>하세요.
      </p>
      <form className="form_info detail">
        <div className="site_name _sName">Domfam</div>
        <div className="form-group">
          <input
            id={"tel"}
            name={"tel"}
            value={tel}
            onChange={onTelChange}
            type="tel"
            className="form-control mb-1"
            title="연락처"
            placeholder="연락처"
            style={{ width: "400px" }}
          />
        </div>
        <div className="form-group">
          <input
            id={"email"}
            name={"email"}
            value={email}
            onChange={onEmailChange}
            type="email"
            className="form-control d-inline-block"
            title="이메일"
            placeholder="이메일"
            style={{ width: "400px" }}
          />
        </div>
        <div className="add_img">
          {/*
            todo!
            이미지 없을 때, display:none; => 이미지를 넣으면 display:block; 처리
          */}
          <a href="#">
            {/*<span className="plus">*/}
            {/*  <i className="fal fa-plus" />*/}
            {/*</span>*/}
            {/*<span className="txt">로고이미지 추가</span>*/}
            <img src="/img/temp/UI_AA_01.png" alt="로고이미지 추가" />
          </a>
        </div>
      </form>
      <div className="btn-area mb">
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

export default Step3;
