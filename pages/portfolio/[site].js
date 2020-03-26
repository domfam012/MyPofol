import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/header/portfolio/Site"
import Link from "next/link";
import { useSelector} from 'react-redux';
import {CONTROL_POPUP, PORTFOLIO_SITE_INFO} from '../../redux/reducers/user';

const CategoryList = props => {
    return(
        <Link href="/portfolio/[site]/[category]" as={`/portfolio/${props.site}/${props.category}`}>
            <a className="col"  href="#">
                <div className="img">
                    <img src={props.imgPath} alt="" />
                </div>
                <p className="title">{props.category}</p>
            </a>
        </Link>
    )
};

const Site = props => {
    const { siteInfo  } = useSelector(state => state.user);
    
    return (
        <Layout>
            <Header
                siteLogo={siteInfo.logo}
                siteName={siteInfo.name}/>
            <section className="p_section">
                <h2 className="sr-only">project</h2>
                <div className="container-fluid">
                    <div className="row">
                        {siteInfo.categoryList.map((item,index) =>(
                            <CategoryList
                                key={index}
                                imgPath={siteInfo.category[item].img.path}
                                site={props.site}
                                category={item}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
};


Site.getInitialProps = async function(ctx) {
    const site = ctx.query.site;
    ctx.store.dispatch({
        type : PORTFOLIO_SITE_INFO,
        data : ctx.query.site
    });
    ctx.store.dispatch({type : CONTROL_POPUP, data : false});
    return ({site : site})
};

export default Site;






