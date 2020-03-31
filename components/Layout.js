import Head from 'next/head'
import React from 'react'
import Footer from './footer/Admin'
import { useRouter } from 'next/router'

const Layout = props => {
  const { header, footer } = props
  const router = useRouter()

  const isMain = router.pathname === '/'

  return (
    <>
      <Head>
        {/* 공통 head 영역 */}
        <title>나만의 포트폴리오를 만들어보세요. - My Portfolio</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
        <meta name="Referrer" content="origin"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="robots" content="index,follow"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="/img/common/logo_og.png"/>
        <meta property="og:url" content="http://mypofol.co.kr/"/>

        {/* app 파비콘 설정 */}
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/img/common/apple-icon-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192" href="/img/common/android-icon-192x192.png"/>
        <meta name="msapplication-TileColor" content="#ffffff"/>
        <meta name="msapplication-TileImage" content="/img/common/ms-icon-144x144.png"/>
        <meta name="theme-color" content="#ffffff"/>
      </Head>
      {/* main page 분기 처리 */}
      <div className={`wrap ${isMain ? 'm-wrap' : ''}`}>
        {props.children}
        <Footer/>
      </div>
    </>
  )
}
export default Layout;

