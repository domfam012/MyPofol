import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/header/admin/Edit";

import { useRouter } from "next/router";

// Site | Category | View 분기 처리 필요
import SiteList from "../../components/pages/admin/edit/SiteList";
import CategoryList from "../../components/pages/admin/edit/CategoryList";
import ViewList from "../../components/pages/admin/edit/ViewList";

const Edit = props => {
  const router = useRouter();
  const site = router.query.site;
  const category = router.query.category;

  let render;
  if (!site && !category) {
    // http://localhost/admin/edit
    // http://localhost/admin/edit?site=
    // http://localhost/admin/edit?category=
    // http://localhost/admin/edit?site=&category=
    render = <SiteList/>;
  } else if (site && category) {
    // http://localhost/admin/edit?site=ab&category=cd
    // -> View 가서 Site/Category 조회 후 없으면 404
    render = <ViewList/>;
  } else if (site) {
    // http://localhost/admin/edit?site=ab
    // http://localhost/admin/edit?site=ab&category=
    // -> Category 가서 Site 조회 후 없으면 404
    render = <CategoryList/>;
  } else {
    // http://localhost/admin/edit?category=cd
    render = (<div>404</div>);
  }

  return (
    <Layout>
      <Header />
      {render}
    </Layout>
  );
};

export default Edit;
