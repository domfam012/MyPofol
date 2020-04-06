import Head from 'next/head'
import React ,{useEffect} from 'react'
import { useRouter } from 'next/router'
import {useDispatch} from "react-redux";
import axios from "axios/index";
import {LOG_ING, LOG_IN, PORTFOLIO_SITE_INFO} from "../redux/reducers/user";

const Layout = props => {
  const { header, footer } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  const isMain = router.pathname === '/'

    useEffect(() => {
        if (window.sessionStorage.id){
          getUserInfo();
          dispatch({type :LOG_ING});
        }
    }, []);

    const getUserInfo = async() => {
        const userInfo = {};

        const userRes = await axios.get(`http://localhost:8080/api/user/${window.sessionStorage.id}`);
        userInfo[userRes.googleId] = userRes.data.data[0];

        const siteRes = await axios.get(`http://localhost:8080/api/user/${window.sessionStorage.id}/site`);
        userInfo[userRes.googleId] = { ...userInfo[userRes.googleId], site: siteRes.data.site };

        dispatch({ type: LOG_IN, data: Object.values(userInfo)[0] });
    };

  return (
    <>
      <Head>
        {/* 공통 head 영역 */}
        <title>나만의 포트폴리오를 만들어보세요. - My Portfolio</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
        <meta name="Referrer" content="origin"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="robots" content="index,follow"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="/img/common/logo_og.png"/>
        <meta property="og:url" content="http://mypofol.co.kr/"/>

        {/* app 파비콘 설정 */}
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/img/common/apple-icon-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192" href="/img/common/android-icon-192x192.png"/>
        <meta name="msapplication-TileColor" content="#ffffff"/>
        <meta name="msapplication-TileImage" content="/img/common/ms-icon-144x144.png"/>
        <meta name="theme-color" content="#ffffff"/>
      </Head>
      {/* main page 분기 처리 */}
      <div className={`wrap ${isMain ? 'm-wrap' : ''}`}>
        {props.children}
        <footer>
          <div className={`wrap ${isMain ? 'footer m-footer' : 'footer'}`}>
            <div className="copyright">Copyright © Domfam Corp. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </>
  )
}
export default Layout;

