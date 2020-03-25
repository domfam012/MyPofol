import Head from 'next/head'
import React from "react";
import Layout from "../../../components/Layout";
import Header from "../../../components/header/portfolio/Category"

const Category = props => {
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
            <section className="p_section slider">
                <h2 className="sr-only">portfolio slider</h2>
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col">
                            <div id="carouselProject" className="carousel slide">
                                <div className="carousel-inner ">
                                    <div className="carousel-item active">
                                        <img src="/img/temp/carousel.png" className="d-block" alt="이미지1"/>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/img/temp/UI_AD_AA_03_01S_snb.png" className="d-block" alt="이미지2"/>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/img/temp/carousel.png" className="d-block" alt="이미지2"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Category;
