import React from "react";

const Step4 = () => {
  return (
    <section className="container-fluid init select">
      <h2 className="sr-only">당신의 상세정보를 등록,혹은 편집 하세요.</h2>
      <p className="title font-weight-normal pl">
        <img src="/img/common/4.png" alt="1" />
        마음에 드는 템플릿을 <span className="font-weight-bold">선택</span>
        하세요.
      </p>
      <div className="card-box">
        <div className="d-inline-block">
          <div className="card">
            <div className="img">
              <p>
                <i className="far fa-image" />
              </p>
            </div>
            <div className="card-body">
              <h3 className="card-title">Template A</h3>
            </div>
            <div className="btn-area">
              <button className="btn btn-outline-secondary mr-1">선택</button>
              <button className="btn btn-primary">미리보기</button>
            </div>
          </div>
        </div>
        <div className="d-inline-block">
          <div className="card">
            <div className="img">
              <p>
                <i className="far fa-image"></i>
              </p>
            </div>
            <div className="card-body">
              <h3 className="card-title">Template B</h3>
            </div>
            <div className="btn-area">
              <button className="btn btn-outline-secondary mr-1">선택</button>
              <button className="btn btn-primary">미리보기</button>
            </div>
          </div>
        </div>
        <div className="d-inline-block">
          <div className="card mr-0">
            <div className="img">
              <p>
                <i className="far fa-image" />
              </p>
            </div>
            <div className="card-body">
              <h3 className="card-title">Template C</h3>
            </div>
            <div className="btn-area">
              <button className="btn btn-outline-secondary mr-1">선택</button>
              <button className="btn btn-primary">미리보기</button>
            </div>
          </div>
        </div>
      </div>
      <div className="btn-area mb mb-5">
        <button className="btn btn-xl btn-outline-secondary mr">이전</button>
        <button className="btn btn-xl btn-primary">다음</button>
      </div>
    </section>
  );
};

export default Step4;
