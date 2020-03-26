/* 메인 페이지 */
import Head from 'next/head'
import React from "react";
import Layout from "../components/Layout";
import Header from "../components/header/admin/Index";
import { useState } from 'react';
import Popup from '../components/popup/admin/new/Popup';
import {useSelector} from "react-redux";
import { useRouter } from "next/router";

// 메인 페이지
const Index = props => {
  const router = useRouter();
  const { isLoggedIn  } = useSelector(state => state.user);
  const [ openPopup, setOpenPopup ] = useState(false);
  const closePopup = () => {
    setOpenPopup(!openPopup);
  };

  if(isLoggedIn) {router.push(`/admin/edit`);}

  return (
    <>
      {
        openPopup
            ? <Popup closePopup={closePopup}/>
            : (
              <Layout page={"index"}>
                <Head>
                  <title>나만의 포트폴리오를 만들어보세요. - My Portfolio</title>
                  <meta name="apple-mobile-web-app-title" content="MyPofol" />
                  <meta name="description" content="나만의 포트폴리오를 만들어보세요. - My Pofol"/>
                  <meta name="keywords" content="portfolio, 포트폴리오, pofol, mypofol" />
                  <meta property="og:title" content="나만의 포트폴리오를 만들어보세요. - My Pofol" />
                  <meta property="og:description" content="나만의 포트폴리오를 만들어보세요. - My Pofol" />
                </Head>
                  <Header />
                  <section className="introduction">
                    <div className="container">
                      <h2 className="title">MY POFOL</h2>
                      <p className="desc_01">
                        멋진 포트폴리오 사이트를 무료로 만들어 보세요.
                      </p>
                      <p className="desc_02">
                        언제 어디서나 당신의 포트폴리오를 관리 할 수 있으며,
                        <br />
                        언제 어디서나 당신의 포트폴리오를 사람들에게 보여줄 수 있습니다.
                      </p>
                      <div className="btn-area text-center">
                        <button className="btn btn-xl btn-primary _download">
                          시작하기
                        </button>
                      </div>
                    </div>
                  </section>

                  <div className="main-bg">
                    <div className="bar left-bar"></div>
                    <div className="bar right-bar"></div>
                    <img
                        className="img"
                        src="/img/common/logo_lg.png"
                        alt="My UI background image"
                    />
                  </div>

                  <section className="pofol">
                    <div className="container-fluid">
                      <h2 className="title">YOUR SITE</h2>
                      <p className="desc_01">
                        마이포폴에서 제공하는 템플릿으로 당신만의 특별한 사이트가
                        완성됩니다.
                      </p>
                      <div className="row">
                        <div className="col-4">
                          <div className="site">
                            <div className="site-img">
                              <img src="/img/temp/potens.png" alt="potens" />
                            </div>
                            <div className="site-body">
                              <div className="title">Template A</div>
                            </div>
                            <div className="btn-area single">
                              <button className="btn btn-primary">미리보기</button>
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="site">
                            <div className="site-img">
                              <img src="/img/temp/potens.png" alt="potens" />
                            </div>
                            <div className="site-body">
                              <div className="title">Template B</div>
                            </div>
                            <div className="btn-area single">
                              <button className="btn btn-primary">미리보기</button>
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="site">
                            <div className="site-img">
                              <img src="/img/temp/potens.png" alt="potens" />
                            </div>
                            <div className="site-body">
                              <div className="title">Template C</div>
                            </div>
                            <div className="btn-area single">
                              <button className="btn btn-primary">미리보기</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <div className="site">
                            <div className="site-img">
                              <img src="/img/temp/potens.png" alt="potens" />
                            </div>
                            <div className="site-body">
                              <div className="title">Template D</div>
                            </div>
                            <div className="btn-area single">
                              <button className="btn btn-primary">미리보기</button>
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="site">
                            <div className="site-img">
                              <img src="/img/temp/potens.png" alt="potens" />
                            </div>
                            <div className="site-body">
                              <div className="title">Template E</div>
                            </div>
                            <div className="btn-area single">
                              <button className="btn btn-primary">미리보기</button>
                            </div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="site">
                            <div className="site-img">
                              <img src="/img/temp/potens.png" alt="potens" />
                            </div>
                            <div className="site-body">
                              <div className="title">Template F</div>
                            </div>
                            <div className="btn-area single">
                              <button className="btn btn-primary">미리보기</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </Layout>
            )
      }
    </>
  );
};

export default Index;
