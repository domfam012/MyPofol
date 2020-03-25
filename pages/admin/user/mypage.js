import Head from 'next/head'
import React from "react";
import Layout from "../../../components/Layout";
import Header from "../../../components/header/admin/Edit"

const Mypage = props => {
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
            <div className="container-fluid">
                <section className="mypage">
                    <div className="title_area">
                        <h2 className="title">마이페이지</h2>
                    </div>
                    <div className="list">
                        <ul>
                            <li>
                                <span className="title">프로필 이미지</span>
                                <span className="info profile _profile"><i className="fal fa-user"></i></span>
                            </li>
                            <li>
                                <span className="title">이름/닉네임</span>
                                <span className="info top _name">홍길동</span>
                            </li>
                            <li>
                                <span className="title">이메일 주소</span>
                                <span className="info top _address">abc@mypofol.com</span>
                            </li>
                            <li>
                                <span className="title">연락처</span>
                                <span className="info top _address">010-1234-5678</span>
                            </li>
                            <li>
                                <span className="title">SNS 연결</span>
                                <span className="info top _address"><img src="/img/common/facebook.png"
                                                                         alt="연동 이미지"/>
                                <span className="txt">홍길동님 계정과 연결되었습니다.</span>
                            </span>
                            </li>
                        </ul>
                    </div>
                    <div className="clearfix">
                        <p className="delete">더 이상 이용하지 않는다면 <a href="#" className="btn-link font-weight-bold"
                                                                data-toggle="modal" data-target="#delete">계정을 삭제</a>해
                            주세요.</p>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Mypage;
