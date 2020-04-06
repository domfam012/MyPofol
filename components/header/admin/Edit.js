// Header
import React , { useCallback } from "react";
import { useRouter } from "next/router";
import {useDispatch, useSelector} from 'react-redux';
import Link from 'next/link'
import {LOG_OUT} from "../../../redux/reducers/user";
import { GoogleLogout } from 'react-google-login';

const Header = props => {
    const{isLoggedIn , userInfo} = useSelector(state => state.user);
    const router = useRouter();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch({type :LOG_OUT});

        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(() =>{console.log('로그아웃')});

        localStorage.clear();
        router.push(`/`);
    };

    return (
        <header className="bg-header">
            <div className="container-fluid no-mw">
                <nav className="navbar navbar-expand">
                    <h1>
                        <Link href={'/'}>
                            <a className="navbar-brand">
                                <img src="/img/common/logo.png" alt="MyPofol"/>
                            </a>
                        </Link>
                    </h1>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        <div className="login_area">
                            {
                                isLoggedIn
                                    ? <Link href={'/admin/user/mypage'}>
                                        <a className="login" href="#"><span className="_name">{userInfo.name}</span>님</a>
                                    </Link>
                                    : <Link href={'/admin/user/social'}>
                                        <a className="login" href="#"><span className="_name">로그인이 필요합니다. <img src="/img/common/login.png" alt=""/></span></a>
                                    </Link>
                            }
                            {
                                isLoggedIn
                                    ?<GoogleLogout
                                        clientId="715542130806-oe0pdnl5jtlov6suh1787c2fofk6ahos.apps.googleusercontent.com"
                                        buttonText="Logout"
                                        onLogoutSuccess={logout}
                                        render={renderProps => (
                                            <a className="logout" href="#" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="far fa-sign-out"></i></a>
                                        )}
                                    /> : ''
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )

}

export default Header
