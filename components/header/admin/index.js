import Link from 'next/link'
import { useRouter } from "next/router";
import {LOG_OUT} from "../../../redux/reducers/user";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import { GoogleLogout } from 'react-google-login';
import config from "../../../config";

// Header
const Header = () => {
    const {isLoggedIn, userInfo } = useSelector(state => state.user);
    const router = useRouter();
    const dispatch = useDispatch();

    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() =>{
        console.log('로그아웃');
        localStorage.clear();
        dispatch({type :LOG_OUT});
        router.push(`/`);
    });

  return (
    <header className="bg-header">
      <div className="container">
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
                              <a className="login" href="#"><span className="text">{userInfo.name}&nbsp;님</span></a>
                          </Link>
                          : <Link href={'/admin/user/social'}>
                              <a className="login" href="#"><span className="text">로그인이 필요합니다.</span><img src="/img/common/login.png" alt=""/></a>
                          </Link>
                  }
                  {
                      isLoggedIn
                          ? <GoogleLogout
                              clientId={config.option.GoogleClientId}
                              buttonText="Logout"
                              onLogoutSuccess={logout}
                              render={renderProps => (
                                  <a className="logout" href="#" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className="far fa-sign-out"></i></a>
                              )}
                          />  : ''
                  }
              </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
