import React, {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_SITE, SITE_STATE } from "../../../../redux/reducers/user";
import Popup from "../../../../components/popup/admin/new/Popup";
import Link from "next/link";

import axios from "axios";
import { loadStorage } from "../../../../public/js/db";

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
  const { template } = props;
  const [title, setTitle] = useState(props.title);
  const [intro, setIntro] = useState(props.intro);
  const [introLength, setIntroLength] = useState(props.intro.length);
  const [email, setEmail] = useState(props.email);
  const [phone, setPhone] = useState(props.phone);
  const url = props.url;

  const [logo, setLogo] = useState(props.logoPath);                 // preview
  const inputLogoEl = useRef(null);                       // file
  const [thumbnail, setThumbnail] = useState(props.thumbnailPath);  // preview
  const inputThumbnailEl = useRef(null);                  // file

  const dispatch = useDispatch();
  const setState = () => {
    dispatch({ type: SITE_STATE, data: { state: "unselected", value: 9999 } });
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleIntroChange = e => {
    if(e.target.value.length < 201) {
      setIntro(e.target.value);
      setIntroLength(e.target.value.length);
    }
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = e => {
    setPhone(e.target.value);
  };

  // const [ template ]
  const handleTemplateChange = () => {

  };



  // const handleLogoChange = (saveName, path) => setSite({ ...site, logo: { saveName: saveName, path: path } });
  // const handleLogoFile = val => setLogoFile(val);
  // const handleThumbnailChange = (saveName, path) => setSite({ ...site, thumbnail: { saveName: saveName, path: path } });
  // const handleThumbnailFile = val => setThumbnailFile(val);



  const handleCancel = () => {
    setState();
  };

  const handleSave = async () => {
    // const storage = await loadStorage();
    // const storageRef = storage.ref(`site/${props.site}/category/${props.id}`);
    // const uploadTask = storageRef.put(img);

    // uploadTask.on(
    //     "state_changed",
    //     () => {},
    //     err => storageErrHandler(err),
    //     () => {
    //       uploadTask.snapshot.ref.getDownloadURL().then(async url => {
    //         const categoryInfo = {
    //           category: {
    //             type: type === "pc" ? 1 : 2,
    //             img: { saveName: props.id, path: url },
    //             name: name,
    //             view: props.view,
    //             viewList: props.viewList
    //           }
    //         };
    //         const res = await axios.patch(
    //             `http://localhost:8080/api/site/${props.site}/category/${props.id}`,
    //             categoryInfo
    //         );
    //         if (res.status === 200) {
    //           dispatch({ type: CATEGORY_STATE, data: { state: "unselected" } });
    //           history.back();
    //         } else alert("카테고리 추가 실패");
    //       });
    //     }
    // );

    // const storageErrHandler = err => {
    //   switch (err.code) {
    //     case "storage/unauthorized":
    //       return alert("User doesn't have permission to access the object");
    //     case "storage/canceled":
    //       return alert("User canceled the upload");
    //     case "storage/unknown":
    //       return alert("Unknown error occurred, inspect error.serverResponse");
    //   }
    // };

    const isValidate = () => {
      if (!title) return false;
      else if (!phone) return false;
      else if (!email) return false;
      else return template;
    };

    if (!isValidate()) {
      return alert('값을 모두 입력해주세요.');
    }

    // template 추가
    // img 추가(로고, 썸네일)
    const dbUpload = async () => {
      const site = {
        name: title,
        phone: phone,
        email,
        intro,
        template: 1
      };

      if(!inputLogoEl) site.logo = { saveName: 'logo', path: '' };
      if(!inputThumbnailEl) site.thumbnail = { saveName: 'thumbnail', path: '' };

      const res = await axios.patch(
          `http://localhost:8080/api/site/${url}`,
          { site }
      );
      if(res.status === 200) {

        dispatch({ type: SITE_STATE, data: "unselected" });
        window.location = '';

      } else {
        alert('수정에 실패하였습니다.');
      }
    };

    await dbUpload();

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
        {logo === "" ? (
          <label className="add_logo" href="#">
            <p className="plus">
              <i className="fal fa-plus" />
            </p>
            <p className="txt">로고이미지 추가</p>
          </label>
        ) : (
          <>
            <form className="form_intro">
              <div className="form-group mb-2">
                <span className="img">
                  <img src={logo} alt="template" />
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
                  thumbnail
                    ? thumbnail
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
          <button className="btn btn-secondary"
                  onClick={handleTemplateChange}
          >템플릿 변경</button>
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
  const { userInfo, siteState, siteValue } = useSelector(state => state.user);

  const [openPopup, setOpenPopup] = useState(false);
  const closePopup = () => {
    setOpenPopup(!openPopup);
  };
  const handlePopup = e => {
    e.preventDefault();
    setOpenPopup(true);
  };

  const handleDelete = async () => {
    if(siteValue === 9999) alert("삭제할 사이트를 선택해주세요");
    else {
      const reqData = { userId: localStorage.id };
      const res = await axios.delete(
          `http://localhost:8080/api/site/${userInfo.siteList[siteValue]}`,
          { data: reqData }
      );
      if(res.status === 200) {
        const newInfo = {
          ...userInfo,
          site: userInfo.site.filter((val, idx) => idx !== siteValue),
          siteList: userInfo.siteList.filter((val, idx) => idx !== siteValue)
        };

        dispatch({ type: REMOVE_SITE, data: newInfo });

      } else {
        alert("사이트 삭제 실패");
      }
    }
  };

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
                  <button className="btn btn-outline-secondary" onClick={handleDelete}>삭제</button>
                  <button
                    className="btn btn-primary"
                    onClick={() => setOpenPopup(true)}
                  >
                    새 웹사이트 추가
                  </button>
                </div>
              </div>

              <div className="contents">
                <div className="inner scroll-xl">
                  {userInfo.site.map((item, idx) => (
                    <SiteList
                      key={idx}
                      idx={idx}
                      name={item.name}
                      img={item.thumbnail ? item.thumbnail.path : ''}
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
