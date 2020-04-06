import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_SITE } from "../../../../redux/reducers/user";

const Step6 = props => {
  const { site } = props;
  const { onClose } = props;

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);

  const newInfo = { ...userInfo, site: userInfo.site.concat(site), siteList: userInfo.siteList.concat(site.url) };

  useEffect(() => {
    dispatch({ type: ADD_SITE, data: newInfo });
  }, []);

  return (
    <section className="container-fluid init complete">
      <h2 className="title">
        PUBLISHING <span className="font-weight-bold">COMPLETED</span>
      </h2>
      <div className="sub">
        <p>사이트 제작이 완료되었습니다.</p>
      </div>
      <div className="btn-area mb">
        <button className="btn btn-xl btn-primary" onClick={onClose}>
          확인
        </button>
      </div>
    </section>
  );
};

export default Step6;
