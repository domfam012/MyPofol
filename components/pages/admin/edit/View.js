import axios from 'axios'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStorage } from '../../../../public/js/db'
import Alert from '../../../popup/alert'
import Confirm from '../../../popup/Confirm'
import shortid from 'shortid'
import { VIEW_STATE } from '../../../../redux/reducers/user'

const ViewList = props => {
  const dispatch = useDispatch()
  const setState = e => {
    dispatch({
      type: VIEW_STATE,
      data: {
        state: 'selected',
        value: e
      }
    })
  }
  return (
    <div className={`site ${props.activeTarget === props.id ? 'active' : ''}`}>
      <span className="site-img">
        <img src={props.imgPath} alt={props.title}/>
      </span>
      <span className="site-body">
        <span className="title">{props.title}</span>
      </span>
      <span className="btn-area single">
        <button onClick={(e) => setState(props.id)} className="btn btn-outline-secondary mr-1">선택</button>
      </span>
    </div>
  )
}
// 이미지가 없을 경우
const None = props => {
  return (
    <div className="select">
      <p className="title">이미지를 추가하세요</p>
    </div>
  )
}
// 이미지를 선택하지 않았을 경우
const Unselected = props => {
  return (
    <div className="select">
      <p className="title">이미지를 선택하세요</p>
      <p className="desc">이미지를 선택하면 관련정보를<br/>
        이 곳에서 확인 및 수정 할 수 있습니다. </p>
    </div>
  )
}
// 이미지가 선택 됐을 경우
const Selected = props => {
  const { category } = props
  const [title, setTitle] = useState('')
  const [intro, setIntro] = useState('')
  const [img, setImg] = useState('')
  const [introLength, setIntroLength] = useState(props.intro.length)
  const [previewImg, setPreview] = useState("")
  const inputImgEl = useRef(null)
  const [isSave, checkIsSave ] = useState(true);
  const [openAlert, setOpenAlert ] = useState(false);

  const dispatch = useDispatch()
  const setState = e => {
    dispatch({
      type: VIEW_STATE,
      data: {
        state: 'unselected',
        value: e
      }
    })
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleIntroChange = e => {
    if (e.target.value.length < 201) {
      setIntro(e.target.value)
      setIntroLength(e.target.value.length)
    }
  }

  // 이미지 변경
  const onImgUpload = e => {
    const preview = URL.createObjectURL(e.target.files[0]);
    setPreview(preview);
    setImg(e.target.files[0]);
    inputImgEl.current.focus();
  }

  // 취소 클릭 시
  const handleCancel = () => {
    dispatch({
      type: VIEW_STATE,
      data: { state: 'unselected' }
    })
    window.location.reload()
  }

  // 이미지 변경 및 추가
  const EditView = async () => {
    const view = category.view
    const viewList = category.viewList
    const newView = { ...view }  // view 데이터 복사

    console.log('#1');
    console.log(newView);

    if (img === '') {
      // newView 배열에 기존 데이터 또는 새로운 데이터 가지고 img : {} 만들어 넣고 API 연동
      /*
       * newView  배열에 img : { path : '/img/common/default_thumbnail.png' , saveName : viewId }
       *  > 추가 : 이미지 선택 X
       *     > path : 디폴트 , saveName : viewId  : 새로 만들어준 ID값
       *
       * newView  배열에 img : { path : '기존 이미지(props.imgPath)' , saveName : '기존 saveName (props로 기존 saveName 전달 받아서 처리)'}
       *  > 수정 : 이미지 수정 X
       *     > path : 기존 , saveName  : 기존
       */
      // TODO : newView 배열에 기존 데이터 또는 새로운 데이터 가지고 img : {} 만들어 넣기
      if (props.addImage) {
        // 추가
        let viewId  = shortid.generate();
        viewList.push(viewId)
        newView[viewId] = {
          ...newView[viewId],
          id: viewId,
          originName: title,
          intro: intro,
          img: {
            saveName: viewId,
            path: '/img/common/default_thumbnail.png'
          }
        }
      } else {
        // 수정
        const newView = {
          ...newView,
          originName : props.title,
          intro: props.intro,
          img : {
            saveName: props.saveName,
            path : props.imgPath
          }
        }
      }
      const newCategoryList = {
        category: {
          ...category,
          view: {
            ...newView
          },
          viewList
        }
      }
      // API 연동
      const res = axios.patch (
        `http://localhost:8080/api/site/${props.url}/category/${props.category.id}`,
        newCategoryList
      )
      if (res.status === 200) {
        dispatch({
          type: VIEW_STATE,
          data: { state: 'unselected' }
        })
      } else {
        alert(`이미지 ${ props.addImage ? '추가' : '수정'} 되었습니다` );
      }
      window.location.reload()
    } else {
      // newView 배열에 스토리지 저장 후 반환된 URL 값으로 img : {} 만들어 넣고 API 연동
      let viewId = shortid.generate(); // 스토리지 저장
      const storage = await loadStorage()
      const storageRef = storage.ref(`site/${props.url}/category/${props.category.id}/${viewId}`)
      const uploadTask = storageRef.put(img)
      uploadTask.on(
        'state_changed',
        () => {
        },
        err => storageErrHandler(err),
        () => {
          uploadTask.snapshot.ref.getDownloadURL()
            .then(async newUrl => {
                /*
                *  > 추가 : 이미지 선택 O
                *     > path : 선택한 이미지 : 스토리지가 반환해준 url , saveName : viewId  : 새로 만들어준 ID값
                *
                *  > 수정 : 이미지 수정 O
                *     > path : 선택한 이미지 : 스토리지가 반환해준 url , saveName : 기존
                */
                // TODO : 반환된 URL 값으로 img : {} 만들기
                if (props.addImage) {
                  // 추가
                  viewList.push(viewId)
                  newView[viewId] = {
                    ...newView[viewId],
                    id: viewId,
                    originName: title,
                    intro: intro,
                    img: {
                      saveName: viewId,
                      path: newUrl
                    }
                  }
                } else {
                  // 수정
                  debugger
                  const newView = {
                    ...newView,
                    originName: title,
                    intro: intro,
                    img: {
                      saveName: props.id,
                      path: newUrl
                    }
                  }
                }
                const newCategoryListImg = {
                  category: {
                    ...category,
                    view: {
                      ...newView
                    },
                    viewList
                  }
                }
                //API 연동
                const res = await axios.patch (
                  `http://localhost:8080/api/site/${props.url}/category/${props.category.id}`,
                  newCategoryListImg
                )
                if (res.status === 200) {
                  dispatch({
                    type: VIEW_STATE,
                    data: { state: 'unselected' }
                  })
                  window.location.reload()
                } else {
                  alert(`이미지 ${props.addImage ? '추가' : '수정'} 실패`)
                }
              }
            )
        }
      )
    }
  }

  // console.log(newCategoryList)

  const storageErrHandler = err => {
    switch (err.code) {
      case 'storage/unauthorized':
        return alert('User doesn\'t have permission to access the object')
      case 'storage/canceled':
        return alert('User canceled the upload')
      case 'storage/unknown':
        return alert('Unknown error occurred, inspect error.serverResponse')
    }
  }

  return (
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
          <img src={ previewImg !== '' ? previewImg : props.addImage ? "/img/common/default_thumbnail.png" : props.imgPath} alt={props.title}/>
        </a>
        <div className="btn-area mb-1 change">
            <button className="btn btn-secondary">
            <label
                  style={{ cursor: "pointer", marginBottom: "0" }}
                  htmlFor={"imgUploader"}
            >
            이미지 변경
          </label>
          </button>
          <input
            style={{ display: "none" }}
            type="file"
            id="imgUploader"
            name="img"
            className="form-control-file"
            ref={inputImgEl}
            onChange={onImgUpload}
          />
        </div>
        <p className="desc">-가로 00px X 세로 00px (jpg,png,gif허용)<br/>-파일명 영문, 숫자 허용</p>
      </div>
      <div className="box intro">
        <form className="form_intro">
          <div className="form-group mb-1">
            <label htmlFor="introduction"/>
            <textarea
              className="form-control"
              id="introduction"
              rows="7"
              style={{ 'resize': 'none' }}
              placeholder={props.intro}
              onChange={handleIntroChange}
              maxLength='200'
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
        <button className="btn btn-lg btn-primary" onClick={EditView}>저장</button>
      </div>
      { openAlert ?  <Alert message={isSave ? "저장되었습니다." : "이미지명을 입력해주세요."} closeAlert={closeAlert} cb={alertCallback}/> : '' }
    </div>
  )
}

const View = props => {

  const dispatch = useDispatch()
  const { siteInfo, viewState, viewValue, addImage } = useSelector(state => state.user)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)

  const category = siteInfo.category[props.category]
  const view = category.view
  const viewList = category.viewList
  const url = siteInfo.url

  // 이미지 삭제 시 Alert 팝업 노출
  const closeAlert = () => {
    setOpenAlert(!openAlert)
  }
  const alertCallback = () => {
    closeAlert()
  }
  // 이미지 정상 삭제 시 Confirm 팝업 노출
  const closeConfirm = props => {
    if (props === 'delete') {
      dispatch({
        type: VIEW_STATE,
        data: { state: 'unselected' }
      })
      window.location.reload()
    }
    setOpenConfirm(!openConfirm)
  }
  const confirmCallback = () => {
    deleteImageApi();
  }

  // 새 이미지 추가 클릭 시 VIEW_STATE 변경
  const onAddImage = useCallback(() => {
    dispatch({
      type: VIEW_STATE,
      data: {
        state: 'selected',
        add: true
      }
    })
  }, [])

  // 삭제 버튼 클릭 시 카테고리 삭제
  const onDeleteImage =  async () => {
    if(viewList.length === 1) closeAlert();
    else {
      if (viewValue === '' )  alert ("삭제할 이미지를 선택해주세요");
      else{
        closeConfirm();
      }
    }
  };
  // 삭제 버튼 클릭 시 이미지 삭제
  const deleteImageApi = async () => {
    debugger
    const res = await axios.patch(
      `http://localhost:8080/api/site/${siteInfo.url}/category/${category.id}`
    );
    if(res.status === 200) closeConfirm('delete');
    else alert('이미지 삭제 실패');
  }

  useEffect(() => {
    viewList.length === 0 ? dispatch({
      type: VIEW_STATE,
      data: { state: 'none' }
    }) : dispatch({
      type: VIEW_STATE,
      data: { state: 'unselected' }
    })
  }, [])

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
              {viewList.map((item, index) => (
                <ViewList
                  key={index}
                  imgPath={view[item] ? view[item].img.path : ''}
                  title={view[item] ? view[item].originName : ''}
                  id={view[item] ? view[item].id : ''}
                  activeTarget={viewValue !== '' ? viewValue : ''}
                />
              ))}
              <a onClick={onAddImage} className={addImage ? 'site add active' : 'site add'} href="#">
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
                url={url}
                category={category}
                siteInfo={siteInfo}
                addImage={addImage}
                title={viewValue !== '' ? view[viewValue].originName : ''}
                id={view[viewValue] ? view[viewValue].id : ''}
                imgPath={viewValue !== '' ? view[viewValue].img.path : ''}
                intro={view[viewValue] ? view[viewValue].intro : ''}
              /> :
              <Unselected/>
        }
      </div>
        { openConfirm ? <Confirm message={'선택한 이미지를 삭제하시겠습니까?'} closeConfirm={closeConfirm} cb={confirmCallback}/> : ''}
        { openAlert ?  <Alert message={"삭제할 이미지를 선택해주세요."} closeAlert={closeAlert} cb={alertCallback}/> : '' }
      </div>
  );
};

export default View;
