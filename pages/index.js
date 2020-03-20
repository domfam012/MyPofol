/* 메인 페이지 */
import React from "react";
import Layout from "../components/Layout";

import IntroductionSection from './../components/index/IntroductionSection';
import SupportSection from './../components/index/SupportSection';
import ComponentSection from './../components/index/ComponentSection';

// 메인 페이지
const Index = props => {
  return (
    <Layout page={"index"}>
        <IntroductionSection/>

        <div className="main-bg">
            <div className="bar left-bar"></div>
            <div className="bar right-bar"></div>
            <img className="main-bg" src="/img/main/main-bg.png" alt="My UI background image"/>
        </div>

        <div className="bg-container">
            <SupportSection/>
        </div>

        <ComponentSection/>
    </Layout>
  );
};

export default Index;
