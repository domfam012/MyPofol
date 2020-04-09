import React, {useState } from "react";
import Header from "../../../components/header/portfolio/Category"
import Layout from "../../../components/Layout";
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-bootstrap/Carousel'
import {PORTFOLIO_IDX, PORTFOLIO_SITE_INFO} from '../../../redux/reducers/user';
import ImageNavigator from "../../../components/popup/portfolio/ImageNavigator"
import axios from "axios";

const CarouselList = props => {
    return(
        <div className={props.current === props.index ? "carousel-item active" : "carousel-item"}>
            <img  className="d-block" src={props.src} alt=""/>
        </div>
    )
};

const Category = props => {
    const dispatch = useDispatch();
    const { portfolioInfo, portfolioImgInfo, portfolioIdx, portfolioAutoPlay , portfolioPopup} = useSelector(state => state.user);
    const image = { name: '' };
    const [index, setIndex] = useState(portfolioIdx);


    const handleSelect = (selectedIndex) => {
        if (portfolioAutoPlay) {
            dispatch({type: PORTFOLIO_IDX, data: selectedIndex});
            setIndex(selectedIndex);
        } else {
            setIndex(selectedIndex);
            dispatch({type: PORTFOLIO_IDX, data: selectedIndex});
        }
    };

    image.name = portfolioAutoPlay
        ? portfolioImgInfo.view[portfolioImgInfo.viewList[index]].originName
        : portfolioImgInfo.view[portfolioImgInfo.viewList[portfolioIdx]].originName

    return (
        portfolioPopup
            ? <ImageNavigator
                site={props.site}
                siteImgPath={portfolioInfo.logo.path}
                siteName={portfolioInfo.name}
                image={portfolioImgInfo.view}
                imageList={portfolioImgInfo.viewList}
                currentIdx={ portfolioAutoPlay? index : portfolioIdx}
            />
            : <Layout>
                <Header
                    site={props.site}
                    siteImgPath={portfolioInfo.logo.path}
                    siteName={portfolioInfo.name}
                    image={image.name}
                    imageLength={portfolioImgInfo.viewList.length}
                    autoPlay={portfolioAutoPlay}
                    currentIdx={ portfolioAutoPlay? index+1 : portfolioIdx+1}
                />
                <section className="p_section slider">
                    <h2 className="sr-only">project</h2>
                    <div className="container-fluid p-0">
                        <div className="row">
                            <div className="col">
                                <div id="carouselProject" className="carousel slide">
                                    <Carousel interval={portfolioAutoPlay ? 2000 : null} activeIndex={portfolioAutoPlay? index : portfolioIdx} onSelect={handleSelect}>
                                        {portfolioImgInfo.viewList.map((item , idx) => (
                                            <CarouselList
                                                key={idx}
                                                src={portfolioImgInfo.view[item].img.path}
                                                index={idx}
                                                current={portfolioAutoPlay? index : portfolioIdx}
                                            />
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
    );
};

Category.getInitialProps = async function(ctx) {
    const site = ctx.query.site;
    const category = ctx.query.category;
    const siteRes = await axios.get(`${process.env.ASSET_PREFIX}/api/site/${site}`);
    const categoryRes = await axios.get(`${process.env.ASSET_PREFIX}/api/site/${site}/category/${category}`);
    ctx.store.dispatch({
        type : PORTFOLIO_SITE_INFO,
        data : {
            site : siteRes.data.data[site],
            category :categoryRes.data.data[0],
        }
    });
    return ({
        site : site,
        category : category
    })
};
export default Category;






