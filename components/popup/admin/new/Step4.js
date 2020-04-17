import { useState, useEffect } from "react";
import Alert from "../../alert";
import Tooltip from "../../../tooltip/Tooltip";

const Step4 = props => {
  const { onNext, onPrev } = props;

  // 입력값 처리 함수
  const { handleCategoryChange } = props;

  // 등록 중인 사이트 정보
  const { site } = props;

  // 카테고리
  const [categoryList, setCategoryList] = useState(site.categoryList);

  // Step 이동
  const [itGo, setItGo] = useState(false);

  // 알림창
  const [openAlert, setOpenAlert] = useState(false);
  const closeAlert = () => {
    setOpenAlert(!openAlert);
  };
  const [msg, setMsg] = useState("");

  // 카테고리 리스트 추가
  const handleCatListChange = e => {
    e.preventDefault();
    setCategoryList(categoryList => [...categoryList, ""]);
  };

  // 카테고리 항목 내용 변경
  const handleCatItemChange = (val, idx) => {
    const newCategory = categoryList.map((cat, i) => {
      return idx === i ? val : cat;
    });
    setCategoryList(newCategory);
  };

  // 카테고리 입력값 혹은 카테고리 추가 처리
  useEffect(() => {
    handleCategoryChange(categoryList);
  }, [categoryList]);

  // Step 이동
  const handleNext = () => {
    const newCategory = categoryList.filter(item => item !== "");
    if (!newCategory.length) {
      setMsg("최소 1개의 카테고리를 입력해주세요.");
      return setOpenAlert(true);
    } else {
      setCategoryList(newCategory);
      setItGo(true);
    }
  };

  // Step 이동
  useEffect(() => {
    if (itGo) {
      onNext();
    }
  }, [itGo]);

  return (
    <section className="container-fluid init detail category">
      <h2 className="sr-only">당신의 상세정보를 등록,혹은 편집 하세요.</h2>
      <p className="title font-weight-normal pl">
        <img src="/img/common/3.png" alt="1" />
        당신의 웹사이트에 필요한
        <span className="font-weight-bold"> 카테고리를 등록</span>하세요.
      </p>
      <div className="sub">
        <p>카테고리는 최소1개~8개까지 등록 가능해요.</p>
      </div>

      <form className="form_info detail">
        <CategoryInput
          key={"categoryList"}
          categoryList={categoryList}
          handleCatItemChange={handleCatItemChange}
        />

        {categoryList.length < 8 ? (
          <div className="d-inline-block">
            <button
              className="btn btn-lg btn-primary"
              onClick={handleCatListChange}
            >
              카테고리 추가
            </button>
          </div>
        ) : (
          <></>
        )}
      </form>

      <div className="btn-area mb mb-5">
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



/*
 *  카테고리 입력창
 *  categoryList 로 바인딩
 */
const CategoryInput = props => {
  const { categoryList, handleCatItemChange } = props;

  // 사이트명 툴팁 메시지
  const [categoryFeed, setCategoryFeed] = useState("카테고리를 입력해주세요.");
  const [openCategoryFeed, setOpenCategoryFeed] = useState(false);

  return categoryList.map((cat, idx) => {
    // 추가 버튼 들어가는 경우 체크
    const isLast = idx === categoryList.length - 1 && idx !== 7;
    const handleChange = (val, idx) => {
      if (val === '') setOpenCategoryFeed(true);
      else setOpenCategoryFeed(false);

      handleCatItemChange(val, idx)
    };

    return (
      <div
        key={`cat_${idx}`}
        className={`form-group ${isLast ? "d-inline-block add" : ""}`}
      >
        <input
          id={`cat_${idx}`}
          value={categoryList[idx]}
          onChange={e => handleChange(e.target.value, idx)}
          name={"name"}
          type="text"
          className={`form-control ${isLast ? "d-inline-block" : "mb-1"}`}
          title="카테고리"
          placeholder="카테고리 명을 입력하세요.*"
          maxLength={20}
          style={{ width: "400px" }}
        />
        {openCategoryFeed ? (
            <Tooltip
                feed={categoryFeed}
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
    );
  });
};

export default Step4;
