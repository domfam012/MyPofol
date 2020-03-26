import React, { useCallback } from "react";
import { useDispatch } from 'react-redux';
import { CONTROL_POPUP } from '../../../redux/reducers/user';

const ImageList = props => {
    return (
        <a className={`col ${props.currentIdx === props.listIdx ? 'active' : '' }`}  href="#">
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
        dispatch({type : CONTROL_POPUP});
    }, []);
    return (
        <>
            <header className="bg-header">
                <div className="container-fluid no-mw pofol">
                    <nav className="navbar navbar-expand">
                        <h1>
                            <a className="navbar-brand" href="#">
                                <span><img src={props.site.logo} alt="" style={{width : "160px" , height : "45px"}}/></span>
                            </a>
                        </h1>
                        <a className="navbar-prev" href="#">
                            <span className="nav-prev-title">{props.site.name}</span>
                            <span className="navbar-prev-icon"></span>
                        </a>
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
                    <div className="go_back">
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
