import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import {CATEGORY_STATE} from "../../../../redux/reducers/user";
import { loadStorage } from "../../../../public/js/db";
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

const Selected = props => {
    const dispatch = useDispatch();
    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");

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

    //  카테고리 수정 저장 버튼 클릭 시 카테고리 수정
    const updateCategory = async () => {
        const storage = await loadStorage();
        const storageRef = storage.ref(`site/${props.site}/category/${props.id}`);
        const uploadTask = storageRef.put(img);

        uploadTask.on(
            "state_changed",
            () => {},
            err => storageErrHandler(err),
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(async url => {
                    const categoryInfo = {
                        category : {
                            type : type === 'pc' ? 1 : 2,
                            img : { saveName : props.id, path : url},
                            name : name,
                            view : props.view,
                            viewList : props.viewList
                        }
                    };
                    const res = await axios.patch(
                        `http://localhost:8080/api/site/${props.site}/category/${props.id}`,
                        categoryInfo
                    );
                    if(res.status === 200){
                        dispatch({type : CATEGORY_STATE, data : { state : 'unselected'}});
                        history.back();
                    }else alert('카테고리 추가 실패' );
                });
            }
        );
    };

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
                    <input type="radio" id="pc" name="category" onChange={onTypeChange} className="custom-control-input" defaultChecked={props.type === 1 }/>
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
                  <img src={props.imgPath} alt="template" />
                </span>
                    </div>
                </form>
                <div className="btn-area mb change">
                    <input
                        type="file"
                        id="imgUploader"
                        name={"img"}
                        className="form-control-file"
                        onChange={onImgUpload}>
                    </input>
                </div>
                <p className="desc">-가로 00px X 세로 00px (jpg,png,gif허용)<br/>-파일명 영문, 숫자 허용</p>
            </div>
            <div className="btn-area mb">
                <button onClick={prevAddCategory} className="btn btn-lg btn-outline-secondary">취소</button>
                <button onClick={updateCategory} className="btn btn-lg btn-primary">저장</button>
            </div>
        </div>
    )
};

const AddCategory = props => {
    const dispatch = useDispatch();
    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");

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

    // 새 카테고리 추가 취소 버튼 선택 시 CATEGORY_STATE 변경
    const prevAddCategory = () => {
        dispatch({type : CATEGORY_STATE, data : { state : 'unselected'}});
    };

    //  새 카테고리 추가 저장 버튼 클릭 시 카테고리 등록
    const registerCategory = async () => {
        const storage = await loadStorage();
        const categoryKey = shortid.generate();
        const storageRef = storage.ref(`site/${props.site}/category/${categoryKey}`);
        const uploadTask = storageRef.put(img);

        uploadTask.on(
            "state_changed",
            () => {},
            err => storageErrHandler(err),
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(async url => {
                    const categoryInfo = {
                        type : type === 'pc' ? 1 : 2,
                        img : { saveName : categoryKey, path : url},
                        name : name,
                    };
                    const res = await axios.post(
                        `http://localhost:8080/api/site/${props.site}/category/${categoryKey}`,
                        categoryInfo
                    );
                    if(res.status === 200){
                        dispatch({type : CATEGORY_STATE, data : { state : 'unselected'}});
                        history.back();
                    }else alert('카테고리 추가 실패' );
                });
            }
        );
    };

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
                            placeholder=""
                        />
                    </div>
                </form>
            </div>
            <div className="box">
                <div className="custom-control custom-radio custom-control-inline mr">
                    <input type="radio" id="pc" name="category"  onChange={onTypeChange} className="custom-control-input" />
                    <label className="custom-control-label" htmlFor="pc">PC</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="mobile" name="category"  onChange={onTypeChange} className="custom-control-input" />
                    <label className="custom-control-label" htmlFor="mobile">MOBILE</label>
                </div>
            </div>
            <div className="box">
                <form className="form_intro">
                    <div className="form-group mb-2">
                <span className="img">
                  <img src="/img/common/default_thumbnail.png" alt="template" />
                </span>
                    </div>
                </form>
                <div className="btn-area mb change">
                    <input
                        type="file"
                        id="imgUploader"
                        name={"img"}
                        className="form-control-file"
                        onChange={onImgUpload}>
                    </input>
                </div>
                <p className="desc">-가로 00px X 세로 00px (jpg,png,gif허용)<br/>-파일명 영문, 숫자 허용</p>
            </div>
            <div className="btn-area mb">
                <button onClick={prevAddCategory} className="btn btn-lg btn-outline-secondary">취소</button>
                <button onClick={registerCategory} className="btn btn-lg btn-primary">저장</button>
            </div>
        </div>
    )
};

const Category = props => {
    const dispatch = useDispatch();
    const { siteInfo, categoryState, categoryValue, addCategory} = useSelector(state => state.user);

    // 새 카테고리 추가 클릭 시 CATEGORY_STATE 변경
    const onAddCategory = useCallback(() => {
        dispatch({type : CATEGORY_STATE, data : { state : 'selected' , add : true}})
    }, []);

    // 삭제 버튼 클릭 시 카테고리 삭제
    const onDeleteCategory =  async () => {
        if (categoryValue === '' )  alert ("삭제 할 카테고리를 선택해주세요");
        else{
            const res = await axios.delete(
                `http://localhost:8080/api/site/${siteInfo.url}/category/${categoryValue}`
            );
            if(res.status === 200){
                dispatch({type : CATEGORY_STATE, data : { state : 'unselected'}});
                history.back();
            }else{
                alert('카테고리 삭제 실패');
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
                            <a onClick={onAddCategory} className={addCategory ? "site add active" : "site add"} href="#">
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
                            addCategory ?
                                <AddCategory
                                site = {siteInfo.url}/> :
                                <Selected
                                title = {categoryValue !== '' ? siteInfo.category[categoryValue].name : ''}
                                type = {siteInfo.category[categoryValue].type}
                                imgPath={siteInfo.category[categoryValue].img.path}
                                view = {siteInfo.category[categoryValue].view}
                                id = {siteInfo.category[categoryValue].id}
                                viewList={siteInfo.category[categoryValue].viewList}
                                site = {siteInfo.url}/>
                }
            </div>
        </div>
    );
};

export default Category;
