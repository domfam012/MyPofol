import React from 'react';

const Entry = () => {
    return (
        <>
            <section className="container-fluid init add_pf">
                <h2 className="title">MY PORTFOLIO SITE</h2>
                <div className="sub">
                    <p>쉽고 간단하게 만드는 나만의 포트폴리오 사이트</p>
                </div>
                <div className="btn-area mb">
                    <button className="btn btn-xl btn-primary">새 웹사이트 추가</button>
                </div>
            </section>
            <div className="main-bg">
                <div className="bar left-bar"/>
                <div className="bar right-bar"/>
                <img className="main-bg" src="/img/common/logo_sm.png" alt="My UI background image"/>
            </div>
        </>
    )
};

export default Entry;
