import Head from 'next/head'
import React, {useState } from "react";
import Layout from "../../../components/Layout";
import Header from "../../../components/header/admin/Edit"
import CheckConfirm from '../../../components/popup/CheckConfirm';
import Alert from '../../../components/popup/alert';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios/index";
import {useRouter} from "next/router";
import {LOG_OUT} from "../../../redux/reducers/user";

const Mypage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.user);
    const [openCheckConfirm, setOpenCheckConfirm ] = useState(false);
    const [openAlert, setOpenAlert ] = useState(false);

    const closeCheckConfirm = props => {
        if(props !== undefined) if(props.state === undefined || props.state) setOpenCheckConfirm(!openCheckConfirm);
    };
    const checkConfirmCallback = () => {
        axios.delete(`http://localhost:8080/api/user/${localStorage.id}`)
            .then(res => {
                if(res.status === 200) {
                    console.log('사용자 삭제 신청 성공');
                    closeCheckConfirm({state : true});
                    closeAlert(false);
                } else alert("사용자 삭제 신청 실패");
            })
    };
    const closeAlert = props => {
        if(props) alertCallback();
        else setOpenAlert(!openAlert);
    };
    const alertCallback = () => {
        dispatch({type :LOG_OUT});
        router.push(`/`);
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(() =>{console.log('로그아웃')});
        localStorage.clear();
    };

    return (
        <>
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
                {
                    Object.keys(userInfo).length !== 0 ?
                        <div className="container-fluid">
                            <section className="mypage">
                                <div className="title_area">
                                    <h2 className="title">마이페이지</h2>
                                </div>
                                <div className="list">
                                    <ul>
                                        <li>
                                            <span className="title">프로필 이미지</span>
                                            <span className="info profile _profile">{userInfo.img.path ? <img src={userInfo.img.path } alt="프로필이미지"/>: <i className="fal fa-user"></i>}</span>
                                        </li>
                                        <li>
                                            <span className="title">이름/닉네임</span>
                                            <span className="info top _name">{userInfo.name}</span>
                                        </li>
                                        <li>
                                            <span className="title">이메일 주소</span>
                                            <span className="info top _address">{userInfo.email}</span>
                                        </li>
                                        { userInfo.phone ?
                                            <li>
                                                <span className="title">연락처</span>
                                                <span className="info top _address">{}</span>
                                            </li> : ''
                                        }
                                        <li>
                                            <span className="title">SNS 연결</span>
                                            <span className="info top _address"><img src="/img/common/google.png" alt="연동 이미지"/><span className="txt">{userInfo.name}님 계정과 연결되었습니다.</span></span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="clearfix">
                                    <p className="delete">더 이상 이용하지 않는다면 <a onClick={closeCheckConfirm} href="#" className="btn-link font-weight-bold" data-toggle="modal" data-target="#delete">계정을 삭제</a>해 주세요.</p>
                                </div>
                                {
                                    openCheckConfirm
                                        ? <CheckConfirm closeCheckConfirm={closeCheckConfirm} cb={checkConfirmCallback}/> : ''
                                }
                                {
                                    openAlert
                                        ?  <Alert message={"삭제되었습니다."} closeAlert={closeAlert} cb={alertCallback}/> : ''
                                }
                            </section>
                        </div> : ''
                }

            </Layout>

        </>

    );
};

export default Mypage;
