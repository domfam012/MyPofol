import React, {useState } from "react";
import Header from "../../../components/header/portfolio/Category"
import Layout from "../../../components/Layout";
import {useSelector} from 'react-redux';
import Carousel from 'react-bootstrap/Carousel'
import {PORTFOLIO_CATEGORY_INFO} from '../../../redux/reducers/user';
import ImageNavigator from "../../../components/popup/portfolio/ImageNavigator"
/*const CarouselList = props => {
    return(
        <div className="carousel-item">
            <img className="d-block" src={props.src} alt=""/>
        </div>
    )
};*/
const Category = props => {
    const { siteInfo, categoryInfo, portfolioAutoPlay , portfolioPopup } = useSelector(state => state.user);
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const current = categoryInfo.viewList[index];
    return (
        portfolioPopup
            ? <ImageNavigator
                site={siteInfo}
                image={categoryInfo.view}
                imageList={categoryInfo.viewList}
                currentIdx={index}
              />
            : <Layout>
                <Header
                    site={siteInfo}
                    image={categoryInfo.view[current].originName}
                    imageLength={categoryInfo.viewList.length}
                    autoPlay={portfolioAutoPlay}
                    currentIdx={index+1}
                />
                <section className="p_section slider">
                    <h2 className="sr-only">project</h2>
                    <div className="container-fluid p-0">
                        <div className="row">
                            <div className="col">
                                <div id="carouselProject" className="carousel slide">
                                    <Carousel interval={portfolioAutoPlay ? 3000 : null} activeIndex={index} onSelect={handleSelect}>
                                        {categoryInfo.viewList.map((item , index) => (
                                            <Carousel.Item key={index} className="carousel-item">
                                                <img key={index} className="d-block" src={categoryInfo.view[item].img.path} alt=""/>
                                            </Carousel.Item>
                                            /*<CarouselList
                                                 key={index}
                                                 src={categoryInfo[item].img.path}
                                             />*/
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
    ctx.store.dispatch({
        type : PORTFOLIO_CATEGORY_INFO,
        data : {
            site : site,
            category : category
        }
    });
    return ({
        site : site,
        category : category
    })
};

export default Category;






