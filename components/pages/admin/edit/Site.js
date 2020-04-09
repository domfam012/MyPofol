import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_SITE, SITE_STATE } from "../../../../redux/reducers/user";
import Popup from "../../../../components/popup/admin/new/Popup";
import Link from "next/link";
import Alert from "../../../popup/alert";
import Confirm from "../../../popup/Confirm";

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
  // console.log(props);
  const dispatch = useDispatch();
  const { template, handleSaveClick, handleCancelClick } = props;
  const [title, setTitle] = useState(props.title);
  const [intro, setIntro] = useState(props.intro ? props.intro : '');
  const [introLength, setIntroLength] = useState(props.intro ? props.intro.length : 0);
  const [email, setEmail] = useState(props.email);
  const [phone, setPhone] = useState(props.phone);
  const url = props.url;

  const [logo, setLogo] = useState(""); // preview
  const [logoFile, setLogoFile] = useState(); // file
  const inputLogoEl = useRef(null); // file elem

  const [thumbnail, setThumbnail] = useState(""); // preview
  const [thumbnailFile, setThumbnailFile] = useState(); // file
  const inputThumbnailEl = useRef(null); // file elem

  // console.log(props.title);

  useEffect(() => {
    // setTitle(props.title);
    // const intro = props.intro ? props.intro : '';
    // setIntro(props.intro);
    // const introLength = intro.length;
    // setIntroLength(introLength);
    // setEmail(props.email);
    // setPhone(props.phone);
  }, []);

  const setState = () => {
    dispatch({ type: SITE_STATE, data: { state: "unselected", value: 9999 } });
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleIntroChange = e => {
    if (e.target.value.length < 201) {
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
  const handleTemplateChange = () => {};

  const onLogoUpload = e => {
    const preview = URL.createObjectURL(e.target.files[0]);
    setLogo(preview);
    setLogoFile(e.target.files[0]);
    inputLogoEl.current.focus();
  };
  // const handleLogoChange = (saveName, path) => setSite({ ...site, logo: { saveName: saveName, path: path } });
  // const handleLogoFile = val => setLogoFile(val);
  const onThumbnailUpload = e => {
    const preview = URL.createObjectURL(e.target.files[0]);
    setThumbnail(preview);
    setThumbnailFile(e.target.files[0]);
    inputThumbnailEl.current.focus();
  };
  // const handleThumbnailChange = (saveName, path) => setSite({ ...site, thumbnail: { saveName: saveName, path: path } });
  // const handleThumbnailFile = val => setThumbnailFile(val);

  // const handleCancel = () => {
  //   setState();
  // };

  const handleSave = async () => {
    await handleSaveDB();
    handleSaveClick();
  };

  const handleSaveDB = async () => {
    const isValidate = () => {
      if (!title) return false;
      else if (!phone) return false;
      else if (!email) return false;
      else return template;
    };

    if (!isValidate()) {
      return alert("값을 모두 입력해주세요.");
    }

    const site = {
      name: title,
      phone: phone,
      email,
      intro,
      template: 1
    };

    const uploadDetailImg = async cb => {
      const process = (item, imgType) => {
        return new Promise((resolve, reject) => {
          const storageRef = storage.ref(`site/${url}/${imgType}`);
          const uploadTask = storageRef.put(item);

          uploadTask.on(
            "state_changed",
            () => {},
            err => storageErrHandler(err),
            async _ => {
              const url = await uploadTask.snapshot.ref
                .getDownloadURL()
                .then(url => url);

              site[imgType].path = url;
              resolve();
            }
          );
        });
      };

      const storageErrHandler = err => {
        switch (err.code) {
          case "storage/unauthorized":
            return alert("User doesn't have permission to access the object");
          case "storage/canceled":
            return alert("User canceled the upload");
          case "storage/unknown":
            return alert(
              "Unknown error occurred, inspect error.serverResponse"
            );
        }
      };

      const storage = await loadStorage();

      if (logoFile) {
        site.logo = { saveName: "logo", path: "" };
        await process(logoFile, "logo");
      }

      if (thumbnailFile) {
        site.thumbnail = { saveName: "thumbnail", path: "" };
        await process(thumbnailFile, "thumbnail");
      }

      await cb();
    };

    const dbUpload = async () => {
      const res = await axios.patch(`http://localhost:8080/api/site/${url}`, {
        site
      });
      if (res.status === 200) {
        dispatch({ type: SITE_STATE, data: "unselected" });
      } else {
        alert("수정에 실패하였습니다.");
      }
    };

    await uploadDetailImg(dbUpload);
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
              placeholder="사이트명을 입력해주세요"
              value={title !== undefined ? title : props.title}
              onChange={handleTitleChange}
            />
            <span className="site_title">http://www.mypofol.com/{url}</span>
          </div>
        </form>
      </div>

      <div className="box add_logo">
        <>
          <form className="form_intro">
            <div className="form-group mb-2">
              <span className="img">
                <img src={logo ? logo : props.logoPath} alt="template" />
              </span>
            </div>
          </form>
          <div className="btn-area mb change">
            <button className="btn btn-secondary">
              <label
                style={{ cursor: "pointer", marginBottom: "0" }}
                htmlFor={"logoUploader"}
              >
                로고 변경
              </label>
            </button>
            <input
              style={{ display: "none" }}
              type="file"
              id="logoUploader"
              name={"img"}
              className="form-control-file"
              ref={inputLogoEl}
              onChange={onLogoUpload}
            />
          </div>
        </>

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
                src={
                  thumbnail !== ""
                    ? thumbnail
                    : props.thumbnailPath !== ""
                    ? props.thumbnailPath
                    : "/img/common/default_thumbnail.png"
                }
                alt="template"
              />
            </span>
          </div>
        </form>
        <div className="btn-area mb change">
          <button className="btn btn-secondary">
            <label
              style={{ cursor: "pointer", marginBottom: "0" }}
              htmlFor={"thumbnailUploader"}
            >
              썸네일 변경
            </label>
          </button>
          <input
            style={{ display: "none" }}
            type="file"
            id="thumbnailUploader"
            name={"img"}
            className="form-control-file"
            ref={inputThumbnailEl}
            onChange={onThumbnailUpload}
          />
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
              value={intro !== undefined ? intro : props.intro}
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
              placeholder="연락처를 입력해주세요."
              value={phone !== undefined ? phone : props.phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              title="이메일"
              placeholder="이메일을 입력해주세요."
              value={email !== undefined ? email : props.email}
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
          <button className="btn btn-secondary" onClick={handleTemplateChange}>
            템플릿 변경
          </button>
        </div>
      </div>
      <div className="btn-area mb">
        <button
          className="btn btn-lg btn-outline-secondary"
          onClick={handleCancelClick}
        >
          취소
        </button>
        <button className="btn btn-lg btn-primary" onClick={handleSave}>
          저장
        </button>
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

  const [openAlert, setOpenAlert] = useState(false);
  const closeAlert = () => setOpenAlert(!openAlert);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertCb, setAlertCb] = useState(() => {});

  const [openConfirm, setOpenConfirm] = useState(false);
  const closeConfirm = () => setOpenConfirm(!openConfirm);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [confirmCb, setConfirmCb] = useState(() => {});

  const handleDeleteCheck = () => {
    // console.log('click')
    setConfirmMsg("선택한 사이트를 삭제하시겠습니까?");
    setConfirmCb(() => handleDelete);
  };

  const reload = () => {
    window.location = "";
  };
  const handleSaveClick = () => {
    setAlertMsg("저장 되었습니다.");
    setAlertCb(() => reload);
  };

  const setState = () => {
    dispatch({ type: SITE_STATE, data: { state: "unselected", value: 9999 } });
  };
  const handleCancelClick = () => {
    setAlertMsg("취소 되었습니다.");
    setAlertCb(() => setState);
  };

  useEffect(() => {
    if (alertMsg !== '') setOpenAlert(true);
  }, [alertCb]);

  useEffect(() => {
    if (confirmMsg !== '') setOpenConfirm(true);
  }, [confirmCb]);

  const handleDelete = () => {
    return new Promise(resolve => {
      if (siteValue === 9999) alert("삭제할 사이트를 선택해주세요");
      else {
        const reqData = { userId: localStorage.id };
        axios.delete(
            `http://localhost:8080/api/site/${userInfo.siteList[siteValue]}`,
            { data: reqData }
        ).then(res => {
          if (res.status === 200) {
            const newInfo = {
              ...userInfo,
              site: userInfo.site.filter((val, idx) => idx !== siteValue),
              siteList: userInfo.siteList.filter((val, idx) => idx !== siteValue)
            };

            dispatch({ type: REMOVE_SITE, data: newInfo });
            resolve();
          } else {
            alert("사이트 삭제 실패");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (Object.keys(userInfo).length !== 0) {
      userInfo.siteList.length === 0
        ? dispatch({ type: SITE_STATE, data: { state: "none" } })
        : dispatch({ type: SITE_STATE, data: { state: "unselected" } });
    }
  }, []);

  return (
    <>
      {openPopup ? (
        <Popup closePopup={closePopup} />
      ) : Object.keys(userInfo).length !== 0 ? (
        <div className="inner clearfix">
          <div className="section-container">
            <section>
              <div className="title_area">
                <h2 className="title">웹사이트 관리</h2>
                <div className="btn-area mb">
                  <button
                    className={`btn btn-outline-secondary ${siteValue === 9999 ? 'disabled' : ''}`}
                    onClick={handleDeleteCheck}
                  >
                    삭제
                  </button>
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
                      img={
                        item.thumbnail
                          ? item.thumbnail.path
                          : "/img/common/default_thumbnail.png"
                      }
                      url={item.url}
                      activeTarget={siteValue !== 9999 ? siteValue : ""}
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
                logoPath={
                  siteValue !== "" ? userInfo.site[siteValue].logo.path : ""
                }
                thumbnailPath={
                  (siteValue !== "" && userInfo.site[siteValue].thumbnail)
                    ? userInfo.site[siteValue].thumbnail.path
                    : "/img/common/default_thumbnail.png"
                }
                intro={siteValue !== "" ? userInfo.site[siteValue].intro : ""}
                email={siteValue !== "" ? userInfo.site[siteValue].email : ""}
                phone={siteValue !== "" ? userInfo.site[siteValue].phone : ""}
                url={siteValue !== "" ? userInfo.site[siteValue].url : ""}
                template={
                  siteValue !== "" ? userInfo.site[siteValue].template : 1
                }
                handleSaveClick={handleSaveClick}
                handleCancelClick={handleCancelClick}
              />
            ) : (
              <Unselected />
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {openAlert ? <Alert message={alertMsg} cb={alertCb} closeAlert={closeAlert} /> : ""}
      {openConfirm ? <Confirm message={confirmMsg} cb={confirmCb} closeConfirm={closeConfirm} /> : ""}
    </>
  );
};

export default Site;
