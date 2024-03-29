import React, { useCallback } from "react";
import { useDispatch } from 'react-redux';
import {PORTFOLIO_IDX, CONTROL_POPUP } from '../../../redux/reducers/user';
import Link from "next/link";

const ImageList = props => {
    const dispatch = useDispatch();
    const setState = e => {
        dispatch({type : PORTFOLIO_IDX, data : e});
        dispatch({type : CONTROL_POPUP, data : false})
    };
    return (
        <a onClick={() => setState(props.listIdx)} className={`col ${props.currentIdx === props.listIdx ? 'active' : '' }`}  href="#">
            <div className="img">
                <img src={props.src} alt=""/>
            </div>
            <p className="title">{props.name}</p>
        </a>
    )
};

const ImageNavigator = props => {
    const dispatch = useDispatch();
    const onControlPopup = useCallback(() => {
        dispatch({type : CONTROL_POPUP, data : false});
    }, []);
    const goFirstImage = useCallback(() => {
        dispatch({type : PORTFOLIO_IDX, data : 0});
        dispatch({type : CONTROL_POPUP, data : false});
    }, []);
    return (
        <>
            <header className="bg-header">
                <div className="container-fluid no-mw pofol">
                    <nav className="navbar navbar-expand">
                        <h1>
                            <Link href={`/portfolio/${props.site}`} as={`/portfolio/${props.site}`}>
                                <a className="navbar-brand" href="#">
                                    <span><img src={props.siteImgPath} alt="" /></span>
                                </a>
                            </Link>
                        </h1>
                        <Link href={`/portfolio/${props.site}`} as={`/portfolio/${props.site}`}>
                            <a className="navbar-prev" href="#">
                                <span className="nav-prev-title">{props.siteName}</span>
                                <span className="navbar-prev-icon"></span>
                            </a>
                        </Link>
                        <div className="collapse navbar-collapse">
                            <div className="title">
                                <p>{props.image[props.imageList[props.currentIdx]].originName}</p>
                            </div>
                            <div onClick={onControlPopup} className="page-area slider">
                                <a className="item" href="#"><i className="fal fa-times"></i></a>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
            <section className="p_section list">
                <h2 className="sr-only">project</h2>
                <div className="container-fluid">
                    <div onClick={goFirstImage} className="go_back">
                        <a href="#" className="prev"><i className="far fa-chevron-double-left"></i>맨처음으로 가기</a>
                    </div>
                    <div className="title_area">
                        <h2 className="title">&nbsp;</h2>
                    </div>
                    <div className="row row-cols-4 mb-5">
                        {props.imageList.map((item , index) => (
                            <ImageList
                                key={index}
                                src={props.image[item].img.path}
                                name={props.image[item].originName}
                                currentIdx={props.currentIdx}
                                listIdx={index}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ImageNavigator;
