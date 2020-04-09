import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../../alert";

const Step2 = props => {
  const { onNext } = props;
  const { handleNameChange, handleUrlChange, handleUrlChecked } = props;
  const { site } = props;
  const [name, setName] = useState(site.name);
  const [url, setUrl] = useState(site.url);
  const [urlChecked, setUrlChecked] = useState(props.urlChecked);

  const [openAlert, setOpenAlert] = useState(false);
  const closeAlert = () => {
    setOpenAlert(!openAlert);
  };
  const [msg, setMsg] = useState("");

  let isChecking = false;

  const onNameChange = e => {
    setName(e.target.value);
    handleNameChange(e.target.value);
  };

  const onUrlChange = e => {
    setUrl(e.target.value);
    setUrlChecked(false);
    handleUrlChange(e.target.value);
  };

  useEffect(() => {
    handleUrlChecked(urlChecked);
  }, [urlChecked]);

  const handleNext = () => {
    if (isChecking) {
      setMsg("사이트 중복 확인중입니다.");
      setOpenAlert(true);
      return;
    }

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

  const checkUrl = async e => {
    e.preventDefault();
    isChecking = true;

    if (!url) {
      setMsg("사이트 url을 입력해주세요.");
      return setOpenAlert(true);
    }
    const res = await axios.get(`${process.env.ASSET_PREFIX}/api/site/${url}/check`);
    if (!res.data.urlChecked) {
      setMsg("이미 사용중인 주소입니다.");
      return setOpenAlert(true);
    }

    setUrlChecked(res.data.urlChecked);
    setMsg("사용할 수 있는 주소입니다.");
    setOpenAlert(true);

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
              placeholder="사용할 도메인주소를 입력하세요.*"
              style={{ width: "200px" }}
            />
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
