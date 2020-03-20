import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/header/admin/Edit"

const Edit = props => {
    return (
        <Layout>
            <Header/>
            <div className="inner clearfix">
                <div className="section-container">
                    <section>
                        <div className="title_area">
                            <h2 className="title">웹사이트 관리</h2>
                            <div className="btn-area mb">
                                <button className="btn btn-outline-secondary">삭제</button>
                                <button className="btn btn-primary">새 웹사이트 추가</button>
                            </div>
                        </div>
                        <div className="contents">
                            <div className="inner">
                                <div className="site" href="#">
                                    <span className="site-img"><img src="/img/temp/potens.png"
                                                                    alt="potens"/></span>
                                    <p className="site-body">
                                        <span className="title">POTENS</span>
                                        <a className="address" href="#">http://www.mypofol.com/domfam</a>
                                    </p>
                                    <span className="btn-area">
                                    <button className="btn btn-outline-secondary mr-1">선택</button>
                                    <button className="btn btn-primary">상세</button>
                                </span>
                                </div>
                                <a className="site" href="#">
                                    <p className="plus"><i className="fal fa-plus"></i></p>
                                    <p className="txt">새 웹사이트 추가</p>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="snb">
                    <div className="select">
                        <p className="title">사이트를 선택하세요</p>
                        <p className="desc">사이트를 선택하면 관련정보를<br/>
                            이 곳에서 확인 및 수정 할 수 있습니다. </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Edit;
