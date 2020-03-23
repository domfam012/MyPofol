import Head from 'next/head'
import React from 'react'
import Footer from './footer/Admin'

const Layout = props => {
  const { header, footer } = props

  return (
    <>
      {/* 공통 head 영역 */}
      <Head>
        <title>나만의 포트폴리오를 만들어보세요. - My Portfolio</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
        <meta name="Referrer" content="origin"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="robots" content="index,follow"/>
        <meta name="description" content="MyPofol"/>
        <meta name="keywords" content="MyPofol"/>
        <meta name="format-detection" content="telephone=no"/>
        <meta property="og:type" content="website"/>
        {/*<meta property="og:image" content="/img/common/logo_og.png"/>*/}
        {/*<meta property="og:url" content="http://myxd.co.kr/"/>*/}
        <link rel="shortcut icon" type="image/x-icon" href={'/favicon.ico'}/>
        {/*<link rel="apple-touch-icon" sizes="180x180" href="/img/common/apple-icon-180x180.png"/>*/}
        {/*<link rel="icon" type="image/png" sizes="192x192" href="/img/common/android-icon-192x192.png"/>*/}
        {/*<meta name="msapplication-TileColor" content="#ffffff"/>*/}
        {/*<meta name="msapplication-TileImage" content="/img/common/ms-icon-144x144.png"/>*/}
        {/*<meta name="theme-color" content="#ffffff"/>*/}
        <script src="/js/bundle.js"/>
      </Head>
      {/*m-wrap 분기처리 필요, 메인화면 UI 이슈로 임시 하드 코딩*/}
      <div className={'wrap m-wrap'}>
        {props.children}
        <Footer/>
      </div>

    </>
  )
}

export default Layout
