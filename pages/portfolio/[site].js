import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/header/portfolio/Site"

const Site = props => {
    return (
        <Layout>
            <Header/>
            <section className="p_section">
                <h2 className="sr-only">project</h2>
                <div className="container-fluid">
                    <div className="row row-cols-4">
                        <a className="col" href="#">
                            <div className="img">
                                <img src="/img/temp/proto2.png" alt="템플릿"/>
                            </div>
                            <p className="title">Prototype 1(PC)</p>
                        </a>
                        <a className="col" href="#">
                            <div className="img">
                                <img src="/img/temp/proto2.png" alt="템플릿"/>
                            </div>
                            <p className="title">Prototype 2(MOBILE)</p>
                        </a>
                        <a className="col" href="#">
                            <div className="img">
                                <img src="/img/temp/proto3.png" alt="템플릿"/>
                            </div>
                            <p className="title">Prototype 3(PC)</p>
                        </a>
                        <a className="col" href="#">
                            <div className="img">
                                <img src="/img/temp/proto4.png" alt="템플릿"/>
                            </div>
                            <p className="title">Prototype 4(PC)</p>
                        </a>
                        <a className="col" href="#">
                            <div className="img">
                                <img src="/img/temp/proto2.png" alt="템플릿"/>
                            </div>
                            <p className="title">Prototype 1(PC)</p>
                        </a>
                        <a className="col" href="#">
                            <div className="img">
                                <img src="/img/temp/proto2.png" alt="템플릿"/>
                            </div>
                            <p className="title">Prototype 2(MOBILE)</p>
                        </a>
                        <a className="col" href="#">
                            <div className="img">
                                <img src="/img/temp/proto3.png" alt="템플릿"/>
                            </div>
                            <p className="title">Prototype 3(PC)</p>
                        </a>
                        <a className="col" href="#">
                            <div className="img">
                                <img src="/img/temp/proto4.png" alt="템플릿"/>
                            </div>
                            <p className="title">Prototype 4(PC)</p>
                        </a>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Site;
