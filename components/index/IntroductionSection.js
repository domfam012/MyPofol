import React from "react";

export default  () => (
    <section className="container-fluid introduction">
        <h1 className="header"><strong>무료</strong> 부트 스트랩 템플릿</h1>
        <div className="detail">
            <p className="line line1">MyUI는 Bootstrap 위에 구축 된 가장 인기있는 오픈 소스 관리자 패널 템플릿 중 하나 입니다.</p>
            <p className="line line2">MyUI 관리 대시 보드는 반응형 사용자 정의 가능하고 재사용 가능한 구성 요소를 제공합니다.</p>
            <p className="line line3">MyUI는 앱 개발 속도를 빠르게 합니다.</p>
        </div>
        <div className="version">
            최근버젼 : 1. 0. 0
        </div>
        <div className="btn-area">
            <button className="btn btn-xl btn-primary download">다운로드 MyUI</button>
            <button className="btn btn-xl btn-outline-secondary preview ml-1">라이브 미리보기</button>
        </div>
        <div className="github">
            <div className="line">MyUI를 좋아한다면 <strong>Github에서 별을 보내주세요.</strong></div>
            <div className="link">
                <a href="#">
                    <img src="/img/main/github-stars.png" alt="github stars"/>
                </a>
            </div>
        </div>
    </section>
);
