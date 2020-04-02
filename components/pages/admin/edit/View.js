import axios from 'axios'
import Link from 'next/link'
import Index from '../../../../pages'

const View = () => {
  return (
    <div className="inner no-mw clearfix">
      <div className="section-container edit">
        <section>
          <div className="title_area">
            <Link href={'http://localhost/admin/edit?site=ab&category=cd'}>
              <a href="#"><h2 className="title"><i className="far fa-chevron-left"></i>카테고리 명</h2></a>
            </Link>
            <div className="btn-area mb">
              <button className="btn btn-outline-secondary">삭제</button>
              <button className="btn btn-primary">새 이미지 추가</button>
            </div>
          </div>
          <div className="contents">
            <div className="inner">
              <a className="site active" href="#">
                <span className="site-img">
                  <img src="/img/temp/potens.png" alt="potens" />
                </span>
                <span className="site-body">
                  <span className="title">image 01</span>
                </span>
                <span className="btn-area single">
                  <button className="btn btn-outline-secondary mr-1">
                    선택
                  </button>
                </span>
              </a>
              <a className="site" href="#">
                <span className="site-img">
                  <img src="/img/temp/potens.png" alt="potens" />
                </span>
                <span className="site-body">
                  <span className="title">image 02</span>
                </span>
                <span className="btn-area single">
                  <button className="btn btn-outline-secondary mr-1">
                    선택
                  </button>
                </span>
              </a>
              <a className="site" href="#">
                <span className="site-img">
                  <img src="/img/temp/potens.png" alt="potens" />
                </span>
                <span className="site-body">
                  <span className="title">image 03</span>
                </span>
                <span className="btn-area single">
                  <button className="btn btn-outline-secondary mr-1">
                    선택
                  </button>
                </span>
              </a>
              <a className="site" href="#">
                <span className="site-img">
                  <img src="/img/temp/potens.png" alt="potens" />
                </span>
                <span className="site-body">
                  <span className="title">image 04</span>
                </span>
                <span className="btn-area single">
                  <button className="btn btn-outline-secondary mr-1">
                    선택
                  </button>
                </span>
              </a>
              <a className="site add" href="#">
                <p className="plus"><i className="fal fa-plus"></i></p>
                <p className="txt">새 웹사이트 추가</p>
              </a>
            </div>
          </div>
        </section>
      </div>
      <div className="snb">
        <div className="contents">
          <div className="box">
            <form className="form_site">
              <div className="form-group active">
                <input
                  type="text"
                  className="form-control"
                  title="이미지명"
                  placeholder="image 01"
                />
              </div>
            </form>
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
          <div className="box intro">
            <form className="form_intro">
              <div className="form-group mb-1">
                <label htmlFor="introduction" />
                <textarea
                  className="form-control"
                  id="introduction"
                  rows="7"
                  placeholder="이미지 소개글을 입력하세요"
                  style={{ "resize": "none" }}
                />
              </div>
            </form>
            <p className="desc clearfix">
              <span className="float-left">한글기준 200자 이내</span>
              <span className="float-right pr-2">
                <span className="_word">0</span>/200
              </span>
            </p>
          </div>
          <div className="btn-area mb">
            <button className="btn btn-lg btn-outline-secondary">취소</button>
            <button className="btn btn-lg btn-primary">저장</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Index.getInitialProps = async function(ctx) {
  const page = ctx.query.page || "1"; // default page index
  // const res = await fetch(
  //   `${process.env.ASSET_PREFIX}/api/template/[id]`
  // );
  const res = await axios.get(
    `http://localhost/api/template/list`
  );
  return {
    data: res.data.data
  };
};

export default View;
