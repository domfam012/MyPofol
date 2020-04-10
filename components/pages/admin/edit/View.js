import axios from 'axios'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStorage } from '../../../../public/js/db'
import Alert from '../../../popup/alert'
import Confirm from '../../../popup/Confirm'
import shortid from 'shortid'
import { CATEGORY_CHANGE, CATEGORY_STATE, VIEW_CHANGE, VIEW_STATE } from '../../../../redux/reducers/user'

const ViewList = props => {
  const dispatch = useDispatch();

  // 이미지 선택 클릭
  const setState = e => {
    if (props.viewState === 'selected' && props.activeTarget === e) {
      dispatch({ type: VIEW_STATE,
        data: {
          state: 'unselected'
        }
      })
    } else {
      dispatch({ type: VIEW_STATE,
        data: {
          state: 'selected',
          value: e,
          change: true
        }
      })
    }
  };
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
  const [previewImg, setPreview] = useState('')
  const inputImgEl = useRef(null)
  const { handleAlert, handleConfirm } = props;
  const {addImage, viewSave} = useSelector(state => state.user);

  const dispatch = useDispatch();
  const setState = e => {dispatch({ type: VIEW_STATE, data: { state: 'unselected', value: e } })}

  // 이미지 명
  const handleTitleChange = e => {
    setTitle(e.target.value)
  }
  // 이미지 설명
  const handleIntroChange = e => {
    if (e.target.value.length < 201) {
      setIntro(e.target.value)
      setIntroLength(e.target.value.length)
    }
  }

  // 이미지 변경
  const onImgUpload = e => {
    const preview = URL.createObjectURL(e.target.files[0])
    setPreview(preview)
    setImg(e.target.files[0])
    inputImgEl.current.focus()
  }

  // SNB 노출 시 선택 클릭
  useEffect(() => {
    if(title !== '' || img !== '') dispatch({type : VIEW_CHANGE, data : { change : true }});
    else dispatch({type : VIEW_CHANGE, data : { change : false }});
  }, [title, img]);

  // 변경 내용 저장 팝업 노출
  useEffect(() => {
    if(viewSave) handleConfirm("변경된 내용이 있습니다. 저장하시겠습니까?", EditView);
  }, [viewSave]);

  // 취소 클릭
  const handleCancel = () => {
    handleAlert("취소되었습니다.", ()=>{});
    dispatch({type : VIEW_STATE, data : { state : 'unselected'}});
  };

  // 이미지 변경 및 추가
  const EditView = async () => {
    if (props.addImage && title === '') handleAlert('이미지 명을 입력해주세요', () => {});
    else {
      let viewId = shortid.generate();
      if (img === '') {
        EditViewApi({ viewId : viewId})
      } else {
        // newView 배열에 스토리지 저장 후 반환된 URL 값으로 img : {} 만들어 넣고 API 연동
        // 스토리지 저장
        const storage = await loadStorage()
        const storageRef = storage.ref(`site/${props.url}/category/${props.category.id}/${props.addImage? viewId : props.id}`)
        const uploadTask = storageRef.put(img)
        uploadTask.on(
          'state_changed',
          () => {
          },
          err => storageErrHandler(err),
          () => {
            uploadTask.snapshot.ref.getDownloadURL()
              .then(async newUrl => {EditViewApi({ newUrl : newUrl , viewId : viewId});}
              )
          }
        )
      }
    }
  }

  const EditViewApi = async subProps => {
    const { newUrl , viewId} = subProps ;
    const view = category.view
    const viewList = category.viewList
    const newView = { ...view }
    const newViewList = [...viewList]// view 데이터 복사

    if (props.addImage) {
      // 추가
      newViewList.push(viewId)
      newView[viewId] = {
        ...newView[viewId],
        id: viewId,
        originName: title,
        intro: intro,
        img: {
          saveName: viewId,
          path: img === '' ? '/img/common/default_thumbnail.png' : newUrl
        }
      }
    }  else {
      // 수정
      newView[props.id] = {
        id : props.id,
        originName: title === '' ? props.title : title,
        intro: intro === '' ? props.intro : intro,
        img: {
          saveName: props.id,
          path: img === '' ? props.imgPath : newUrl
        }
      }
    }

    const newCategoryList = {
      category: {
        ...category,
        view: {
          ...newView
        },
        viewList : newViewList
      }
    }
    // API 연동
    const res = await axios.patch(
      `${process.env.ASSET_PREFIX}/api/site/${props.url}/category/${props.category.id}`,
      newCategoryList
    )
    if (res.status === 200) {
      handleAlert('저장되었습니다.', () => {
        window.location.reload()
      })
      dispatch({
        type: VIEW_STATE,
        data: { state: 'unselected' }
      })
    } else {
      alert(`이미지 ${props.addImage ? '추가' : '수정'}실패`)
    }
  }
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
          <img
            src={previewImg !== '' ? previewImg : props.addImage ? '/img/common/default_thumbnail.png' : props.imgPath}
            alt={props.title}/>
        </a>
        <div className="btn-area mb-1 change">
          <button className="btn btn-secondary">
            <label
              style={{
                cursor: 'pointer',
                marginBottom: '0',
                display: 'block'
              }}
              htmlFor={'imgUploader'}
            >
              이미지 변경
            </label>
          </button>
          <input
            style={{ display: 'none' }}
            type="file"
            id="imgUploader"
            name="img"
            className="form-control-file"
            ref={inputImgEl}
            onChange={onImgUpload}
            maxLength='20'
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
    </div>
  )
}

const View = props => {

  const dispatch = useDispatch()
  const { siteInfo, viewState, viewValue, addImage } = useSelector(state => state.user)

  const category = siteInfo.category[props.category]
  const view = category.view
  const viewList = category.viewList
  const url = siteInfo.url

  // Alert 모달
  const [openAlert, setOpenAlert] = useState(false)
  const closeAlert = () => setOpenAlert(!openAlert)
  const [alertMsg, setAlertMsg] = useState('')
  const [alertCb, setAlertCb] = useState(() => {})
  const handleAlert = (msg, func) => {
    setAlertMsg(msg)
    setAlertCb(() => func)
  }
  useEffect(() => {
    if (alertMsg !== '') {
      setOpenAlert(true)
    }
  }, [alertCb])

  // Confirm 모달
  const [openConfirm, setOpenConfirm] = useState(false)
  const closeConfirm = () => setOpenConfirm(!openConfirm)
  const [confirmMsg, setConfirmMsg] = useState('')
  const [confirmCb, setConfirmCb] = useState(() => {
  })
  const handleConfirm = (msg, func) => {
    setConfirmMsg(msg)
    setConfirmCb(() => func)
  }
  useEffect(() => {
    if (confirmMsg !== '') {
      setOpenConfirm(true)
    }
  }, [confirmCb])

  // 새 이미지 추가 클릭 시 VIEW_STATE 변경
  const onAddImage = useCallback(() => {
    dispatch({
      type: VIEW_STATE,
      data: {
        state: 'selected',
        add: true
      }
    });
  }, []);

  useEffect(() => {
    dispatch({type : VIEW_STATE, data : { state : 'unselected'}});
    dispatch({type : VIEW_CHANGE, data : { change : false }});
  }, []);


  // 삭제 버튼 클릭 시 이미지 삭제
  const onDeleteImage = async () => {
    handleConfirm('선택한 이미지를 삭제하시겠습니까?', deleteImageApi)
  }
  // 삭제 버튼 클릭 시 이미지 삭제
  const deleteImageApi = async () => {
    const view = category.view
    const viewList = category.viewList

    const index = viewList.indexOf(viewValue);
    viewList.splice(index, 1);
    delete view[viewValue];

    const newCategoryList = {
      category: {
        ...category,
        view: view,
        viewList
      }
    }

    const res = await axios.patch(
      `${process.env.ASSET_PREFIX}/api/site/${siteInfo.url}/category/${category.id}`,
      newCategoryList
    )
    if (res.status === 200) {
      dispatch({type : VIEW_STATE, data : { state : 'unselected'}});
    } else {
      alert('이미지 삭제 실패')
    }
  }

  return (
    <div className="inner no-mw clearfix">
      <div className="section-container edit">
        <section>
          <div className="title_area">
            <Link href={`/admin/edit?site=${url}`} as={`/admin/edit?site=${url}`}>
              <a href="#"><h2 className="title"><i className="far fa-chevron-left"></i>{category.name}</h2></a>
            </Link>
            <div className="btn-area mb">
              <button onClick={onDeleteImage}
                      className={viewState === 'selected' && !addImage || viewState === 'none' ? 'btn btn-outline-secondary' : 'btn btn-outline-secondary disabled'}>삭제
              </button>
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
                  viewState={viewState}
                  handleAlert={handleAlert}
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
                handleAlert={handleAlert}
              /> :
              <Unselected/>
        }
      </div>
      {openAlert ? <Alert message={alertMsg} cb={alertCb} closeAlert={closeAlert}/> : ''}
      {openConfirm ? <Confirm message={confirmMsg} cb={confirmCb} closeConfirm={closeConfirm}/> : ""}
    </div>
  );
};

export default View;
