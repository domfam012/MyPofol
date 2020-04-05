// Header
import React, { useCallback } from "react";
import { useDispatch } from 'react-redux';
import { CONTROL_AUTO_PLAY , CONTROL_POPUP } from '../../../redux/reducers/user';
import Link from "next/link";

const Header = props => {
    const dispatch = useDispatch();

    const onControlAutoPlay = useCallback(() => {
        dispatch({type : CONTROL_AUTO_PLAY});
    }, []);

    const  onControlPopup = useCallback(() => {
        dispatch({type : CONTROL_POPUP, data : true});
    }, []);

    return (
        <header className="bg-header">
            <div className="container-fluid no-mw pofol slider">
                <nav className="navbar navbar-expand">
                    <h1>
                        <Link href="/portfolio/[site]" as={`/portfolio/${props.site}`}>
                            <a className="navbar-brand" href="#">
                                <span><img src={props.siteImgPath} alt="" /></span>
                            </a>
                        </Link>
                    </h1>
                    <Link href="/portfolio/[site]" as={`/portfolio/${props.site}`}>
                        <a className="navbar-prev" href="#">
                            <span className="nav-prev-title">{props.siteName}</span>
                            <span className="navbar-prev-icon"></span>
                        </a>
                    </Link>
                    <div className="collapse navbar-collapse">
                        <div className="title">
                            <p className="t-img">{props.image}</p>
                        </div>
                        <div className="page-area slider">
                            <a className="item" href="#"><span className="page">{props.currentIdx}</span><span
                                className="pages">/{props.imageLength}</span></a>
                            <a onClick={onControlAutoPlay} className={props.autoPlay ? 'item active' : 'item'} href="#"><i className="fal fa-play"></i><i className="fal fa-pause"></i></a>
                            <a onClick={onControlPopup} className="item" href="#"><i className="fal fa-bars"></i></a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
