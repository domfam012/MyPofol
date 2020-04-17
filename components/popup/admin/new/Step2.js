/*
 *  사이트 등록 Step2
 */

import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../../alert";
import Tooltip from "../../../tooltip/Tooltip";
import regex from "../../../../public/js/regex";

const Step2 = props => {
  const { onNext } = props;

  // 입력값 처리 함수
  const { handleNameChange, handleUrlChange, handleUrlChecked } = props;

  // 등록 중인 사이트 정보
  const { site } = props;

  // 사이트명
  const [name, setName] = useState(site.name);
  // 사이트 주소
  const [url, setUrl] = useState(site.url);
  // 사이트 주소 중복확인 결과
  const [urlChecked, setUrlChecked] = useState(props.urlChecked);

  // 알림창
  const [openAlert, setOpenAlert] = useState(false);
  const closeAlert = () => {
    setOpenAlert(!openAlert);
  };
  // 알림창 전달 메시지
  const [msg, setMsg] = useState("");

  // 사이트명 툴팁 메시지
  const [nameFeed, setNameFeed] = useState(
    "이름 혹은 사이트명을 입력해주세요."
  );
  const [openNameFeed, setOpenNameFeed] = useState(true);
  // 사이트 주소 툴팁 메시지
  const [urlFeed, setUrlFeed] = useState("사이트주소를 입력해주세요.");
  const [openUrlFeed, setOpenUrlFeed] = useState(true);

  // url 체크 진행중 여부
  let isChecking = false;

  // 입력값 처리
  const onNameChange = e => {
    setName(e.target.value);
    handleNameChange(e.target.value);

    if (e.target.value.length === 0) setOpenNameFeed(true);
    else setOpenNameFeed(false);
  };

  const onUrlChange = e => {
    setUrl(e.target.value);
    setUrlChecked(false);
    handleUrlChange(e.target.value);

    if (e.target.value.length === 0) setOpenUrlFeed(true);
    else setOpenUrlFeed(false);
  };

  // url 체크 여부 초기 바인딩
  useEffect(() => {
    handleUrlChecked(urlChecked);
  }, [urlChecked]);

  // Step 이동
  const handleNext = () => {
    // url 체크 중인지 확인
    if (isChecking) {
      setMsg("사이트 중복 확인중입니다.");
      setOpenAlert(true);
      return;
    }

    // 미입력 및 url 체크 여부 확인
    if (!name) {
      setMsg("사이트명을 입력해주세요.");
      setOpenAlert(true);
    } else if (!url) {
      setMsg("사이트 url을 입력해주세요.");
      setOpenAlert(true);
    } else if (!urlChecked) {
      setMsg("사이트 중복확인을 확인해주세요.");
      setOpenAlert(true);
    } else onNext();
  };

  // url 중복 확인
  const checkUrl = async e => {
    e.preventDefault();
    // 체크 진행중 = true
    isChecking = true;

    // 이후 tooltip 으로 수정
    if (!regex("url").test(url)) {
      setMsg("영어와 숫자만 입력 가능합니다.");
      setOpenAlert(true);
      return;
    }

    // url 미입력
    if (!url) {
      setMsg("사이트 url을 입력해주세요.");
      return setOpenAlert(true);
    }
    // DB 조회 api 연동
    const res = await axios.get(
      `${process.env.ASSET_PREFIX}/api/site/${url}/check`
    );
    // 이미 사용중인 url
    if (!res.data.urlChecked) {
      setMsg("이미 사용중인 주소입니다.");
      return setOpenAlert(true);
    }

    // url 체크값 state 에 반영
    setUrlChecked(res.data.urlChecked);
    setMsg("사용할 수 있는 주소입니다.");
    setOpenAlert(true);

    // 체크 진행중 = false
    isChecking = false;
  };

  return (
    <>
      <section className="container-fluid init info-pf">
        <h2 className="sr-only">당신의 이름, 혹은 사이트명을 알려주세요.</h2>
        <p className="title font-weight-normal pl mb">
          <img src="/img/common/1.png" alt="1" />
          당신의 <span className="font-weight-bold">이름,</span> 혹은{" "}
          <span className="font-weight-bold">사이트명</span>을 알려주세요.
        </p>
        <form className="form_info mb">
          <div className="form-group">
            <input
              id={"name"}
              name={"name"}
              value={name}
              onChange={onNameChange}
              type="text"
              className="form-control mb-1"
              title="사이트명*"
              placeholder="이름 혹은 사이트명을 입력하세요.*"
              maxLength={20}
              style={{ width: "400px" }}
            />
            {openNameFeed ? (
              <Tooltip
                feed={nameFeed}
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
            <span className="desc">
              사이트 상단에 로고와 함께 표시되며, 언제든지 변경가능합니다.{" "}
            </span>
          </div>
          <div className="form-group">
            <span className="domain d-inline-block">
              http://www.mypofol.com/
            </span>
            <input
              id={"site"}
              name={"site"}
              value={url}
              onChange={onUrlChange}
              type="text"
              className="form-control d-inline-block ml-1"
              title="사이트 주소*"
              placeholder="사용할 사이트주소를 입력하세요.*"
              style={{ width: "200px" }}
            />
            {openUrlFeed ? (
              <Tooltip
                feed={urlFeed}
                style={{
                  display: "block",
                  top: "118%",
                  width: "18%",
                  left: "49.5%"
                }}
              />
            ) : (
              ""
            )}
            <button className="btn btn-primary" onClick={checkUrl}>
              사이트 중복확인
            </button>
          </div>
        </form>
        <div className="btn-area mb">
          <button className="btn btn-xl btn-primary" onClick={handleNext}>
            다음
          </button>
        </div>
        {openAlert ? <Alert message={msg} closeAlert={closeAlert} /> : ""}
      </section>
    </>
  );
};

export default Step2;
