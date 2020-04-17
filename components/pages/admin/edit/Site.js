/*
 *  사이트 관리
 */

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {REMOVE_SITE, SITE_SAVE, SITE_STATE} from "../../../../redux/reducers/user";
import Popup from "../../../../components/popup/admin/new/Popup";
import Link from "next/link";
import Alert from "../../../popup/alert";
import Confirm from "../../../popup/Confirm";
import axios from "axios";
import { loadStorage } from "../../../../public/js/db";

// SNB -> 사이트 없는 경우
const None = () => {
  return (
    <div className="select">
      <p className="title">사이트를 추가하세요</p>
    </div>
  );
};

// SNB -> 사이트는 있으나 선택되지 않은 경우
const Unselected = () => {
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

// SNB -> 사이트 선택된 경우
const Selected = props => {
  // 저장 혹은 취소 처리 함수
  const { handleSaveClick, handleCancelClick } = props;

  // 선택된 사이트 정보
  const [title, setTitle] = useState(props.title);  // 사이트명
  const [intro, setIntro] = useState(props.intro ? props.intro : ""); // 사이트 소개글
  const [introLength, setIntroLength] = useState( // 사이트 소개글 글자수
    props.intro ? props.intro.length : 0
  );
  const [email, setEmail] = useState(props.email); // 사이트 이메일
  const [phone, setPhone] = useState(props.phone); // 사이트 연락처
  const url = props.url; // 사이트 주소
  const template = props.url; // 사이트 템플릿 -> TODO: 변경 가능하도록 해야됨

  const [logo, setLogo] = useState(""); // 사이트 로고이미지 preview
  const [logoFile, setLogoFile] = useState(); // 사이트 로고이미지 file
  const inputLogoEl = useRef(null); // 사이트 로고이미지 file elem

  const [thumbnail, setThumbnail] = useState(""); // 사이트 썸네일이미지 preview
  const [thumbnailFile, setThumbnailFile] = useState(); // 사이트 썸네일이미지 file
  const inputThumbnailEl = useRef(null); // 사이트 썸네일이미지 file elem

  const dispatch = useDispatch();
  const { siteValue, siteSave } = useSelector(state => state.user);

  // 선택된 사이트 변경시 redux 에서 사이트 수정된 상태 값 초기화
  useEffect(() => {
    dispatch({ type: 'SITE_EDIT', data: { value: false } })
  }, [siteValue]);

  // 변경내용 O -> 변경내용 저장 확인 선택 -> 저장 처리
  useEffect(() => {
    if(siteSave === true) handleSave();
  }, [siteSave]);

  // 사이트 선택 변경시 선택된 사이트 정보 바인딩
  useEffect(() => {
    setTitle(props.title);
    setIntro(props.intro);
    setIntroLength(props.intro.length);
    setEmail(props.email);
    setPhone(props.phone);
  }, [siteValue]);

  // 사이트명 입력값 처리
  const handleTitleChange = e => {
    dispatch({ type: 'SITE_EDIT', data: { value: true } });
    setTitle(e.target.value);
  };

  // 사이트 소개글 입력값 처리 + 글자수 확인
  const handleIntroChange = e => {
    if (e.target.value.length < 201) {
      dispatch({ type: 'SITE_EDIT', data: { value: true } });
      setIntro(e.target.value);
      setIntroLength(e.target.value.length);
    }
  };

  // 사이트 이메일 입력값 처리
  const handleEmailChange = e => {
    dispatch({ type: 'SITE_EDIT', data: { value: true } });
    setEmail(e.target.value);
  };

  // 사이트 연락처 입력값 처리
  const handlePhoneChange = e => {
    dispatch({ type: 'SITE_EDIT', data: { value: true } });
    setPhone(e.target.value);
  };

  // 사이트 템플릿 선택값 처리
  const handleTemplateChange = () => {};

  // 사이트 로고 이미지 변경 처리
  const onLogoUpload = e => {
    dispatch({ type: 'SITE_EDIT', data: { value: true } });
    const preview = URL.createObjectURL(e.target.files[0]);
    setLogo(preview);
    setLogoFile(e.target.files[0]);
    inputLogoEl.current.focus();
  };

  // 사이트 썸네일 이미지 변경 처리
  const onThumbnailUpload = e => {
    dispatch({ type: 'SITE_EDIT', data: { value: true } });
    const preview = URL.createObjectURL(e.target.files[0]);
    setThumbnail(preview);
    setThumbnailFile(e.target.files[0]);
    inputThumbnailEl.current.focus();
  };

  // 사이트 저장 처리
  const handleSave = async () => {
    // Firestore 에 데이터 patch
    await handleSaveDB();
    // Site Component 에서 받아온 저장 완료 처리 함수
    handleSaveClick();
  };

  // Firestore 에 데이터 patch
  const handleSaveDB = async () => {
    // 미입력값 확인
    const isValidate = () => {
      if (!title) return false;
      else if (!phone) return false;
      else if (!email) return false;
      else return template;
    };

    // 미입력시 알림 처리
    if (!isValidate()) {
      return alert("값을 모두 입력해주세요.");
    }

    // 사이트 정보 저장 요청 데이터
    const site = {
      name: title,
      phone: phone,
      email,
      intro,
      template: 1
    };

    // firestore storage 이미지 업로드
    const uploadDetailImg = async cb => {
      /**
       * 이미지 업로드 프로세스
       * @param item: 이미지 파일
       * @param imgType: logo 또는 thumbnail
       * @returns {Promise<unknown>}
       */
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

              // 업로드 성공시 사이트 정보에 이미지 경로 저장
              site[imgType].path = url;
              resolve();
            }
          );
        });
      };

      // storage 업로드 에러핸들러
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

      // storage 로드
      const storage = await loadStorage();

      // 로고 이미지 있는 경우 -> 로고 이미지 업로드 프로세스 진행
      if (logoFile) {
        site.logo = { saveName: "logo", path: "" };
        await process(logoFile, "logo");
      }

      // 썸네일 이미지 있는 경우 -> 썸네일 이미지 업로드 프로세스 진행
      if (thumbnailFile) {
        site.thumbnail = { saveName: "thumbnail", path: "" };
        await process(thumbnailFile, "thumbnail");
      }

      // 이미지 업로드 완료 후 콜백함수(dbUpload) 실행
      await cb();
    }; // end of uploadDetailImg

    // Firestore 사이트 정보 patch
    const dbUpload = async () => {
      const res = await axios.patch(
        `${process.env.ASSET_PREFIX}/api/site/${url}`,
        {
          site
        }
      );
      if (res.status === 200) {
        // 정상적으로 저장된 경우, 선택된 사이트 없음 으로 변경
        dispatch({ type: SITE_STATE, data: "unselected" });
      } else {
        alert("수정에 실패하였습니다.");
      }
    };

    // 이미지 업로드 -> db 저장
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
              maxLength={20}
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

// 사이트 목록 바인딩
const SiteList = props => {
  // 사용자가 사이트 정보 수정한 부분 있는지 여부
  const { siteEdit } = useSelector(state => state.user);

  // 수정 내역 있을 경우 띄워줄 확인창
  const confirmMsg = "변경된 내용이 있습니다.\n저장하시겠습니까?";
  const [ openConfirm, setOpenConfirm ] = useState(false);

  // 다른 사이트 선택한 경우
  const dispatch = useDispatch();
  const handleChangeSelected = idx => {
    // 수정 내역 있을 경우 -> 확인창 통해 진행
    if(siteEdit) setOpenConfirm(true);
    // 수정 내역 없을 경우 -> 선택된 사이트 변경
    else changeSelected(idx);
  };

  // 변경된 내용 O -> 사용자가 저장하겠다고 확인
  const saveSite = () => {
    dispatch({ type: SITE_SAVE, data: { value: true } });
  };

  // 변경사항 저장 확인창 닫기
  const closeConfirm = (idx) => {
    setOpenConfirm(!openConfirm);
    changeSelected(idx);
  };

  // 선택된 사이트 변경 redux dispatch
  const changeSelected = (idx) => {
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
          onClick={() => handleChangeSelected(props.idx)}
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
      {openConfirm ? <Confirm message={confirmMsg} cb={saveSite} closeConfirm={() => closeConfirm(props.idx)}/>: ""}
    </div>
  );
};

// 사이트 관리 최상위 Component
const Site = () => {
  // Redux 에서 사용자 정보, 사용자 보유 사이트 정보 조회
  const dispatch = useDispatch();
  const { userInfo, siteState, siteValue } = useSelector(state => state.user);

  // 사이트 등록 팝업 컨트롤
  const [openPopup, setOpenPopup] = useState(false);
  const closePopup = () => {
    setOpenPopup(!openPopup);
  };
  const handlePopup = e => {
    e.preventDefault();
    setOpenPopup(true);
  };

  // 알림창
  const [openAlert, setOpenAlert] = useState(false);
  const closeAlert = () => setOpenAlert(!openAlert);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertCb, setAlertCb] = useState(() => {});

  // 확인창
  const [openConfirm, setOpenConfirm] = useState(false);
  const closeConfirm = () => setOpenConfirm(!openConfirm);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [confirmCb, setConfirmCb] = useState(() => {});

  // 페이지 새로고침
  const reload = () => {
    window.location = "";
  };

  // 사이트 수정 완료 팝업
  const handleSaveClick = () => {
    setAlertMsg("저장 되었습니다.");
    setAlertCb(() => reload);
  };

  // 사이트 삭제 처리 -> 확인창 통해 진행
  const handleDeleteCheck = () => {
    setConfirmMsg("선택한 사이트를 삭제하시겠습니까?");
    setConfirmCb(() => handleDelete);
  };

  // 사이트 선택 취소시 redux 연동
  const setState = () => {
    dispatch({ type: SITE_STATE, data: { state: "unselected", value: 9999 } });
  };
  const handleCancelClick = () => {
    setAlertMsg("취소 되었습니다.");
    setAlertCb(() => setState);
  };

  // 알림창 콜백 함수 등록시 알림창 오픈 처리
  // 알림 메시지 없는 경우(콜백 함수 제거한 경우)
  useEffect(() => {
    if (alertMsg !== "") setOpenAlert(true);
  }, [alertCb]);

  // 확인창 콜백 함수 등록시 확인창 오픈 처리
  // 확인 메시지 없는 경우(콜백 함수 제거한 경우)
  useEffect(() => {
    if (confirmMsg !== "") setOpenConfirm(true);
  }, [confirmCb]);

  /*
   *  삭제 처리 함수
   *  삭제 확인창에 전달될 콜백 함수
   */
  const handleDelete = () => {
    return new Promise(resolve => {
      // siteValue === 9999; 선택된 사이트 없음
      if (siteValue === 9999) alert("삭제할 사이트를 선택해주세요");
      else {
        // 사용자 id -> 사용자 정보 - 사이트 목록에서 삭제할 때 처리
        const reqData = { userId: localStorage.id };

        // 사이트 삭제 요청 api
        axios
          .delete(
            `${process.env.ASSET_PREFIX}/api/site/${userInfo.siteList[siteValue]}`,
            { data: reqData }
          )
          .then(res => {
            if (res.status === 200) {
              // 정상적으로 삭제된 경우 -> redux dispatch
              const newInfo = {
                ...userInfo,
                site: userInfo.site.filter((val, idx) => idx !== siteValue),
                siteList: userInfo.siteList.filter(
                  (val, idx) => idx !== siteValue
                )
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

  // 사이트 삭제시 SNB 갱신을 위한 dispatch
  useEffect(() => {
    if (Object.keys(userInfo).length !== 0) {
      userInfo.siteList.length === 0
        ? dispatch({ type: SITE_STATE, data: { state: "none" } })
        : dispatch({
            type: SITE_STATE,
            data: { state: "unselected", value: 9999 }
          });
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
                    className={`btn btn-outline-secondary ${
                      siteValue === 9999 ? "disabled" : ""
                    }`}
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
                  siteValue !== "" && userInfo.site[siteValue].thumbnail
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
      {openAlert ? (
        <Alert message={alertMsg} cb={alertCb} closeAlert={closeAlert} />
      ) : (
        ""
      )}
      {openConfirm ? (
        <Confirm
          message={confirmMsg}
          cb={confirmCb}
          closeConfirm={closeConfirm}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Site;
