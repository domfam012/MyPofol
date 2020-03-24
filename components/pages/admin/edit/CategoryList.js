import { useState } from "react";

const CategoryList = () => {
  const [category, setCategory] = useState([""]);

  return (
    <div className="inner no-mw clearfix">
      <div className="section-container edit">
        <section>
          <div className="title_area manage">
            <h2 className="title">DOMFAM</h2>
            <div className="project">POTENS</div>
            <div className="btn-area mb">
              <button className="btn btn-outline-secondary">삭제</button>
              <button className="btn btn-primary">새 카테고리 추가</button>
            </div>
          </div>
          <div className="contents">
            <div className="inner">
              {category.map(item => (
                <CategoryList />
              ))}
              <a className="site" href="#">
                <span className="plus">
                  <i className="fal fa-plus" />
                </span>
                <span className="txt">새 카테고리 추가</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      <Snb />
    </div>
  );
};

// 임시로 전부 넣어둠
const CategoryList = () => {
  return (
    <>
      <div className="site active">
        <span className="site-img">
          <img src="/img/common/default_thumbnail.png" alt="thumbnail" />
        </span>
        <span className="site-body">
          <span className="title">Categoly 1</span>
        </span>
        <span className="btn-area">
          <button className="btn btn-outline-secondary mr-1">선택</button>
          <button className="btn btn-primary">상세</button>
        </span>
      </div>
      <div className="site hover">
        <span className="site-img">
          <img src="/img/common/default_thumbnail.png" alt="thumbnail" />
        </span>
        <span className="site-body">
          <span className="title">Categoly 2</span>
        </span>
        <span className="btn-area">
          <button className="btn btn-outline-secondary mr-1">선택</button>
          <button className="btn btn-primary">상세</button>
        </span>
      </div>
      <div className="site">
        <span className="site-img">
          <img src="/img/common/default_thumbnail.png" alt="thumbnail" />
        </span>
        <span className="site-body">
          <span className="title">Categoly 3</span>
        </span>
        <span className="btn-area">
          <button className="btn btn-outline-secondary mr-1">선택</button>
          <button className="btn btn-primary">상세</button>
        </span>
      </div>
      <div className="site">
        <span className="site-img">
          <img src="/img/common/default_thumbnail.png" alt="thumbnail" />
        </span>
        <span className="site-body">
          <span className="title">Categoly 4</span>
        </span>
        <span className="btn-area">
          <button className="btn btn-outline-secondary mr-1">선택</button>
          <button className="btn btn-primary">상세</button>
        </span>
      </div>
    </>
  );
};

const Snb = () => {
  return (
    <div className="snb">
      <div className="contents">
        <div className="box">
          <form className="form_site">
            <div className="form-group active">
              <input
                type="text"
                className="form-control"
                title="사이트명"
                placeholder="Categoly 1"
              />
            </div>
          </form>
        </div>
        <div className="box">
          <div className="custom-control custom-radio custom-control-inline mr">
            <input
              type="radio"
              id="pc"
              name="category"
              className="custom-control-input"
            />
            <label className="custom-control-label" htmlFor="pc">
              PC
            </label>
          </div>
          <div className="custom-control custom-radio custom-control-inline">
            <input
              type="radio"
              id="mobile"
              name="category"
              className="custom-control-input"
              checked
            />
            <label className="custom-control-label" htmlFor="mobile">
              MOBILE
            </label>
          </div>
        </div>
        <div className="box add_logo">
          <a className="add_logo" href="#">
            <p className="plus">
              <i className="fal fa-plus" />
            </p>
            <p className="txt">썸네일 이미지 추가</p>
          </a>
          <p className="desc">
            -가로 00px X 세로 00px (jpg,png,gif허용)
            <br />
            -파일명 영문, 숫자 허용
          </p>
        </div>
        <div className="btn-area mb">
          <button className="btn btn-lg btn-outline-secondary">취소</button>
          <button className="btn btn-lg btn-primary">저장</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
