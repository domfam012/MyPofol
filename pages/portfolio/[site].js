import Head from 'next/head'
import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/header/portfolio/Site"

const Site = props => {
    return (
        <Layout>
            <Head>
                <title>포트폴리오</title>
                <meta name="apple-mobile-web-app-title" content="MyPofol" />
                <meta name="description" content="나의 포트폴리오"/>
                <meta name="keywords" content="portfolio, 포트폴리오, pofol, mypofol, viewer, slider" />
                <meta property="og:title" content="나의 포트폴리오" />
                <meta property="og:description" content="나의 포트폴리오" />
            </Head>
            <Header/>
            <section className="p_section">
                <h2 className="sr-only">project</h2>
                <div className="container-fluid">
                    <div className="row row-cols-4">
                        <a className="col" href="#">
                            <div className="img">
                                <img src="/img/temp/proto2.png" alt="템플릿"/>
                            </div>
                            <p className="title">Prototype 1(<span className={"category"}>PC</span>)</p>
                        </a>
                        <a className="col" href="#">
                            <div className="img">
                                <img src="/img/temp/proto2.png" alt="템플릿"/>
                            </div>
                            <p className="title">Prototype 2(<span className={"category"}>MOBILE</span>)</p>
                        </a>
                        <a className="col" href="#">
                            <div className="img">
                                <img src="/img/temp/proto3.png" alt="템플릿"/>
                            </div>
                            <p className="title">Prototype 3(<span className={"category"}>PC</span>)</p>
                        </a>
                        <a className="col" href="#">
                            <div className="img">
                                <img src="/img/temp/proto4.png" alt="템플릿"/>
                            </div>
                            <p className="title">Prototype 4(<span className={"category"}>PC</span>)</p>
                        </a>
                        <a className="col" href="#">
                            <div className="img">
                                <img src="/img/temp/proto2.png" alt="템플릿"/>
                            </div>
                            <p className="title">Prototype 1(<span className={"category"}>PC</span>)</p>
                        </a>
                        <a className="col" href="#">
                            <div className="img">
                                <img src="/img/temp/proto2.png" alt="템플릿"/>
                            </div>
                            <p className="title">Prototype 2(<span className={"category"}>MOBILE</span>)</p>
                        </a>
                        <a className="col" href="#">
                            <div className="img">
                                <img src="/img/temp/proto3.png" alt="템플릿"/>
                            </div>
                            <p className="title">Prototype 3(<span className={"category"}>PC</span>)</p>
                        </a>
                        <a className="col" href="#">
                            <div className="img">
                                <img src="/img/temp/proto4.png" alt="템플릿"/>
                            </div>
                            <p className="title">Prototype 4(<span className={"category"}>PC</span>)</p>
                        </a>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Site;
