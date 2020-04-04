import {CATEGORY_STATE} from "../../../../redux/reducers/user";
import {useDispatch, useSelector} from "react-redux";
import React ,{useEffect}from "react";
import Link from 'next/link'

const CategoryList = props => {
    const dispatch = useDispatch();
    const setState = e => {
        console.log(e)
        dispatch({type : CATEGORY_STATE, data : { state : 'selected', value : e }});
    };

     console.log(props)

    return(
        <div className={props.activeTarget === props.title ? 'site active' : 'site'}>
            <span className="site-img"><img src={props.imgPath} alt="thumbnail"/></span>
            <span className="site-body"><span className="title">{props.title}</span></span>
            <span className="btn-area">
                <button onClick={(e) => setState(props.id)}  className="btn btn-outline-secondary mr-1">선택</button>
                <Link href={`/admin/edit?site=${props.site}&category=${props.id}`} as={`/admin/edit?site=${props.site}&category=${props.id}`}>
                    <button className="btn btn-primary">상세</button>
                </Link>
            </span>
        </div>
    )
};

const None= props => {
    return(
        <div className="select">
            <p className="title">카테고리를 추가하세요</p>
        </div>
    )
};

const Unselected = props => {
    return(
        <div className="select">
            <p className="title">카테고리를 선택하세요</p>
            <p className="desc">카테고리를 선택하면 관련정보를<br/>
                이 곳에서 확인 및 수정 할 수 있습니다. </p>
        </div>
    )
};

const Selected = props => {
    return(
        <div className="contents">
            <div className="box">
                <form className="form_site">
                    <div className="form-group active">
                        <input type="text" className="form-control" title="사이트명" placeholder={props.title}/>
                    </div>
                </form>
            </div>
            <div className="box">
                <div className="custom-control custom-radio custom-control-inline mr">
                    <input type="radio" id="pc" name="category" className="custom-control-input" checked={props.type === '1'}/>
                    <label className="custom-control-label" htmlFor="pc">PC</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="mobile" name="category" className="custom-control-input" checked={props.type === '2'}/>
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
                    <button className="btn btn-secondary">썸네일 변경</button>
                </div>
                <p className="desc">-가로 00px X 세로 00px (jpg,png,gif허용)<br/>-파일명 영문, 숫자 허용</p>
            </div>
            <div className="btn-area mb">
                <button className="btn btn-lg btn-outline-secondary">취소</button>
                <button className="btn btn-lg btn-primary">저장</button>
            </div>
        </div>
    )
};

const Category = props => {
    const dispatch = useDispatch();

    const { siteInfo, categoryState  , categoryValue} = useSelector(state => state.user);

    useEffect(() => {
        siteInfo.categoryList.length === 0 ? dispatch({type : CATEGORY_STATE, data : { state : 'none'}}) : dispatch({type : CATEGORY_STATE, data : { state : 'unselected'} });
    }, []);

    return (
        <div className="inner no-mw clearfix">
            <div className="section-container edit">
                <section>
                    <div className="title_area">
                        <h2 className="title"><i className="far fa-chevron-left"></i>{siteInfo.name}</h2>
                        <div className="btn-area mb">
                            <button className="btn btn-outline-secondary">삭제</button>
                            <button className="btn btn-primary">새 카테고리 추가</button>
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
                            <a className="site add" href="#">
                                <p className="plus"><i className="fal fa-plus"></i></p>
                                <p className="txt">새 카테고리 추가</p>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
            <div className="snb">
                {
                    categoryState === 'none'
                        ? <None/> :
                        categoryState === 'selected'
                            ? <Selected
                                title = {categoryValue !== '' ? siteInfo.category[categoryValue].name : ''}
                                type = {siteInfo.category[categoryValue].type}
                                imgPath={siteInfo.category[categoryValue].img.path}
                            />:
                            <Unselected/>
                }
            </div>
        </div>
    );
};


export default Category;
