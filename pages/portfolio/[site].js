import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/header/portfolio/Site"
import Link from "next/link";
import { useSelector} from 'react-redux';
import {CONTROL_POPUP, PORTFOLIO_SITE_INFO} from '../../redux/reducers/user';
import axios from 'axios';
import {useRouter} from "next/router";

const CategoryList = props => {
    const router = useRouter();
    const checkImg = () => {
        if(props.existImg) router.push(`/portfolio/${props.site}/${props.category}`);
        else alert('이미지 미존재')
    };
    return(
        <a onClick={checkImg} className="col"  href="#">
            <div className="img">
                <img src={props.imgPath} alt="" />
            </div>
            <p className="title">{props.name}({props.type === 1 ? 'PC' : 'MOBILE'})</p>
        </a>
    )
};

const Site = props => {
    const { portfolioInfo } = useSelector(state => state.user);
    
    return (
        <Layout>
            <Header
                siteLogo={portfolioInfo.logo.path}
                siteName={portfolioInfo.name}/>
            <section className="p_section">
                <h2 className="sr-only">project</h2>
                <div className="container-fluid">
                    <div className="row">
                        {portfolioInfo.categoryList.map((item,index) =>(
                            <CategoryList
                                key={index}
                                imgPath={portfolioInfo.category[item].img.path}
                                site={props.site}
                                category={item}
                                name={portfolioInfo.category[item].name}
                                type={portfolioInfo.category[item].type}
                                existImg={portfolioInfo.category[item].viewList.length !== 0}
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
    const res = await axios.get(`http://localhost:8080/api/site/${site}`);
    ctx.store.dispatch({
        type : PORTFOLIO_SITE_INFO,
        data : {
            site : res.data.data[site]
        }
    });
    ctx.store.dispatch({type : CONTROL_POPUP, data : false});
    return ({site : site})
};

export default Site;






