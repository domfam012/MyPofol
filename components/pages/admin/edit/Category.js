import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState,  useRef} from "react";
import {CATEGORY_STATE, CATEGORY_CHANGE} from "../../../../redux/reducers/user";
import {loadStorage } from "../../../../public/js/db";
import Alert from '../../../popup/alert';
import Confirm from '../../../popup/Confirm';
import Link from 'next/link'
import axios from "axios";
import shortid from 'shortid';

const CategoryList = props => {
    const dispatch = useDispatch();
    const { categoryId, categoryImg, categoryName, activeTarget, site, categoryState, categoryChange, handleConfirm } = props;

    // 카테고리 선택 클릭
    const setCategoryState = e => {
        if(categoryState === 'selected' && activeTarget === e) dispatch({type : CATEGORY_STATE, data : { state : 'unselected'}});
        else {
            dispatch({type : CATEGORY_STATE, data : { state : 'selected', value : e}});
            /*if(categoryState === 'selected' && categoryChange) handleConfirm("변경된 내용이 있습니다. 저장하시겠습니까?", ()=>{EditCategory.editCategory()});
            else dispatch({type : CATEGORY_STATE, data : { state : 'selected', value : e}});*/
        }
    };

    return(
        <div className={`site ${activeTarget === categoryId ? 'active' : ''}`}>
            <span className="site-img"><img src={categoryImg} alt="thumbnail"/></span>
            <span className="site-body"><span className="title">{categoryName}</span></span>
            <span className="btn-area">
                <button onClick={() => setCategoryState(categoryId)}  className="btn btn-outline-secondary mr-1">선택</button>
                <Link href={`/admin/edit?site=${site}&category=${categoryId}`} as={`/admin/edit?site=${site}&category=${categoryId}`}>
                    <button className="btn btn-primary">상세</button>
                </Link>
            </span>
        </div>
    )
};

const Unselected = () => {
    return(
        <div className="select">
            <p className="title">카테고리를 선택하세요</p>
            <p className="desc">카테고리를 선택하면 관련정보를<br/>
                이 곳에서 확인 및 수정 할 수 있습니다. </p>
        </div>
    )
};

export const EditCategory = props => {
    const dispatch = useDispatch();
    const { site,  categoryId, categoryImg, categoryName, categoryType, view, viewList, addCategory, handleAlert } = props;

    // 카테고리 명
    const [name, setName] = useState("");
    const onNameChange = e => {setName(e.target.value);};

    // 카테고리 타입
    const [cType, setType] = useState("");
    const onTypeChange = e => {setType(e.target.id);};

    // 카테고리 썸네일
    const [previewImg, setPreview] = useState("");
    const [img, setImg] = useState("");
    const inputImgEl = useRef(null);
    const onImgUpload= e => {
        const preview = URL.createObjectURL(e.target.files[0]);
        setPreview(preview);
        setImg(e.target.files[0]);
        inputImgEl.current.focus();
    };

    // SNB 노출 시 선택 클릭
    useEffect(() => {
        if(name !== '' || cType !=='' || img !== '') dispatch({type : CATEGORY_CHANGE, data : { change : true }});
        else dispatch({type : CATEGORY_CHANGE, data : { change : false }});
    }, [name, cType, img]);


    // 취소 클릭
    const prevAddCategory = () => {
        handleAlert("취소되었습니다.", ()=>{});
        dispatch({type : CATEGORY_STATE, data : { state : 'unselected'}});
    };

    // 저장 클릭
    const editCategory = async () => {
        const categoryKey = shortid.generate();
        if (addCategory && name === '') handleAlert("카테고리 명을 입력해주새요", () => {});
        else {
            if(img === '') categoryEditApi({categoryKey : categoryKey});
            else{
                const storage = await loadStorage();
                const storageRef = addCategory ? storage.ref(`site/${site}/category/${categoryKey}`) : storage.ref(`site/${site}/category/${categoryId}`);
                const uploadTask = storageRef.put(img);
                uploadTask.on(
                    "state_changed",
                    () => {},
                    err => storageErrHandler(err),
                    () => { uploadTask.snapshot.ref.getDownloadURL().then(async url => { categoryEditApi({url : url, categoryKey : categoryKey});});}
                );
            }
        }
    };
    // 카테고리 저장 API 연동
    const categoryEditApi = async props => {
        const { url, categoryKey } = props;
        const categoryInfo = {
            category : {
                type :
                    addCategory
                    ? cType === 'pc'
                        ? 1
                        : 2
                    : cType === ''
                        ? categoryType
                        : cType === 'pc'
                            ? 1
                            : 2,
                img : img === ''
                    ? (addCategory
                        ? ''
                        : {saveName: categoryId , path : categoryImg})
                    : (addCategory
                        ? {saveName : categoryKey, path : url}
                        : {saveName : categoryId , path : url}),
                name : addCategory
                    ? name
                    : name === ''
                        ? categoryName
                        : name,
                view : addCategory
                    ? {}
                    : view,
                viewList : addCategory
                    ? []
                    : viewList
            }
        };
        const res = await axios[addCategory ? 'post' : 'patch'](
            `${process.env.ASSET_PREFIX}/api/site/${site}/category/${addCategory ? categoryKey : categoryId }`, categoryInfo
        );
        if(res.status === 200) {
            handleAlert("저장되었습니다.", () => {window.location.reload();});
            dispatch({type : CATEGORY_STATE, data : { state : 'unselected'}});
        } else alert(`카테고리 ${addCategory ? '추가' : '수정'}실패` );
    };
    // Storage 등록 에러 핸들러
    const storageErrHandler = err => {
        switch(err.code) {
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
                            id={"name"}
                            name={"name"}
                            value={name}
                            onChange={onNameChange}
                            type="text"
                            className="form-control"
                            title="카테고리"
                            placeholder={categoryName}
                            maxLength='20'
                        />
                    </div>
                </form>
            </div>
            <div className="box">
                <div className="custom-control custom-radio custom-control-inline mr">
                    <input type="radio" id="pc" name="category" onChange={onTypeChange} className="custom-control-input" checked={cType === '' && categoryType === 1 || cType === 'pc'}/>
                    <label className="custom-control-label" htmlFor="pc">PC</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="mobile" name="category" onChange={onTypeChange} className="custom-control-input" checked={cType === '' && categoryType === 2 || cType === 'mobile' }/>
                    <label className="custom-control-label" htmlFor="mobile">MOBILE</label>
                </div>
            </div>
            <div className="box">
                <form className="form_intro">
                    <div className="form-group mb-2">
                        <span className="img">
                          <img src={ previewImg !== ''
                                      ? previewImg
                                      : addCategory
                                          ? "/img/common/default_thumbnail.png"
                                          : categoryImg }
                               alt="template"/>
                        </span>
                    </div>
                </form>
                <div className="btn-area mb change">
                    <button className="btn btn-secondary">
                        <label style={{ cursor: "pointer", marginBottom: "0" }} htmlFor={"imgUploader"}>썸네일 변경</label>
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
                <p className="desc">-가로 00px X 세로 00px (jpg,png,gif허용)<br/>-파일명 영문, 숫자 허용</p>
            </div>
            <div className="btn-area mb">
                <button onClick={prevAddCategory} className="btn btn-lg btn-outline-secondary">취소</button>
                <button onClick={editCategory} className="btn btn-lg btn-primary">저장</button>
            </div>
        </div>
    )
};

const Category = props => {
    const dispatch = useDispatch();
    const { site } = props;
    const { siteInfo, categoryState, categoryValue, addCategory, categoryChange} = useSelector(state => state.user);

    // Alert 모달
    const [openAlert, setOpenAlert] = useState(false);
    const closeAlert = () => setOpenAlert(!openAlert);
    const [alertMsg, setAlertMsg] = useState("");
    const [alertCb, setAlertCb] = useState(() => {});
    const handleAlert = (msg , func)=> {
        setAlertMsg(msg);
        setAlertCb(() => func);
    };
    useEffect(() => {
        if (alertMsg !== '') setOpenAlert(true);
    }, [alertCb]);

    // Confirm 모달
    const [openConfirm, setOpenConfirm] = useState(false);
    const closeConfirm = () => setOpenConfirm(!openConfirm);
    const [confirmMsg, setConfirmMsg] = useState("");
    const [confirmCb, setConfirmCb] = useState(() => {});
    const handleConfirm = (msg , func) => {
        setConfirmMsg(msg);
        setConfirmCb(() => func);
    };
    useEffect(() => {
        if (confirmMsg !== '') setOpenConfirm(true);
    }, [confirmCb]);

    // 삭제 클릭
    const onDeleteCategory = () => {
        if(siteInfo.categoryList.length === 1) handleAlert("최소 1개의 카테고리는 존재해야 합니다.", ()=>{});
        else handleConfirm("선택한 카테고리를 삭제하시겠습니까?", categoryDeleteApi);
    };

    // 삭제 API 연동
    const categoryDeleteApi = async() => {
        const res = await axios.delete(`${process.env.ASSET_PREFIX}/api/site/${siteInfo.url}/category/${categoryValue}`);
        if(res.status === 200) {
            dispatch({type : CATEGORY_STATE, data : { state : 'unselected'}});
            window.location.reload();
        } else alert('카테고리 삭제 실패');
    };

    // 새 카테고리 추가 클릭
    const onAddCategory = useCallback(() => {
        if(siteInfo.categoryList.length === 8) alert('카테고리 최대 8개');
        else dispatch({type : CATEGORY_STATE, data : { state : 'selected' , add : true}});
    }, []);

    useEffect(() => {
        dispatch({type : CATEGORY_STATE, data : { state : 'unselected'}});
        dispatch({type : CATEGORY_CHANGE, data : { change : false }});
    }, []);

    return (
        <div className="inner no-mw clearfix">
            <div className="section-container edit">
                <section>
                    <div className="title_area">
                        <Link href={`/admin/edit`} as={`/admin/edit`}>
                            <a><h2 className="title"><i className="far fa-chevron-left"></i>{siteInfo.name}</h2></a>
                        </Link>
                        <div className="btn-area mb">
                            <button  onClick={onDeleteCategory} className={`btn btn-outline-secondary ${categoryState === 'selected' && !addCategory ? '' : 'disabled'}`}>삭제</button>
                            <button onClick={onAddCategory} className="btn btn-primary">새 카테고리 추가</button>
                        </div>
                    </div>
                    <div className="contents">
                        <div className="inner">
                            {siteInfo.categoryList.map((item , index) => (
                                <CategoryList
                                    key={index}
                                    site={site}
                                    categoryId = {siteInfo.category[item].id}
                                    categoryImg = {siteInfo.category[item].img.path}
                                    categoryName = {siteInfo.category[item].name}
                                    categoryState={categoryState}
                                    categoryChange={categoryChange}
                                    activeTarget={categoryValue !== '' ? categoryValue : ''}
                                    handleConfirm={handleConfirm}
                                />
                            ))}
                            <a onClick={onAddCategory} className={`site add ${addCategory ? 'active' : ''}`} href="#">
                                <p className="plus"><i className="fal fa-plus"></i></p>
                                <p className="txt">새 카테고리 추가</p>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
            <div className="snb">
                {   categoryState !== 'selected'
                        ? <Unselected/>
                        : <EditCategory
                            site = {siteInfo.url}
                            categoryId = {categoryValue !== '' ? siteInfo.category[categoryValue].id : ''}
                            categoryImg={categoryValue !== '' ? siteInfo.category[categoryValue].img.path : ''}
                            categoryName = {categoryValue !== '' ? siteInfo.category[categoryValue].name : ''}
                            categoryType = {categoryValue !== '' ? siteInfo.category[categoryValue].type : ''}
                            view = {categoryValue !== '' ? siteInfo.category[categoryValue].view : ''}
                            viewList={categoryValue !== '' ? siteInfo.category[categoryValue].viewList : ''}
                            addCategory={addCategory}
                            handleAlert={handleAlert}/>
                }
            </div>
            {openAlert ? <Alert message={alertMsg} cb={alertCb} closeAlert={closeAlert} /> : ""}
            {openConfirm ? <Confirm message={confirmMsg} cb={confirmCb} closeConfirm={closeConfirm} /> : ""}
        </div>
    );
};

export default Category;
