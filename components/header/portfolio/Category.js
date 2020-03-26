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
                                <span><img src={props.siteInfo.logo} alt="" style={{width : "160px" , height : "45px"}}/></span>
                            </a>
                        </Link>
                    </h1>
                    <Link href="/portfolio/[site]" as={`/portfolio/${props.site}`}>
                        <a className="navbar-prev" href="#">
                            <span className="nav-prev-title">{props.siteInfo.name}</span>
                            <span className="navbar-prev-icon"></span>
                        </a>
                    </Link>
                    <div className="collapse navbar-collapse">
                        <div className="title">
                            <a className="carousel-control-prev" href="#carouselProject" role="button"
                               data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselProject" role="button"
                               data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
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
