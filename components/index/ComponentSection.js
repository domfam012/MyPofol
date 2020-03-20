import React from "react";

export default  () => (
    <section className="container-fluid component">
        <h1 className="header"><strong>MyUI는</strong> 바로 사용 가능하고 커스터마이징 가능합니다.</h1>
        <p className="sub-header">반응형 웹 앱을 개발하고 개발 시간을 최대 50% 단축 합니다.</p>

        <div className="list">

            <div className="row">
                <div className="col col-sm-6 item">
                    <h5 className="title"><strong><i className="fas fa-th"></i><span className="text">COMPONENTS</span></strong>
                    </h5>
                    <ul className="detail">
                        <li>카드 (Cards)</li>
                        <li>변수 (Vars)</li>
                        <li>페이지 (Pagination)</li>
                        <li>탭메뉴 (Tabs)</li>
                        <li>툴팁 (Tooltips)</li>
                    </ul>
                </div>
                <div className="col col-sm-6 item">
                    <h5 className="title"><strong><i className="fas fa-bell"></i><span className="text">BUTTONS & NOTIFICATIONS</span></strong>
                    </h5>
                    <ul className="detail">
                        <li>기본버튼 (Standard Button)</li>
                        <li>라인버튼 (Outline Button)</li>
                        <li>드랍다운 (Dropdown)</li>
                        <li>팝업 (Alerts)</li>
                        <li>뱃지 (Badge)</li>
                        <li>팝업 (Modal)</li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col col-sm-6 item">
                    <h5 className="title"><strong><i className="fas fa-th-large"></i><span className="text">FORMS & TABLES</span></strong>
                    </h5>
                    <ul className="detail">
                        <li>유효성 검사 (Form Validation)</li>
                    </ul>
                </div>
                <div className="col col-sm-6 item">
                    <h5 className="title"><strong><i className="fas fa-bolt"></i><span
                        className="text">PLUGINS, WIDGET</span></strong></h5>
                    <ul className="detail">
                        <li>달력 (bootstrap-datepicker)</li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col col-sm-6 item">
                    <h5 className="title"><strong><i className="fas fa-square"></i><span className="text">EXTRA COMPONENTS</span></strong>
                    </h5>
                    <ul className="detail">
                        <li>로그인 (Login Page)</li>
                        <li>회원가입 (Register Page)</li>
                    </ul>
                </div>
                <div className="col col-sm-6"></div>
            </div>

        </div>

    </section>
);
