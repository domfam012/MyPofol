/* 메인 페이지 */
import React from "react";
import Layout from "../components/Layout";
import Header from "../components/header/admin/Index"

// 메인 페이지
const Index = props => {
  return (
    <Layout page={"index"}>
      <Header/>
        메인 페이지
    </Layout>
  );
};

export default Index;
