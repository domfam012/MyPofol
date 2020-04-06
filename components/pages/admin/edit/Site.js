import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SITE_STATE } from "../../../../redux/reducers/user";
import Popup from "../../../../components/popup/admin/new/Popup";
import Link from "next/link";

const SiteList = props => {
  const dispatch = useDispatch();
  const setState = idx => {
    dispatch({ type: SITE_STATE, data: { state: "selected", value: idx } });
  };

  return (
    <div className={`site ${props.activeTarget === props.idx ? "active" : ""}`}>
      <span className="site-img">
        <img
          src={`${props.img ? props.img : "/img/common/default_thumbnail.png"}`}
          alt="thumbnail"
        />
      </span>
      <p className="site-body">
        <span className="title">{props.name}</span>
        <Link href="/portfolio/[site]" as={`/portfolio/${props.url}`}>
          <a className="address" href="#">
            http://www.mypofol.com/{props.url}
          </a>
        </Link>
      </p>
      <span className="btn-area">
        <button
          className="btn btn-outline-secondary mr-1"
          onClick={() => setState(props.idx)}
        >
          선택
        </button>
        <Link
          href={`/admin/edit?site=${props.url}`}
          as={`/admin/edit?site=${props.url}`}
        >
          <button className="btn btn-primary">상세</button>
        </Link>
      </span>
    </div>
  );
};

const None = props => {
  return (
    <div className="select">
      <p className="title">사이트를 추가하세요</p>
    </div>
  );
};

const Unselected = props => {
  return (
    <div className="select">
      <p className="title">사이트를 선택하세요</p>
      <p className="desc">
        사이트를 선택하면 관련정보를
        <br />이 곳에서 확인 및 수정 할 수 있습니다.{" "}
      </p>
    </div>
  );
};

const Selected = props => {
  const { logoPath, thumbnailPath, template } = props;
  const [title, setTitle] = useState(props.title);
  const [intro, setIntro] = useState(props.intro);
  const [introLength, setIntroLength] = useState(props.intro.length);
  const [email, setEmail] = useState(props.email);
  const [phone, setPhone] = useState(props.phone);
  const url = props.url;

  const dispatch = useDispatch();
  const setState = () => {
    dispatch({ type: SITE_STATE, data: { state: "unselected", value: 9999 } });
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleIntroChange = e => {
    setIntro(e.target.value);
    setIntroLength(e.target.value.length);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = e => {
    setPhone(e.target.value);
  };

  const handleCancel = () => {
    setState();
  };

  const handleSave = () => {

  };

  return (
    <div className="contents">
      <div className="box">
        <form className="form_site">
          <div className="form-group active">
            <input
              type="text"
              className="form-control"
              title="사이트명"
              placeholder="POTENS"
              value={title}
              onChange={handleTitleChange}
            />
            <span className="site_title">http://www.mypofol.com/{url}</span>
          </div>
        </form>
      </div>

      <div className="box add_logo">
        {logoPath === "" ? (
          <a className="add_logo" href="#">
            <p className="plus">
              <i className="fal fa-plus" />
            </p>
            <p className="txt">로고이미지 추가</p>
          </a>
        ) : (
          <>
            <form className="form_intro">
              <div className="form-group mb-2">
                <span className="img">
                  <img src={logoPath} alt="template" />
                </span>
              </div>
            </form>
            <div className="btn-area mb change">
              <button className="btn btn-secondary">로고 변경</button>
            </div>
          </>
        )}

        <p className="desc">
          -가로 00px X 세로 00px (jpg,png,gif허용)
          <br />- 파일명 영문, 숫자 허용
        </p>
      </div>

      <div className="box add_logo">
        <form className="form_intro">
          <div className="form-group mb-2">
            <span className="img">
              <img
                src={`${
                  thumbnailPath
                    ? thumbnailPath
                    : "/img/common/default_thumbnail.png"
                }`}
                alt="template"
              />
            </span>
          </div>
        </form>
        <div className="btn-area mb change">
          <button className="btn btn-secondary">썸네일 변경</button>
        </div>
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
              value={intro}
              onChange={handleIntroChange}
            />
          </div>
        </form>
        <p className="desc clearfix">
          <span className="float-left">한글기준 200자 이내</span>
          <span className="float-right pr-2">
            <span className="_word">{introLength}</span>/200
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
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              title="이메일"
              placeholder="이메일"
              value={email}
              onChange={handleEmailChange}
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
        <button className="btn btn-lg btn-outline-secondary" onClick={handleCancel}>취소</button>
        <button className="btn btn-lg btn-primary" onClick={handleSave}>저장</button>
      </div>
    </div>
  );
};

const Site = () => {
  const dispatch = useDispatch();

  const [openPopup, setOpenPopup] = useState(false);
  const closePopup = () => {
    setOpenPopup(!openPopup);
  };
  const handlePopup = e => {
    e.preventDefault();
    setOpenPopup(true);
  };

  const site = "test";
  const { userInfo, siteState, siteValue } = useSelector(state => state.user);

  console.log(userInfo);

  useEffect(() => {
      if (Object.keys(userInfo).length !== 0 ){
          userInfo.siteList.length === 0
              ? dispatch({ type: SITE_STATE, data: { state: "none" } })
              : dispatch({ type: SITE_STATE, data: { state: "unselected" } });
      }
  }, []);

  return (
    <>
      {openPopup ? (
        <Popup closePopup={closePopup} />
      ) : (
          Object.keys(userInfo).length !== 0 ?
        <div className="inner clearfix">
          <div className="section-container">
            <section>
              <div className="title_area">
                <h2 className="title">웹사이트 관리</h2>
                <div className="btn-area mb">
                  <button className="btn btn-outline-secondary">삭제</button>
                  <button
                    className="btn btn-primary"
                    onClick={() => setOpenPopup(true)}
                  >
                    새 웹사이트 추가
                  </button>
                </div>
              </div>

              <div className="contents">
                <div className="inner scroll-lg">
                  {userInfo.site.map((item, idx) => (
                    <SiteList
                      key={idx}
                      idx={idx}
                      name={item.name}
                      img={item.thumbnail.path}
                      url={item.url}
                      activeTarget={siteValue !== "" ? siteValue : ""}
                    />
                  ))}

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

          <div className="snb h-auto">
            {siteState === "none" ? (
              <None />
            ) : siteState === "selected" ? (
              <Selected
                title={siteValue !== "" ? userInfo.site[siteValue].name : ""}
                logoPath={userInfo.site[siteValue].logo.path}
                thumbnailPath={userInfo.site[siteValue].thumbnail.path}
                intro={userInfo.site[siteValue].intro}
                email={userInfo.site[siteValue].email}
                phone={userInfo.site[siteValue].phone}
                url={userInfo.site[siteValue].url}
                template={userInfo.site[siteValue].template}
              />
            ) : (
              <Unselected />
            )}
          </div>
        </div> : ''
      )}
    </>
  );
};

export default Site;
