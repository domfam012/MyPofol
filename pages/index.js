/* 메인 페이지 */
import React from "react";
import Layout from "../components/Layout";
import Header from "../components/header/admin/Index";

import { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Popup from '../components/popup/admin/new/Popup';
import Entry from '../components/popup/admin/new/Entry';
import Step1 from '../components/popup/admin/new/Step1';
import Step2 from '../components/popup/admin/new/Step2';
import Step3 from '../components/popup/admin/new/Step3';
import Step4 from '../components/popup/admin/new/Step4';
import Exit from '../components/popup/admin/new/Exit';

// 메인 페이지
const Index = props => {

  const [ modalOpen, setModalOpen ] = useState(true);

  return (
    <>
      {
        modalOpen
            ? (
              <Popup>
                <Step2/>
              </Popup>
            )
            : (
              <></>
            )
      }

      <Layout page={"index"}>

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
    </>
  );
};

export default Index;
