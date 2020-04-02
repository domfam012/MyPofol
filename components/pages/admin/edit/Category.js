import {PORTFOLIO_SITE_INFO} from "../../../../redux/reducers/user";
import {useSelector} from "react-redux";

const CategoryList = props => {
    return(
        <div  className="site">
            <span className="site-img"><img src={props.imgPath} alt="thumbnail"/></span>
            <span className="site-body"><span className="title">{props.title}</span></span>
            <span className="btn-area">
            <button className="btn btn-outline-secondary mr-1">선택</button>
            <button className="btn btn-primary">상세</button></span>
        </div>
    )
};

const Category = props => {

    const { siteInfo  } = useSelector(state => state.user);
    console.log(siteInfo);
    console.log(props);
  return (
      <div className="inner no-mw clearfix">
          <div className="section-container edit">
              <section>
                  <div className="title_area">
                      <h2 className="title"><i className="far fa-chevron-left"></i>{props.siteName}</h2>
                      <div className="btn-area mb">
                          <button className="btn btn-outline-secondary">삭제</button>
                          <button className="btn btn-primary">새 카테고리 추가</button>
                      </div>
                  </div>
                  <div className="contents">
                      <div className="inner">
                          {siteInfo.categoryList.map((item , index) => (
                              <CategoryList
                                  key={index}
                                  imgPath={siteInfo.category[item].img.path}
                                  title={item}
                              />
                          ))}
                          <a className="site add" href="#">
                              <p className="plus"><i className="fal fa-plus"></i></p>
                              <p className="txt">새 웹사이트 추가</p>
                          </a>
                      </div>
                  </div>
              </section>
          </div>
          <div className="snb">
              <div className="contents">
                  <div className="box">
                      <form className="form_site">
                          <div className="form-group active">
                              <input type="text" className="form-control" title="사이트명" placeholder="Categoly 1"/>
                          </div>
                      </form>
                  </div>
                  <div className="box">
                      <div className="custom-control custom-radio custom-control-inline mr">
                          <input type="radio" id="pc" name="category" className="custom-control-input"/>
                              <label className="custom-control-label" htmlFor="pc">PC</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                          <input type="radio" id="mobile" name="category" className="custom-control-input"/>
                              <label className="custom-control-label" htmlFor="mobile">MOBILE</label>
                      </div>
                  </div>
                  <div className="box add_logo">
                      <a className="add_logo" href="#">
                          <p className="plus"><i className="fal fa-plus"></i></p>
                          <p className="txt">썸네일 이미지 추가</p>
                      </a>
                      <p className="desc">-가로 00px X 세로 00px (jpg,png,gif허용)<br/>-파일명 영문, 숫자 허용</p>
                  </div>
                  <div className="btn-area mb">
                      <button className="btn btn-lg btn-outline-secondary">취소</button>
                      <button className="btn btn-lg btn-primary">저장</button>
                  </div>
              </div>
          </div>
      </div>
  );
};


export default Category;
