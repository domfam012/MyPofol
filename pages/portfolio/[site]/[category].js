import React from "react";
import Layout from "../../../components/Layout";
import Header from "../../../components/header/portfolio/Category"

const Category = props => {
    return (
        <Layout>
            <Header/>
            <section className="p_section slider">
                <h2 className="sr-only">project</h2>
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
