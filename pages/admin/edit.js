import React ,{useEffect} from "react";
import Layout from "../../components/Layout";
import Header from "../../components/header/admin/Edit";

import { useRouter } from "next/router";

// Site | Category | View 분기 처리 필요
import Site from "../../components/pages/admin/edit/Site";
import Category from "../../components/pages/admin/edit/Category";
import View from "../../components/pages/admin/edit/View";
import {LOG_ING, PORTFOLIO_SITE_INFO} from "../../redux/reducers/user";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

const Edit = props => {
  const router = useRouter();
  const dispatch = useDispatch();

  const site = router.query.site;
  const category = router.query.category;
  const { siteInfo } = useSelector(state => state.user);

    console.log('#2');
    console.log(siteInfo);


    useEffect(() => {
        if (window.sessionStorage.id){dispatch({type :LOG_ING});}
    }, []);

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
    render = <Category data={siteInfo} />;
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
    const site = ctx.query.site;
    if(site){
        axios.get(`http://localhost:8080/api/site/${site}`)
            .then( siteRes => {
                ctx.store.dispatch({
                    type : PORTFOLIO_SITE_INFO,
                    data : siteRes.data.data[site]
                })
            });

        console.log('#1')
    }
};

export default Edit;
