import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/header/admin/Edit";

import { useRouter } from "next/router";

// Site | Category | View 분기 처리 필요
import Site from "../../components/pages/admin/edit/Site";
import Category from "../../components/pages/admin/edit/Category";
import View from "../../components/pages/admin/edit/View";
import {PORTFOLIO_SITE_INFO} from "../../redux/reducers/user";

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
    render = <Site/>;
  } else if (site && category) {
    // http://localhost/admin/edit?site=ab&category=cd
    // -> View 가서 Site/Category 조회 후 없으면 404
    render = <View/>;
  } else if (site) {
    // http://localhost/admin/edit?site=ab
    // http://localhost/admin/edit?site=ab&category=
    // -> Category 가서 Site 조회 후 없으면 404
    render = <Category siteName={props.name}/>;
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


Edit.getInitialProps = async function(ctx) {
    console.log(ctx);
    const site = ctx.query.site;
    const name = ctx.query.name;
    if(site){
        console.log(site);
        ctx.store.dispatch({
            type : PORTFOLIO_SITE_INFO,
            data : ctx.query.site
        });
        return ({siteName : name})
    }
};

export default Edit;
