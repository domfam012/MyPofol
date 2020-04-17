import { useState, useRef, useEffect } from "react";
import Alert from "../../alert";
import Tooltip from "../../../tooltip/Tooltip";
import regex from "../../../../public/js/regex";

const Step3 = props => {
  const { onNext, onPrev } = props;

  // 입력값 처리 함수
  const {
    handlePhoneChange,
    handleEmailChange,
    handleImgFile,
    handleImgPreview
  } = props;

  // 등록 중인 사이트 정보
  const { site } = props;

  // 연락처
  const [phone, setPhone] = useState(site.phone);
  // 이메일
  const [email, setEmail] = useState(site.email);
  // 로고이미지
  const [img, setImg] = useState(props.logoPreview);
  const inputImgEl = useRef(null);

  // 알림창
  const [openAlert, setOpenAlert] = useState(false);
  const closeAlert = () => {
    setOpenAlert(!openAlert);
  };
  const [msg, setMsg] = useState("");

  // 사이트 연락처 툴팁 메시지
  const [phoneFeed, setPhoneFeed] = useState("연락처를 입력해주세요.");
  const [openPhoneFeed, setOpenPhoneFeed] = useState(true);
  // 사이트 이메일 툴팁 메시지
  const [emailFeed, setEmailFeed] = useState("이메일을 입력해주세요.");
  const [openEmailFeed, setOpenEmailFeed] = useState(true);

  // 입력값 처리
  const onPhoneChange = e => {
    setPhone(e.target.value);
    handlePhoneChange(e.target.value);

    if (e.target.value.length === 0) {
      setPhoneFeed("연락처를 입력해주세요.");
      setOpenPhoneFeed(true);
    } else if (!regex("num").test(phone)) {
      setPhoneFeed("연락처 형식을 확인해주세요.");
      setOpenPhoneFeed(true);
    } else setOpenPhoneFeed(false);
  };
  const onEmailChange = e => {
    setEmail(e.target.value);
    handleEmailChange(e.target.value);

    if (e.target.value.length === 0) {
      setEmailFeed("이메일을 입력해주세요.");
      setOpenEmailFeed(true);
    } else if (!regex("email").test(email)) {
      setEmailFeed("이메일을 형식을 확인해주세요.");
      setOpenEmailFeed(true);
    } else setOpenEmailFeed(false);
  };

  // 이미지 업로드
  const onImgUpload = e => {
    const preview = URL.createObjectURL(e.target.files[0]);
    setImg(preview);
    handleImgFile(e.target.files[0]);
    inputImgEl.current.focus();
  };
  // 이미 선택한 이미지 있는 경우(이전 혹은 다음 스텝에서 넙어왔을 때)
  // 초기 이미지 바인딩
  useEffect(() => {
    handleImgPreview(img);
  }, [img]);

  // Step 이동
  const handleNext = () => {
    // 미입력 데이터 및 기타 유효성 확인
    if (!phone) {
      setMsg("연락처를 입력해주세요.");
      return setOpenAlert(true);
    } else if (!regex("num").test(phone)) {
      setMsg("연락처 형식을 확인해주세요.");
      setOpenAlert(true);
    } else if (!email) {
      setMsg("이메일을 입력해주세요.");
      return setOpenAlert(true);
    } else if (!regex("email").test(email)) {
      setMsg("이메일을 형식을 확인해주세요.");
      return setOpenAlert(true);
    } else if (!img) {
      setMsg("로고 이미지를 넣어주세요.");
      return setOpenAlert(true);
    } else onNext();
  };

  return (
    <section className="container-fluid init detail info-pf">
      <h2 className="sr-only">당신의 상세정보를 등록,혹은 편집 하세요.</h2>
      <p className="title font-weight-normal pl">
        <img src="/img/common/2.png" alt="1" />
        당신의 상세정보를 <span className="font-weight-bold">등록</span>
        하세요.
      </p>
      <form className="form_info detail">
        <div className="site_name _sName">{site.name}</div>
        <div className="form-group">
          <input
            id={"phone"}
            name={"phone"}
            value={phone}
            onChange={onPhoneChange}
            type="tel"
            className="form-control mb-1"
            title="연락처"
            placeholder="연락처를 입력하세요."
            style={{ width: "400px" }}
          />
          {openPhoneFeed ? (
            <Tooltip
              feed={phoneFeed}
              style={{
                display: "block",
                top: "71%",
                width: "37%",
                left: "31.5%"
              }}
            />
          ) : (
            ""
          )}
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
            placeholder="이메일을 입력하세요."
            style={{ width: "400px" }}
          />
          {openEmailFeed ? (
            <Tooltip
              feed={emailFeed}
              style={{
                display: "block",
                top: "71%",
                width: "37%",
                left: "31.5%"
              }}
            />
          ) : (
            ""
          )}
        </div>
        <div className="add_img">
          {/*
            todo!
            이미지 없을 때, display:none; => 이미지를 넣으면 display:block; 처리
          */}
          <a href="#">
            {!img ? (
              <label style={{ cursor: "pointer" }} htmlFor={"logoUploader"}>
                <span className="plus">
                  <i className="fal fa-plus" />
                </span>
                <span className="txt">로고이미지 추가</span>
              </label>
            ) : (
              <img
                src={img}
                alt="로고이미지 추가"
                style={{ display: "block" }}
              />
            )}
            <input
              style={{ display: "none" }}
              type="file"
              id="logoUploader"
              name={"img"}
              className="form-control-file"
              ref={inputImgEl}
              onChange={onImgUpload}
            />
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
      {openAlert ? <Alert message={msg} closeAlert={closeAlert} /> : ""}
    </section>
  );
};

export default Step3;
