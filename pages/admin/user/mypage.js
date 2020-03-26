import React from "react";
import Layout from "../../../components/Layout";
import Header from "../../../components/header/admin/Edit"
import {useSelector} from "react-redux";
import Link from 'next/link'

const Mypage = props => {
    const { userInfo } = useSelector(state => state.user);
    return (
        <Layout>
            <Header/>
            {Object.keys(userInfo).length !== 0 ? <div className="container-fluid">
                <section className="mypage">
                    <div className="title_area">
                        <h2 className="title">마이페이지</h2>
                    </div>
                    <div className="list">
                        <ul>
                            <li>
                                <span className="title">프로필 이미지</span>
                                <span className="info profile _profile">
                                    {userInfo.img.path !== '' ? <i className="fal fa-user"></i>: <i className="fal fa-user"></i>}
                                </span>
                            </li>
                            <li>
                                <span className="title">이름/닉네임</span>
                                <span className="info top _name">{userInfo.name}</span>
                            </li>
                            <li>
                                <span className="title">이메일 주소</span>
                                <span className="info top _address">{userInfo.email}</span>
                            </li>
                            <li>
                                <span className="title">연락처</span>
                                <span className="info top _address">{userInfo.phone}</span>
                            </li>
                            <li>
                                <span className="title">SNS 연결</span>
                                <span className="info top _address"><img src="/img/common/google.png" alt="연동 이미지"/>
                                <span className="txt">{userInfo.name}님 계정과 연결되었습니다.</span>
                            </span>
                            </li>
                        </ul>
                    </div>
                    <div className="clearfix">
                        <p className="delete">더 이상 이용하지 않는다면 <a href="#" className="btn-link font-weight-bold" data-toggle="modal" data-target="#delete">계정을 삭제</a>해 주세요.</p>
                    </div>
                </section>
            </div> : ''}
        </Layout>
    );
};

export default Mypage;
