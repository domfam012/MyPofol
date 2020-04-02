/* 메인 페이지 */
import Head from 'next/head'
import Link from 'next/link'
import Layout from "../components/Layout";
import Header from "../components/header/admin/Index";
import React, { useState , useEffect} from 'react';
import Popup from '../components/popup/admin/new/Popup';
import {useRouter} from "next/router";
import { LOG_ING} from "../redux/reducers/user";
import {useDispatch, useSelector} from "react-redux";

import axios from "axios";

const TemplateList = props => {
  const { imgPath, title } = props;
  return(
    <div className="col">
      <div className="site">
        <div className="site-img">
          <img src={imgPath} alt={title} />
        </div>
        <div className="site-body">
          <div className="title">{title}</div>
        </div>
        <div className="btn-area single">
          <button className="btn btn-primary">미리보기</button>
        </div>
      </div>
    </div>
  )
};


// 메인 페이지
const Index = props => {

  const router = useRouter();
  const [ openPopup, setOpenPopup ] = useState(false);
  const { isLoggedIn } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const closePopup = () => {
    setOpenPopup(!openPopup);
  };

  useEffect(() => {
    if (window.sessionStorage.id){dispatch({type :LOG_ING});}
   }, []);

  const templateList = props.data;


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
                          {isLoggedIn ?
                              <Link href={'/admin/edit'}>
                                  <button className="btn btn-xl btn-primary _download">
                                      시작하기
                                  </button>
                              </Link> :
                              <Link href={'/admin/user/social'}>
                                  <button className="btn btn-xl btn-primary _download">
                                      시작하기
                                  </button>
                              </Link>
                          }

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
                        { templateList.map(item => (
                          <TemplateList key={item.index}
                            imgPath={item.img.path}
                            title={item.title}
                          />
                        ))}
                      </div>
                    </div>
                  </section>
                </Layout>
            )
      }
    </>
  );
};

Index.getInitialProps = async function(ctx) {
  const page = ctx.query.page || "1"; // default page index
  // const res = await fetch(
  //   `${process.env.ASSET_PREFIX}/api/template/[id]`
  // );
  const res = await axios.get(
    `http://localhost/api/template/list`
  );
  return {
    data: res.data.data
  };
};

export default Index;
