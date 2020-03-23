import React from "react";

const Step3 = () => {
  return (
    <section className="container-fluid init detail category">
      <h2 className="sr-only">당신의 상세정보를 등록,혹은 편집 하세요.</h2>
      <p className="title font-weight-normal pl">
        <img src="/img/common/3.png" alt="1" />
        당신의 웹사이트에 필요한
        <span className="font-weight-bold"> 카테고리를 등록</span>하세요.
      </p>
      <div className="sub">
        <p>카테고리는 최소1개~8개까지 등록 가능해요.</p>
      </div>
      <form className="form_info detail">
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-1"
            title="카테고리"
            placeholder="카테고리*"
            style={{"width": "400px"}}
          />
        </div>
        <div className="form-group d-inline-block add">
          <input
            type="text"
            className="form-control d-inline-block"
            title="카테고리"
            placeholder="카테고리*"
            style={{"width": "400px"}}
          />
        </div>
        <div className="d-inline-block">
          <button className="btn btn-lg btn-primary">카테고리 추가</button>
        </div>
      </form>
      <div className="btn-area mb mb-5">
        <button className="btn btn-xl btn-outline-secondary mr">이전</button>
        <button className="btn btn-xl btn-primary">다음</button>
      </div>
    </section>
  );
};

export default Step3;
