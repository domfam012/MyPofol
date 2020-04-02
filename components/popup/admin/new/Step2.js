import { useState } from "react";
import axios from "axios";

const Step1 = props => {
  const { onNext } = props;
  const { handleNameChange, handleUrlChange } = props;
  const { site } = props;
  const [name, setName] = useState(site.name);
  const [url, setUrl] = useState(site.url);
  const [urlChecked, setUrlChecked] = useState(false);

  const onNameChange = e => {
    setName(e.target.value);
    handleNameChange(e.target.value);
  };
  const onUrlChange = e => {
    setUrl(e.target.value);
    setUrlChecked(false);
    handleUrlChange(e.target.value);
  };

  const handleNext = () => {
    if(!name || !url || !urlChecked) alert('check');
    else onNext();
  };

  const checkUrl = async e => {
    e.preventDefault();
    if(!url) return alert('check');
    const res = await axios.get(`http://localhost/api/site/${url}/check`);
    if(!res.data.urlChecked) alert('already in use');
    setUrlChecked(res.data.urlChecked);
  };

  return (
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
            title="사이트명"
            placeholder="사이트명"
            style={{ width: "400px" }}
          />
          <span className="desc">
            사이트 상단에 로고와 함께 표시되며, 언제든지 변경가능합니다.{" "}
          </span>
        </div>
        <div className="form-group">
          <span className="domain d-inline-block">http://www.mypofol.com/</span>
          <input
            id={"site"}
            name={"site"}
            value={url}
            onChange={onUrlChange}
            type="text"
            className="form-control d-inline-block ml-1"
            title="사이트 주소*"
            placeholder="사이트 주소*"
            style={{ width: "200px" }}
          />
          <button className="btn btn-primary" onClick={checkUrl}>사이트 중복확인</button>
        </div>
      </form>
      <div className="btn-area mb">
        <button className="btn btn-xl btn-primary" onClick={handleNext}>
          다음
        </button>
      </div>
    </section>
  );
};

export default Step1;
