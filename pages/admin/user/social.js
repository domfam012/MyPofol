import Head from 'next/head'
import React ,{useEffect}from "react";
import Layout from "../../../components/Layout";
import Header from "../../../components/header/admin/Edit"
import { useRouter } from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {LOG_IN, LOG_ING} from "../../../redux/reducers/user";
import {GoogleLogin} from 'react-google-login';
import shortid from 'shortid';
import moment from "moment";
import axios from "axios";

const Social =props => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.sessionStorage.id){dispatch({type :LOG_ING});}
    }, []);

    const responseGoogle = async(res) => {
        axios.get(`http://localhost:8080/api/user/google_${res.googleId}`)
            .then( userRef => {
                if (userRef.data.data === 404) {
                    console.log('회원가입 진행');
                    const user= {
                        img : {
                            saveName : shortid.generate(),
                            path : res.profileObj.imageUrl ? res.profileObj.imageUrl : ''
                        },
                        created : moment().format(),
                        name : res.profileObj.name,
                        email : res.profileObj.email,
                        phone : '',
                        socialName : 'google',
                        siteList : []
                    };
                    axios.post(
                        `http://localhost:8080/api/user/google_${res.googleId}`,
                        user
                    ).then( userRef => {
                        if (userRef.data.data === 404) {
                            console.log('회원가입 실패');
                        }else{
                            console.log('회원가입 완료');
                            axios.get(`http://localhost:8080/api/user/google_${res.googleId}`)
                                .then( userRef => {
                                    if (userRef.data.data === 404) {
                                        console.log('로그인 실패');
                                    }else{
                                        console.log('로그인 성공');
                                        const userInfo = {};
                                        userInfo[`google_${res.googleId}`] = userRef.data.data[0];
                                        dispatch({type :LOG_IN, data : Object.values(userInfo)[0]  });

                                        window.sessionStorage.setItem('id', res.profileObj.googleId);
                                        window.sessionStorage.setItem('name', res.profileObj.name);
                                        window.sessionStorage.setItem('email', res.profileObj.email);
                                        window.sessionStorage.setItem('path', res.profileObj.imageUrl ? res.profileObj.imageUrl : '');
                                        history.back();
                                    }
                                })
                        }
                    })
                } else {
                    console.log('로그인 성공');
                    const userInfo = {};
                    userInfo[`google_${res.googleId}`] = userRef.data.data[0];
                    dispatch({type :LOG_IN, data : Object.values(userInfo)[0]  });

                    window.sessionStorage.setItem('id', res.googleId);
                    window.sessionStorage.setItem('name', res.profileObj.name);
                    window.sessionStorage.setItem('email', res.profileObj.email);
                    window.sessionStorage.setItem('path', res.profileObj.imageUrl ? res.profileObj.imageUrl : '');
                    history.back();
                }
            });
    };



    const userDispatch= async (res) => {
        const useRef = await axios.get(`http://localhost:8080/api/user/google_${res.tokenId}`);
        if (useRef.status === 200) history.back();
        else {

        }

    };

    const responseFail= (err) => {
        console.log(err);
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
                <h2 className="title">로그인</h2>
                <div className="sub">
                    <p>처음오셨나요? 무료로 계정을 생성할 수 있습니다.</p>
                </div>
                <div className="btn-area social">
                    <button type="button" className="btn btn-xl btn-block btn-outline-secondary"><img
                        src="/img/common/kakao.png" alt="카카오"/></button>
                    <button type="button" className="btn btn-xl btn-block btn-outline-secondary"><img
                        src="/img/common/naver.png" alt="네이버"/></button>

                    <GoogleLogin
                        clientId={'715542130806-oe0pdnl5jtlov6suh1787c2fofk6ahos.apps.googleusercontent.com'}
                        buttonText="Google"
                        render={renderProps => (
                            <button  type="button" className="btn btn-xl btn-block btn-outline-secondary" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                <img src="/img/common/google.png" alt="구글"/></button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseFail}
                        isSignedIn={true}/>

                    <button type="button" className="btn btn-xl btn-block btn-outline-secondary"><img
                        src="/img/common/facebook.png" alt="페이스북"/></button>
                    <button type="button" className="btn btn-block btn-link">회원가입하기</button>
                </div>
            </section>

        </Layout>
    );
};


export default Social;
