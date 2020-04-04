import Link from 'next/link'
import {VIEW_STATE, CATEGORY_STATE} from "../../../../redux/reducers/user";
import {useDispatch, useSelector} from "react-redux";
import React, { useEffect } from 'react'

const ViewList = props => {

  const dispatch = useDispatch();
  const setState = e => {
    dispatch({type : VIEW_STATE, data : { state : 'selected', value : e }});
  };
  return(
    <a className={props.activeTarget === props.title ? 'site active' : 'site'}>
      <span className="site-img">
        <img src={props.imgPath} alt={props.title} />
      </span>
      <span className="site-body">
        <span className="title">{props.title}</span>
      </span>
      <span className="btn-area single">
        <button onClick={(e) => setState(props.id)} className="btn btn-outline-secondary mr-1">선택</button>
      </span>
    </a>
  )
  console.log(props.title)
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

const handleChange = props => {
  // const [value, setValue] = useState(props.intro);
  // setValue(props.intro);
  console.log('수정중');
}

const Selected = props => {

  return(
    <div className="contents">
      <div className="box">
        <form className="form_site">
          <div className="form-group active">
            <input
              type="text"
              className="form-control"
              title="이미지명"
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
              value={props.intro}
              onChange = {handleChange}
              />
          </div>
        </form>
        <p className="desc clearfix">
          <span className="float-left">한글기준 200자 이내</span>
          <span className="float-right pr-2">
            <span className="_word">0</span>/200</span>
        </p>
      </div>
      <div className="btn-area mb">
        <button className="btn btn-lg btn-outline-secondary">취소</button>
        <button className="btn btn-lg btn-primary">저장</button>
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


  const view = siteInfo.category[props.category].view;
  const viewList = siteInfo.category[props.category].viewList;


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
            <Link href={'http://localhost/admin/edit?site=ab&category=cd'}>
              <a href="#"><h2 className="title"><i className="far fa-chevron-left"></i>{siteInfo.category[props.category].name}</h2></a>
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
