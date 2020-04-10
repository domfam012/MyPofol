import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { CATEGORY_STATE } from "../../../../redux/reducers/user";
import { loadStorage } from "../../../../public/js/db";
import Alert from "../../../popup/alert";
import Confirm from "../../../popup/Confirm";
import Link from "next/link";
import axios from "axios";
import shortid from "shortid";

const CategoryList = props => {
  const dispatch = useDispatch();

  // 카테고리 선택 클릭
  const setCategoryState = e => {
    if (props.categoryState === "selected" && props.activeTarget === e)
      dispatch({ type: CATEGORY_STATE, data: { state: "unselected" } });
    else
      dispatch({
        type: CATEGORY_STATE,
        data: { state: "selected", value: e, change: true }
      });
  };

  return (
    <div className={props.activeTarget === props.id ? "site active" : "site"}>
      <span className="site-img">
        <img src={props.imgPath} alt="thumbnail" />
      </span>
      <span className="site-body">
        <span className="title">{props.title}</span>
      </span>
      <span className="btn-area">
        <button
          onClick={() => setCategoryState(props.id)}
          className="btn btn-outline-secondary mr-1"
        >
          선택
        </button>
        <Link
          href={`/admin/edit?site=${props.site}&category=${props.id}`}
          as={`/admin/edit?site=${props.site}&category=${props.id}`}
        >
          <button className="btn btn-primary">상세</button>
        </Link>
      </span>
    </div>
  );
};

const Unselected = () => {
  return (
    <div className="select">
      <p className="title">카테고리를 선택하세요</p>
      <p className="desc">
        카테고리를 선택하면 관련정보를
        <br />이 곳에서 확인 및 수정 할 수 있습니다.{" "}
      </p>
    </div>
  );
};

const EditCategory = props => {
  const dispatch = useDispatch();
  const { handleAlert } = props;

  // 카테고리 명
  const [name, setName] = useState("");
  const onNameChange = e => {
    setName(e.target.value);
  };

  // 카테고리 타입
  const [cType, setType] = useState("");
  const onTypeChange = e => {
    setType(e.target.id);
  };

  // 카테고리 썸네일
  const [previewImg, setPreview] = useState("");
  const [img, setImg] = useState("");
  const inputImgEl = useRef(null);
  const onImgUpload = e => {
    const preview = URL.createObjectURL(e.target.files[0]);
    setPreview(preview);
    setImg(e.target.files[0]);
    inputImgEl.current.focus();
  };

  // 취소 클릭
  const prevAddCategory = () => {
    handleAlert("취소되었습니다.", () => {});
    dispatch({ type: CATEGORY_STATE, data: { state: "unselected" } });
  };

  // 저장 클릭
  const editCategory = async () => {
    const categoryKey = shortid.generate();
    if (props.addCategory && name === "")
      handleAlert("카테고리 명을 입력해주새요", () => {});
    else {
      if (img === "") categoryEditApi({ categoryKey: categoryKey });
      else {
        const storage = await loadStorage();
        const storageRef = props.addCategory
          ? storage.ref(`site/${props.site}/category/${categoryKey}`)
          : storage.ref(`site/${props.site}/category/${props.id}`);
        const uploadTask = storageRef.put(img);
        uploadTask.on(
          "state_changed",
          () => {},
          err => storageErrHandler(err),
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(async url => {
              categoryEditApi({ url: url, categoryKey: categoryKey });
            });
          }
        );
      }
    }
  };
  // 카테고리 저장 API 연동
  const categoryEditApi = async subProps => {
    const categoryInfo = {
      category: {
        type: props.addCategory
          ? cType === "pc"
            ? 1
            : 2
          : cType === ""
          ? props.type
          : cType === "pc"
          ? 1
          : 2,
        img:
          img === ""
            ? props.addCategory
              ? ""
              : { saveName: props.id, path: props.imgPath }
            : props.addCategory
            ? { saveName: subProps.categoryKey, path: subProps.url }
            : { saveName: props.id, path: subProps.url },
        name: props.addCategory ? name : name === "" ? props.title : name,
        view: props.addCategory ? {} : props.view,
        viewList: props.addCategory ? [] : props.viewList
      }
    };
    const res = await axios[props.addCategory ? "post" : "patch"](
      `${process.env.ASSET_PREFIX}/api/site/${props.site}/category/${
        props.addCategory ? subProps.categoryKey : props.id
      }`,
      categoryInfo
    );
    if (res.status === 200) {
      handleAlert("저장되었습니다.", () => {
        window.location.reload();
      });
      dispatch({ type: CATEGORY_STATE, data: { state: "unselected" } });
    } else alert(`카테고리 ${props.addCategory ? "추가" : "수정"}실패`);
  };
  // Storage 등록 에러 핸들러
  const storageErrHandler = err => {
    switch (err.code) {
      case "storage/unauthorized":
        return alert("User doesn't have permission to access the object");
      case "storage/canceled":
        return alert("User canceled the upload");
      case "storage/unknown":
        return alert("Unknown error occurred, inspect error.serverResponse");
    }
  };

  return (
    <div className="contents">
      <div className="box">
        <form className="form_site">
          <div className="form-group active">
            <input
              id={"name"}
              name={"name"}
              value={name}
              onChange={onNameChange}
              type="text"
              className="form-control"
              title="카테고리"
              placeholder={props.title}
            />
          </div>
        </form>
      </div>
      <div className="box">
        <div className="custom-control custom-radio custom-control-inline mr">
          <input
            type="radio"
            id="pc"
            name="category"
            onChange={onTypeChange}
            className="custom-control-input"
            checked={(cType === "" && props.type === 1) || cType === "pc"}
          />
          <label className="custom-control-label" htmlFor="pc">
            PC
          </label>
        </div>
        <div className="custom-control custom-radio custom-control-inline">
          <input
            type="radio"
            id="mobile"
            name="category"
            onChange={onTypeChange}
            className="custom-control-input"
            checked={(cType === "" && props.type === 2) || cType === "mobile"}
          />
          <label className="custom-control-label" htmlFor="mobile">
            MOBILE
          </label>
        </div>
      </div>
      <div className="box">
        <form className="form_intro">
          <div className="form-group mb-2">
            <span className="img">
              <img
                src={
                  previewImg !== ""
                    ? previewImg
                    : props.addCategory
                    ? "/img/common/default_thumbnail.png"
                    : props.imgPath
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
              htmlFor={"imgUploader"}
            >
              썸네일 변경
            </label>
          </button>
          <input
            style={{ display: "none" }}
            type="file"
            id="imgUploader"
            name={"img"}
            className="form-control-file"
            ref={inputImgEl}
            onChange={onImgUpload}
          />
        </div>
        <p className="desc">
          -가로 00px X 세로 00px (jpg,png,gif허용)
          <br />
          -파일명 영문, 숫자 허용
        </p>
      </div>
      <div className="btn-area mb">
        <button
          onClick={prevAddCategory}
          className="btn btn-lg btn-outline-secondary"
        >
          취소
        </button>
        <button onClick={editCategory} className="btn btn-lg btn-primary">
          저장
        </button>
      </div>
    </div>
  );
};

const Category = props => {
  const dispatch = useDispatch();
  const { siteInfo, categoryState, categoryValue, addCategory } = useSelector(
    state => state.user
  );

  // Alert 모달
  const [openAlert, setOpenAlert] = useState(false);
  const closeAlert = () => setOpenAlert(!openAlert);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertCb, setAlertCb] = useState(() => {});
  const handleAlert = (msg, func) => {
    setAlertMsg(msg);
    setAlertCb(() => func);
  };
  useEffect(() => {
    if (alertMsg !== "") setOpenAlert(true);
  }, [alertCb]);

  // Confirm 모달
  const [openConfirm, setOpenConfirm] = useState(false);
  const closeConfirm = () => setOpenConfirm(!openConfirm);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [confirmCb, setConfirmCb] = useState(() => {});
  const handleConfirm = (msg, func) => {
    setConfirmMsg(msg);
    setConfirmCb(() => func);
  };
  useEffect(() => {
    if (confirmMsg !== "") setOpenConfirm(true);
  }, [confirmCb]);

  // 삭제 클릭
  const onDeleteCategory = () => {
    if (siteInfo.categoryList.length === 1)
      handleAlert("최소 1개의 카테고리는 존재해야 합니다.", () => {});
    else
      handleConfirm("선택한 카테고리를 삭제하시겠습니까?", categoryDeleteApi);
  };

  // 삭제 API 연동
  const categoryDeleteApi = async () => {
    const res = await axios.delete(
      `${process.env.ASSET_PREFIX}/api/site/${siteInfo.url}/category/${categoryValue}`
    );
    if (res.status === 200) {
      dispatch({ type: CATEGORY_STATE, data: { state: "unselected" } });
      window.location.reload();
    } else alert("카테고리 삭제 실패");
  };

  // 새 카테고리 추가 클릭
  const onAddCategory = useCallback(() => {
    if (siteInfo.categoryList.length === 8) alert("카테고리 최대 8개");
    else
      dispatch({
        type: CATEGORY_STATE,
        data: { state: "selected", add: true }
      });
  }, []);

  return (
    <div className="inner no-mw clearfix">
      <div className="section-container edit">
        <section>
          <div className="title_area">
            <Link href={`/admin/edit`} as={`/admin/edit`}>
              <a>
                <h2 className="title">
                  <i className="far fa-chevron-left"></i>
                  {siteInfo.name}
                </h2>
              </a>
            </Link>
            <div className="btn-area mb">
              <button
                onClick={onDeleteCategory}
                className={
                  categoryState === "selected" && !addCategory
                    ? "btn btn-outline-secondary"
                    : "btn btn-outline-secondary disabled"
                }
              >
                삭제
              </button>
              <button onClick={onAddCategory} className="btn btn-primary">
                새 카테고리 추가
              </button>
            </div>
          </div>
          <div className="contents">
            <div className="inner">
              {siteInfo.categoryList.map((item, index) => (
                <CategoryList
                  key={index}
                  imgPath={siteInfo.category[item].img.path}
                  title={siteInfo.category[item].name}
                  id={siteInfo.category[item].id}
                  activeTarget={categoryValue !== "" ? categoryValue : ""}
                  site={props.site}
                  categoryState={categoryState}
                />
              ))}
              <a
                onClick={onAddCategory}
                className={addCategory ? "site add active" : "site add"}
                href="#"
              >
                <p className="plus">
                  <i className="fal fa-plus"></i>
                </p>
                <p className="txt">새 카테고리 추가</p>
              </a>
            </div>
          </div>
        </section>
      </div>
      <div className="snb">
        {categoryState !== "selected" ? (
          <Unselected />
        ) : (
          <EditCategory
            site={siteInfo.url}
            addCategory={addCategory}
            title={
              categoryValue !== "" ? siteInfo.category[categoryValue].name : ""
            }
            type={
              categoryValue !== "" ? siteInfo.category[categoryValue].type : ""
            }
            imgPath={
              categoryValue !== ""
                ? siteInfo.category[categoryValue].img.path
                : ""
            }
            id={categoryValue !== "" ? siteInfo.category[categoryValue].id : ""}
            view={
              categoryValue !== "" ? siteInfo.category[categoryValue].view : ""
            }
            viewList={
              categoryValue !== ""
                ? siteInfo.category[categoryValue].viewList
                : ""
            }
            handleAlert={handleAlert}
          />
        )}
      </div>
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
    </div>
  );
};

export default Category;
