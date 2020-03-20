import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import React from "react";

const Layout = props => {
    return (
        <>
            {/* 공통 head 영역 */}
            <Head>
                <title>나만의 포트폴리오를 만들어보세요. - My Portfolio</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
                <meta name="Referrer" content="origin"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=Edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

                {/* app 파비콘 설정 */}
                {/*<link rel="shortcut icon" type="image/x-icon" href="/img/common/favicon.ico"/>*/}

                <script src="/js/bundle.js"/>
            </Head>
            <div className={"wrap"}>
                <Header/>
                {props.children}
                <Footer/>
            </div>

        </>
    )
};

export default Layout;
