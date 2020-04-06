import axios from 'axios'
import Link from 'next/link'
import { loadStorage } from '../../../../public/js/db'
import { CATEGORY_STATE, VIEW_STATE, LOG_IN } from '../../../../redux/reducers/user'
import {useDispatch, useSelector} from "react-redux";
import React, { useEffect, useState } from 'react'
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
  const { thumbnailPath, category } = props;
  const [title, setTitle] = useState(props.title);
  const [intro, setIntro] = useState(props.intro);
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [introLength, setIntroLength] = useState(props.intro.length);

  console.log(props.id)

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

  // 카테고리 타입 선택
  const onTypeChange = e => {
    setType(e.target.id);
  };

  // 취소 클릭 시
  const handleCancel = () => {
    setState();
  };

  // 카테고리 수정 취소 버튼 선택 시 CATEGORY_STATE 변경
  const prevAddCategory = () => {
    dispatch({ type: CATEGORY_STATE, data: { state: "unselected" } });
  };

  //  이미지 수정 저장 버튼 클릭 시 이미지 타이틀 수정
  const updateCategory = async () => {

    // const { siteInfo , viewState, viewValue } = useSelector(state => state.user);

    console.log(props)

    const view = category.view;
    const viewList = category.viewList;

    // view 데이터 복사
    const newView = { ...view }
    newView[props.id] = {
      ...newView[props.id],
      originName : title,
      intro : intro
    };

    const newCategory = {
      category : {
        ...category,
        view: newView,
        viewList: category.viewList
      }
    };

    // view 데이터 수정
    // '클릭된 이미지의 데이터 '찾고 ...
    // props.id -> object의 key 값

    // let category = {
    //   type: type === "pc" ? 1 : 2,
    //   name: name,
    //   view: view,
    //   viewList: viewList
    // }

    const res = await axios.patch(
      `http://localhost:8080/api/site/${props.url}/category/${props.category.id}`,
      newCategory
    );

    dispatch({ type: VIEW_STATE, data: { state: "unselected" } });
    history.back();

    // const
    // 제목, 이미지 경로, 이미지 소개글 수정


    return;



    const storage = await loadStorage();
    const storageRef = storage.ref(`site/${props.site}/category/${props.id}/${props.saveName}`);
    const uploadTask = storageRef.put(img);
    console.log(storageRef)




    uploadTask.on(
      "state_changed",
      () => {},
      err => storageErrHandler(err),
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(async url => {
          const categoryInfo = {
            category: {
              type: type === "pc" ? 1 : 2,
              name: name,
              view: newData,
              viewList: props.viewList
            }
          };
          const res = await axios.patch(
            `http://localhost:8080/api/site/${props.site}/category/${props.id}`,
            categoryInfo
          );
          if (res.status === 200) {
            dispatch({ type: CATEGORY_STATE, data: { state: "unselected" } });
            history.back();
          } else alert("카테고리 추가 실패");
        });
      }
    );
  };

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
              type="text"
              className="form-control"
              title="이미지명"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
        </form>
      </div>
      <div className="box">
        <a className="add_logo" href="#">
          <img src={props.imgPath} alt={props.title} />
        </a>
        <div className="btn-area mb-1 change">
          <button className="btn btn-secondary w-auto">썸네일 이미지 변경</button>
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
              placeholder="이미지 소개글을 입력하세요"
              style={{ "resize": "none" }}
              value={intro}
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
        <button className="btn btn-lg btn-primary" onClick={updateCategory}>저장</button>
      </div>
    </div>

  )
};

const View = props => {

  const dispatch = useDispatch();

  const { siteInfo , viewState, viewValue } = useSelector(state => state.user);


    // console.log(siteInfo);
    // console.log(props.category);
    // console.log(viewState);
    // console.log(viewValue);

  const category = siteInfo.category[props.category];
  const view = category.view;
  const viewList = category.viewList;
  const url = siteInfo.url;

    // console.log(view);
    // console.log(viewList);

    //                   0      1
    // categoryList = [ 테1 , 테2 ]
    // category = [
    // {} , // 무조건 테1 해당하는 정보 : 0
    // {}  // 무조건 테2 해당하는 정보 : 1
    // ]
    // props.category = 테2


    // indexOf 란 >  배열에서 'value' 값의 인덱스 정보를 반환
    // indexOf 사용 방법>  array.indexOf('value') = index
    // indexOf 시용 방법 예시> siteInfo.categoryList.indexOf('테2') = 1

    // siteInfo.category[siteInfo.categoryList.indexOf(props.category)] = category[1]


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
              <button className="btn btn-outline-secondary">삭제</button>
              <button className="btn btn-primary">새 이미지 추가</button>
            </div>
          </div>
          <div className="contents">
            <div className="inner scroll">
              {viewList.map((item , index) => (
                <ViewList
                  key = {index}
                  imgPath = {view[item].img.path}
                  title = {view[item].originName}
                  id = {view[item].id}
                  activeTarget={viewValue !== "" ? viewValue : ""}
                />
              ))}
              <a className="site add" href="#">
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
                  id = {view[viewValue].id}
                  title = {viewValue !== '' ? view[viewValue].originName : ''}
                  imgPath = {view[viewValue].img.path}
                  intro = {view[viewValue].intro}
              />:
                <Unselected/>
        }
      </div>
    </div>
  );
};

export default View;
