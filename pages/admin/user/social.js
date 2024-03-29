import Head from 'next/head'
import React, {useState } from "react";
import Layout from "../../../components/Layout";
import Header from "../../../components/header/admin/Edit"
import {useDispatch} from "react-redux";
import {LOG_IN} from "../../../redux/reducers/user";
import {GoogleLogin} from 'react-google-login';
import shortid from 'shortid';
import moment from "moment";
import axios from "axios";
import config from "../../../config";


const Social = () => {
    const dispatch = useDispatch();
    const [sign, setSign] = useState('');

    const responseGoogle = async(googleRes) => {
        axios.get(`${process.env.ASSET_PREFIX}/api/user/google_${googleRes.googleId}`)
            .then( userRes => {
                if (userRes.data.data === 404) {
                    console.log('회원가입 진행');
                    const user= {
                        img : {saveName : shortid.generate(), path : googleRes.profileObj.imageUrl ? googleRes.profileObj.imageUrl : ''},
                        created : moment().format(),
                        name : googleRes.profileObj.name,
                        email : googleRes.profileObj.email,
                        phone : '',
                        socialName : 'google',
                        siteList : []
                    };
                    axios.post(
                        `${process.env.ASSET_PREFIX}/api/user/google_${googleRes.googleId}`, user
                    ).then( userRes => {
                        if (userRes.data.data === 404) console.log('회원가입 실패');
                        else{
                            console.log('회원가입 완료');
                            axios.get(`${process.env.ASSET_PREFIX}/api/user/google_${googleRes.googleId}`)
                                .then( userRes => {
                                    if (userRes.data.data === 404) console.log('로그인 실패');
                                    else login(googleRes, userRes);
                                })
                        }
                    })
                } else {
                    login(googleRes, userRes);
                }
            });
    };

    const login = (googleRes, userRes) => {
        const userInfo = {};
        userInfo[`google_${googleRes.googleId}`] = userRes.data.data[0];
        dispatch({type :LOG_IN, data : Object.values(userInfo)[0] });
        localStorage.setItem("id", `google_${googleRes.googleId}`);
        history.back();
    };

    const responseFail= (err) => {
        console.log(err);
    };

    const onSignIn = e => {
        setSign(e.target.id);
    };

    return (
        <Layout>
            <Head>
                <title>마이포폴에 오신것을 환영합니다.</title>
                <meta name="apple-mobile-web-app-title" content="MyPofol" />
                <meta name="description" content="나의 포트폴리오"/>
                <meta name="keywords" content="portfolio, 포트폴리오, 회원가입, 로그인, pofol, mypofol, login, signin" />
                <meta property="og:title" content="포트폴리오" />
                <meta property="og:description" content="나의 포트폴리오" />
            </Head>
            <Header/>
            <section className="container-fluid init login">
                <h2 className="title">{sign === '' ? '로그인' : '회원가입' }</h2>
                <div className="sub">
                    <p>{sign === '' ? '처음오셨나요? 무료로 계정을 생성할 수 있습니다.' : ''}</p>
                </div>


                <div className="btn-area social">
                   {/* <button type="button" className="btn btn-xl btn-block btn-outline-secondary"><img
                        src="/img/common/kakao.png" alt="카카오"/></button>
                    <button type="button" className="btn btn-xl btn-block btn-outline-secondary"><img
                        src="/img/common/naver.png" alt="네이버"/></button>
                    <button type="button" className="btn btn-xl btn-block btn-outline-secondary"><img
                        src="/img/common/facebook.png" alt="페이스북"/></button>*/}
                    <GoogleLogin
                        clientId={config.option.GoogleClientId}
                        buttonText="Google"
                        render={renderProps => (
                            <button  type="button" className="btn btn-xl btn-block btn-outline-secondary" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <img src="/img/common/google.png" alt="구글"/></button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseFail}
                        isSignedIn={true}/>
                    {
                        sign  === '' ?  <button onClick={onSignIn} id="sign" type="button" className="btn btn-block btn-link">회원가입하기</button> :  ''
                    }
                </div>
            </section>

        </Layout>
    );
};


export default Social;
