import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import {CATEGORY_STATE} from "../../../../redux/reducers/user";
import { loadStorage } from "../../../../public/js/db";
import Alert from '../../../popup/alert';
import Confirm from '../../../popup/Confirm';
import Link from 'next/link'
import axios from "axios";
import shortid from 'shortid';

const CategoryList = props => {
    const dispatch = useDispatch();

    // 카테고리 리스트 클릭 시 CATEGORY_STATE 변경
    const setCategoryState = e => {
        dispatch({type : CATEGORY_STATE, data : { state : 'selected', value : e }});
    };

    return(
        <div className={props.activeTarget === props.id ? 'site active' : 'site'}>
            <span className="site-img"><img src={props.imgPath} alt="thumbnail"/></span>
            <span className="site-body"><span className="title">{props.title}</span></span>
            <span className="btn-area">
                <button onClick={() => setCategoryState(props.id)}  className="btn btn-outline-secondary mr-1">선택</button>
                <Link href={`/admin/edit?site=${props.site}&category=${props.id}`} as={`/admin/edit?site=${props.site}&category=${props.id}`}>
                    <button className="btn btn-primary">상세</button>
                </Link>
            </span>
        </div>
    )
};

const None= () => {
    return(
        <div className="select">
            <p className="title">카테고리를 추가하세요</p>
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

const EditCategory = props => {
    const dispatch = useDispatch();
    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [openAlert, setOpenAlert ] = useState(false);
    const [isSave, checkIsSave ] = useState(true);

    // 카테고리 수정 및 추가 저장 완료 Alert 팝업 노출
    const closeAlert = props => {
        if(props === 'save'){
            dispatch({type : CATEGORY_STATE, data : { state : 'unselected'}});
            window.location.reload();
        }
        setOpenAlert(!openAlert);
    };
    const alertCallback = () => {
        if(props.addCategory && name === '') closeAlert();
        else closeAlert('save');

    };
    // 이미지 변경
    const onImgUpload = e => {
        setImg(e.target.files[0]);
    };
    // 카테고리 명 입력
    const onNameChange = e => {
        setName(e.target.value);
    };
    // 카테고리 타입 선택
    const onTypeChange = e => {
        setType(e.target.id);
    };
    // 카테고리 수정 취소 버튼 선택 시 CATEGORY_STATE 변경
    const prevAddCategory = () => {
        dispatch({type : CATEGORY_STATE, data : { state : 'unselected'}});
    };
    // 카테고리 수정 저장 버튼 클릭 시 카테고리 수정 또는 저장- Storage 등록
    const editCategory = async () => {
        const categoryKey = shortid.generate();
        if (props.addCategory && name === '') {
            checkIsSave(false);
            closeAlert();
        } else {
            if(img === '') categoryEditApi({categoryKey : categoryKey});
            else{
                const storage = await loadStorage();
                const storageRef = props.addCategory ? storage.ref(`site/${props.site}/category/${categoryKey}`) : storage.ref(`site/${props.site}/category/${props.id}`);
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
    // 카테고리 수정 저장 버튼 클릭 시 카테고리 수정 또는 저장 - API 연동
    const categoryEditApi = async subProps => {
        const categoryInfo = {
            category : {
                type :props.addCategory ? type === 'pc' ? 1 : 2 : type === '' ? props.type : type === 'pc' ? 1 : 2,
                img : img === '' ? (props.addCategory ? '' : {saveName: props.id , path : props.imgPath}) : (props.addCategory ? {saveName : subProps.categoryKey, path : subProps.url} :{saveName : props.id , path : subProps.url}),
                name : props.addCategory ? name : name === '' ? props.title : name,
                view : props.addCategory ? {} : props.view,
                viewList : props.addCategory ? [] : props.viewList
            }
        };
        const res = await axios[props.addCategory ? 'post' : 'patch'](
            `http://localhost:8080/api/site/${props.site}/category/${props.addCategory ? subProps.categoryKey : props.id }`,
            categoryInfo
        );
        if(res.status === 200) closeAlert();
        else alert(`카테고리 ${ props.addCategory ? '추가' : '수정'}실패` );
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
                            placeholder={props.title}
                        />
                    </div>
                </form>
            </div>
            <div className="box">
                <div className="custom-control custom-radio custom-control-inline mr">
                    <input type="radio" id="pc" name="category" onChange={onTypeChange} className="custom-control-input"  defaultChecked={props.type === 1 }/>

                    <label className="custom-control-label" htmlFor="pc">PC</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="mobile" name="category" onChange={onTypeChange}  className="custom-control-input" defaultChecked={props.type === 2 }/>
                    <label className="custom-control-label" htmlFor="mobile">MOBILE</label>
                </div>
            </div>
            <div className="box">
                <form className="form_intro">
                    <div className="form-group mb-2">
                        <span className="img">
                          <img src={props.addCategory ? '/img/common/default_thumbnail.png' : props.imgPath} alt="template" />
                        </span>
                    </div>
                </form>
                <div className="btn-area mb change">
                    <input
                        type="file"
                        id="imgUploader"
                        name={"img"}
                        className="form-control-file"
                        onChange={onImgUpload}
                    />
                </div>
                <p className="desc">-가로 00px X 세로 00px (jpg,png,gif허용)<br/>-파일명 영문, 숫자 허용</p>
            </div>
            <div className="btn-area mb">
                <button onClick={prevAddCategory} className="btn btn-lg btn-outline-secondary">취소</button>
                <button onClick={editCategory} className="btn btn-lg btn-primary">저장</button>
            </div>
            { openAlert ?  <Alert message={isSave ? "저장되었습니다." : "카테고리 명을 입력해주세요."} closeAlert={closeAlert} cb={alertCallback}/> : '' }
        </div>
    )
};

const Category = props => {
    const dispatch = useDispatch();
    const { siteInfo, categoryState, categoryValue, addCategory} = useSelector(state => state.user);
    const [openConfirm, setOpenConfirm ] = useState(false);
    const [openAlert, setOpenAlert ] = useState(false);

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
            dispatch({type : CATEGORY_STATE, data : { state : 'unselected'}});
            window.location.reload();
        }
        setOpenConfirm(!openConfirm);
    };
    const confirmCallback = () => {
        closeConfirm('delete');
    };
    // 새 카테고리 추가 클릭 시 CATEGORY_STATE 변경
    const onAddCategory = useCallback(() => {
        if(siteInfo.categoryList.length === 8) alert('카테고리 최대 8개');
        else dispatch({type : CATEGORY_STATE, data : { state : 'selected' , add : true}});
    }, []);

    // 삭제 버튼 클릭 시 카테고리 삭제
    const onDeleteCategory =  async () => {
        if(siteInfo.categoryList.length === 1) closeAlert();
        else {
            if (categoryValue === '' )  alert ("삭제 할 카테고리를 선택해주세요");
            else{
                const res = await axios.delete(
                    `http://localhost:8080/api/site/${siteInfo.url}/category/${categoryValue}`
                );
                if(res.status === 200) closeConfirm();
                else alert('카테고리 삭제 실패');
            }
        }
    };
    // 카테고리 개수에 따른 CATEGORY_STATE 변경
    useEffect(() => {
        siteInfo.categoryList.length === 0 ? dispatch({type : CATEGORY_STATE, data : { state : 'none'}}) : dispatch({type : CATEGORY_STATE, data : { state : 'unselected'} });
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
                            <button  onClick={onDeleteCategory} className="btn btn-outline-secondary">삭제</button>
                            <button onClick={onAddCategory} className="btn btn-primary">새 카테고리 추가</button>
                        </div>
                    </div>
                    <div className="contents">
                        <div className="inner">
                            {siteInfo.categoryList.map((item , index) => (
                                <CategoryList
                                    key={index}
                                    imgPath={siteInfo.category[item].img.path}
                                    title={siteInfo.category[item].name}
                                    id={siteInfo.category[item].id}
                                    activeTarget={categoryValue !== '' ? categoryValue : ''}
                                    site={props.site}
                                />
                            ))}
                            <a onClick={onAddCategory} className={ addCategory ? "site add active" : "site add"} href="#">
                                <p className="plus"><i className="fal fa-plus"></i></p>
                                <p className="txt">새 카테고리 추가</p>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
            <div className="snb">
                { categoryState === 'none'
                        ? <None/> :
                        categoryState !== 'selected'
                            ? <Unselected/> :
                                <EditCategory
                                site = {siteInfo.url}
                                addCategory={addCategory}
                                title = {categoryValue !== '' ? siteInfo.category[categoryValue].name : ''}
                                type = {categoryValue !== '' ? siteInfo.category[categoryValue].type : ''}
                                imgPath={categoryValue !== '' ? siteInfo.category[categoryValue].img.path : ''}
                                id = {categoryValue !== '' ? siteInfo.category[categoryValue].id : ''}
                                view = {categoryValue !== '' ? siteInfo.category[categoryValue].view : ''}
                                viewList={categoryValue !== '' ? siteInfo.category[categoryValue].viewList : ''}
                                />
                }
            </div>
            { openConfirm ?  <Confirm message={"선택한 카테고리를 삭제하시겠습니까?"}  closeConfirm={closeConfirm} cb={confirmCallback}/> : '' }
            { openAlert ?  <Alert message={"최소 1개의 카테고리는 존재해야 합니다."} closeAlert={closeAlert} cb={alertCallback}/> : '' }
        </div>
    );
};

export default Category;
