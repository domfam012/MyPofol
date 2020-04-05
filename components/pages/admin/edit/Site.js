import { useState } from "react";
import Popup from "../../../../components/popup/admin/new/Popup";
import Link from 'next/link'

const Site = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const closePopup = () => {
    setOpenPopup(!openPopup);
  };
  const handlePopup = e => {
    e.preventDefault();
    setOpenPopup(true);
  };

    const site = 'test';
  return (
    <>
      {openPopup ? (
        <Popup closePopup={closePopup} />
      ) : (
        <div className="inner clearfix">
          <div className="section-container">
            <section>
              <div className="title_area">
                <h2 className="title">웹사이트 관리</h2>
                <div className="btn-area mb">
                  <button className="btn btn-outline-secondary">삭제</button>
                  <button className="btn btn-primary" onClick={() => setOpenPopup(true)}>새 웹사이트 추가</button>
                </div>
              </div>
              <div className="contents">
                <div className="inner">
                  <div className="site active">
                    <span className="site-img">
                      <img
                        src="/img/common/default_thumbnail.png"
                        alt="thumbnail"
                      />
                    </span>
                    <p className="site-body">
                      <span className="title">POTENS</span>
                      <a className="address" href="#">
                        http://www.mypofol.com/domfam
                      </a>
                    </p>
                    <span className="btn-area">
                      <button className="btn btn-outline-secondary mr-1">
                        선택
                      </button>
                      <button className="btn btn-primary">상세</button>
                    </span>
                  </div>
                    <div className="site active">
                    <span className="site-img">
                      <img
                          src="/img/common/default_thumbnail.png"
                          alt="thumbnail"
                      />
                    </span>
                        <p className="site-body">
                            <span className="title">베스킨라빈스</span>
                            <Link href={`/portfolio/${site}`} as={`/portfolio/${site}`}>
                                <a className="address" href="#">
                                    http://www.mypofol.com/test
                                </a>
                            </Link>
                        </p>
                        <span className="btn-area">
                      <button className="btn btn-outline-secondary mr-1">
                        선택
                      </button>
                      <Link href={`/admin/edit?site=${site}`} as={`/admin/edit?site=${site}`}>
                    <button className="btn btn-primary">상세</button>
                  </Link>
                    </span>
                    </div>
                  <a className="site add" href="#" onClick={handlePopup}>
                    <p className="plus">
                      <i className="fal fa-plus" />
                    </p>
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
                      title="사이트명"
                      placeholder="POTENS"
                    />
                    <span className="site_title">
                      http://www.mypofol.com/domfam
                    </span>
                  </div>
                </form>
              </div>
              <div className="box add_logo">
                <a className="add_logo" href="#">
                  <p className="plus">
                    <i className="fal fa-plus" />
                  </p>
                  <p className="txt">로고이미지 추가</p>
                </a>
                <p className="desc">
                  -가로 00px X 세로 00px (jpg,png,gif허용)
                  <br />- 파일명 영문, 숫자 허용
                </p>
              </div>
              <div className="box add_text">
                <form className="form_intro">
                  <div className="form-group mb-1">
                    <label htmlFor="introduction"></label>
                    <textarea
                      className="form-control"
                      id="introduction"
                      rows="7"
                      placeholder="웹사이트 소개글을 입력하세요"
                      style={{ resize: "none" }}
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
              <div className="box mb-3">
                <form className="form_site">
                  <div className="form-group mb-2">
                    <input
                      type="tel"
                      className="form-control"
                      title="연락처"
                      placeholder="연락처"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      title="이메일"
                      placeholder="이메일"
                    />
                  </div>
                </form>
              </div>
              <div className="box">
                <form className="form_intro">
                  <div className="form-group mb-2">
                    <span className="img">
                      <img src="/img/temp/UI_AA_01.png" alt="template" />
                    </span>
                  </div>
                </form>
                <div className="btn-area mb change">
                  <button className="btn btn-secondary">템플릿 변경</button>
                </div>
              </div>
              <div className="btn-area mb">
                <button className="btn btn-lg btn-outline-secondary">
                  취소
                </button>
                <button className="btn btn-lg btn-primary">저장</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Site;
