import axios from 'axios'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStorage } from "../../../../public/js/db";
import Alert from '../../../popup/alert';
import Confirm from '../../../popup/Confirm';
import shortid from 'shortid'
import { CATEGORY_STATE, VIEW_STATE } from '../../../../redux/reducers/user'
/*
1. ? : => 'active'
2. (input)intro 수정 기능 onChange
3. (textarea) title 수정 기능 onChange
4. (textarea) 글자수 제한 및 카운트 기능
5. 썸네일 이미지 변경 -> file 찾기 -> 이미지 변경
6. 새 이미지 추가 -> modal(알림창 '이미지가 추가되었습니다.')
7. 이미지 저장 -> modal(알림창 '이미지가 저장되었습니다.')
8. 삭제 -> modal(알림창 '삭제하시겠습니까?->확인/취소->'삭제되었습니다.')
9. 저장 ->  modal(알림창 '저장하겠습니까?->저장/취소->'저장되었습니다..')
10. 취소
* */
const ViewList = props => {

  const dispatch = useDispatch();
  const setState = e => {
    dispatch({type : VIEW_STATE, data : { state : 'selected', value : e }});
  };
  return(
    <div className={`site ${props.activeTarget === props.id ? "active" : ""}`}>
      <span className="site-img">
        <img src={props.imgPath} alt={props.title} />
      </span>
      <span className="site-body">
        <span className="title">{props.title}</span>
      </span>
      <span className="btn-area single">
        <button onClick={(e) => setState(props.id)} className="btn btn-outline-secondary mr-1">선택</button>
      </span>
    </div>
  )
};

const None= props => {
  return(
    <div className="select">
      <p className="title">이미지를 추가하세요</p>
    </div>
  )
};

const Unselected = props => {
  return(
    <div className="select">
      <p className="title">이미지를 선택하세요</p>
      <p className="desc">이미지를 선택하면 관련정보를<br/>
        이 곳에서 확인 및 수정 할 수 있습니다. </p>
    </div>
  )
};

const Selected = props => {
  const { category } = props;
  const [title, setTitle] = useState(props.title);
  const [intro, setIntro] = useState(props.intro);
  const [img, setImg] = useState("");
  const [introLength, setIntroLength] = useState(props.intro.length);

  const dispatch = useDispatch();
  const setState = e => {
    dispatch({type : VIEW_STATE, data : { state : 'unselected', value : e }});
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

  // 이미지 변경
  const onImgUpload = e => {
    setImg(e.target.files[0]);
  };

  // 취소 클릭 시
  const handleCancel = () => {
    dispatch({type : VIEW_STATE, data : { state : 'unselected'}});
    window.location.reload();
  };

  // 이미지 추가
  const registerImage = async () => {
    const view = category.view;
    const viewList = category.viewList;

    // view 데이터 복사
    const newView = { ...view }
    let viewId  = shortid.generate();
    viewList.push(viewId);

    newView[viewId] = {
      ...newView[viewId],
      id: viewId,
      originName : title,
      intro : intro
    };

    const newCategoryList = {
      category : {
        ...category,
        view: newView,
        viewList
      }
    };

    if(img === ''){
      // newView 배열에 기존 데이터 또는 새로운 데이터 가지고 img : {} 만들어 넣고 API 연동
      /*
     * newView  배열에 img : { path : '/img/common/default_thumbnail.png' , saveName : viewId}
     *  > 추가 : 이미지 선택 X
     *     > path : 디폴트 , saveName : viewId  : 새로 만들어준 ID값
     *
     * newView  배열에 img : { path : '기존 이미지(props.imgPath)' , saveName : '기존 saveName (props로 기존 saveName 전달 받아서 처리)'}
     *  > 수정 : 이미지 수정 X
     *     > path : 기존 , saveName  : 기존
     */
      // TODO : newView 배열에 기존 데이터 또는 새로운 데이터 가지고 img : {} 만들어 넣기
      newView[viewId] = {
        ...newView[viewId],
        id: viewId,
        originName : title,
        intro : intro,
        img : img === '' ? ({saveName: viewId, path : '/img/common/default_thumbnail.png'}) : (props.addImage ? '' : {saveName : props.saveName, path : props.imgPath})
      };
      // API 연동
      const res = await axios.patch (
        `http://localhost:8080/api/site/${props.url}/category/${props.category.id}`,
        newView
      );
      if (res.status === 200) {
        dispatch({ type: VIEW_STATE, data: { state: "unselected" } });
        window.location.reload();
      } else alert(`이미지 ${ props.addImage ? '추가' : '수정'}실패` );

    } else {
      // newView 배열에 스토리지 저장 후 반환된 URL 값으로 img : {} 만들어 넣고 API 연동
      // 스토리지 저장
      const storage = await loadStorage();
      const storageRef = storage.ref(`site/${props.site}/category/${viewId}`);
      const uploadTask = storageRef.put(img);
      uploadTask.on(
        "state_changed",
        () => {},
        err => storageErrHandler(err),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async url => {
            /*
          *  > 추가 : 이미지 선택 O
           *     > path : 선택한 이미지 : 스토리지가 반환해준 url , saveName : viewId  : 새로 만들어준 ID값
          *
          *  > 수정 : 이미지 수정 O
          *     > path : 선택한 이미지 : 스토리지가 반환해준 url , saveName : 기존
          */
            // TODO : 반환된 URL 값으로 img : {} 만들기
            newView[viewId] = {
              ...newView[viewId],
              id: viewId,
              originName : title,
              intro : intro,
              img : img === '' ? '' : (props.addImage ? {saveName : viewId, path : props.url} : {saveName : props.saveName, path : props.url})
            };

            //API 연동
            const res = await axios.patch (
              `http://localhost:8080/api/site/${props.url}/category/${props.category.id}`,
              newView
            );
            if (res.status === 200) {
              dispatch({ type: VIEW_STATE, data: { state: "unselected" } });
              window.location.reload();
            } else alert(`이미지 ${ props.addImage ? '추가' : '수정'}실패` );
          });
        }
      );
    };
    }

    // console.log(newCategoryList)

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

  return(
    <div className="contents">
      <div className="box">
        <form className="form_site">
          <div className="form-group active">
            <input
              id="name"
              type="text"
              className="form-control"
              title="이미지명"
              onChange={handleTitleChange}
              placeholder={props.title}
            />
          </div>
        </form>
      </div>
      <div className="box">
        <a className="add_logo" href="#">
          <img src={props.imgPath} alt={props.title} />
        </a>
        <div className="btn-area mb-1 change">
          <input
            type="file"
            id="imgUploader"
            name="img"
            className="form-control-file"
            onChange={onImgUpload}
          />
          {/*<button className="btn btn-secondary w-auto">썸네일 이미지 변경</button>*/}
        </div>
        <p className="desc">-가로 00px X 세로 00px (jpg,png,gif허용)<br/>-파일명 영문, 숫자 허용</p>
      </div>
      <div className="box intro">
        <form className="form_intro">
          <div className="form-group mb-1">
            <label htmlFor="introduction" />
            <textarea
              className="form-control"
              id="introduction"
              rows="7"
              style={{ "resize": "none" }}
              placeholder={props.intro}
              onChange = {handleIntroChange}
              />
          </div>
        </form>
        <p className="desc clearfix">
          <span className="float-left">한글기준 200자 이내</span>
          <span className="float-right pr-2">
            <span>{introLength}</span>/200</span>
        </p>
      </div>
      <div className="btn-area mb">
        <button className="btn btn-lg btn-outline-secondary" onClick={handleCancel}>취소</button>
        <button className="btn btn-lg btn-primary" onClick={registerImage}>저장</button>
      </div>
    </div>
  )
};

const View = props => {

  const dispatch = useDispatch();
  const { siteInfo , viewState, viewValue, addImage } = useSelector(state => state.user);
  const [openConfirm, setOpenConfirm ] = useState(false);
  const [openAlert, setOpenAlert ] = useState(false);

  const category = siteInfo.category[props.category];
  const view = category.view;
  const viewList = category.viewList;
  const url = siteInfo.url;

  // 새 이미지 추가 클릭 시 VIEW_STATE 변경
  const onAddImage = useCallback(() => {
    dispatch({type : VIEW_STATE, data : { state : 'selected' , add : true}})
  }, []);

  // 카테고리 전체 혹은 1개만 있는 경우 삭제 시 Alert 팝업 노출
  const closeAlert = () => {
    setOpenAlert(!openAlert);
  };
  const alertCallback = () => {
    closeAlert();
  };
  // 카테고리 정상 삭제 시 Confirm 팝업 노출
  const closeConfirm = props => {
    if(props === 'delete'){
      dispatch({type : VIEW_STATE, data : { state : 'unselected'}});
      window.location.reload();
    }
    setOpenConfirm(!openConfirm);
  };
  const confirmCallback = () => {
    closeConfirm('delete');
  };

  // 삭제 버튼 클릭 시 카테고리 삭제
  const onDeleteImage =  async () => {
    if (viewValue === '')  alert ("삭제 할 카테고리를 선택해주세요");
    else{
      const res = await axios.delete(
        `http://localhost:8080/api/site/${url}/category/${viewValue}`,
      );
     if(res.status === 200) closeConfirm();
      else alert('카테고리 삭제 실패');
    }
  };

  useEffect(() => {
      viewList.length === 0 ? dispatch({type : VIEW_STATE, data : { state : 'none'} }) : dispatch({type : VIEW_STATE, data : { state : 'unselected'} });
  }, []);

  return (
    <div className="inner no-mw clearfix">
      <div className="section-container edit">
        <section>
          <div className="title_area">
            <Link href={`/admin/edit?site=${url}`} as={`/admin/edit?site=${url}`}>
              <a href="#"><h2 className="title"><i className="far fa-chevron-left"></i>{category.name}</h2></a>
            </Link>
            <div className="btn-area mb">
              <button onClick={onDeleteImage} className="btn btn-outline-secondary">삭제</button>
              <button onClick={onAddImage} className="btn btn-primary">새 이미지 추가</button>
            </div>
          </div>
          <div className="contents">
            <div className="inner scroll">
              {viewList.map((item , index) => (
                <ViewList
                  key = {index}
                  // imgPath = {view[item] ? view[item].img.path : ''}
                  title = {view[item] ? view[item].originName : ''}
                  id = {view[item] ? view[item].id : ''}
                  activeTarget={viewValue !== "" ? viewValue : ""}
                />
              ))}
              <a onClick={onAddImage} className={addImage ? "site add active" : "site add"} href="#">
                <p className="plus"><i className="fal fa-plus"></i></p>
                <p className="txt">새 이미지 추가</p>
              </a>
            </div>
          </div>
        </section>
      </div>
      <div className="snb">
        {
          viewState === 'none'
            ? <None/> :
              viewState === 'selected'
              ? <Selected
                  url = {url}
                  category = {category}
                  siteInfo = {siteInfo}
                  addImage={addImage}
                  title = {viewValue !== '' ? view[viewValue].originName : ''}
                  id = {view[viewValue] ? view[viewValue].id : ''}
                  // imgPath = {viewValue !== '' ? view[viewValue].img.path : ''}
                  intro = {view[viewValue] ? view[viewValue].intro : ''}
              />:
                <Unselected/>
        }
      </div>
      { openConfirm ?  <Confirm message={"선택한 카테고리를 삭제하시겠습니까?"}  closeConfirm={closeConfirm} cb={confirmCallback}/> : '' }
      { openAlert ?  <Alert message={"최소 1개의 카테고리는 존재해야 합니다."} closeAlert={closeAlert} cb={alertCallback}/> : '' }
    </div>
  );
};

export default View;
