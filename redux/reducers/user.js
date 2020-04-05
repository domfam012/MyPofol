export const initialState = {
    isLoggedIn : false,
    userInfo : {},
    siteInfo : {},
    viewState : 'none',
    viewValue : '',
    categoryState : 'unselected', // 'unselected' : 카테고리 선택 안됨 'selected' : 카테고리 선택 됨 'none' : 카테고리 없음
    categoryValue : '' ,
    addCategory : false,
    portfolioInfo : {},
    portfolioImgInfo : {},
    portfolioIdx : 0,
    portfolioAutoPlay : false, // 자동 슬라이드
    portfolioPopup : false // 이미지 이동 팝업 노출
};

export const SITE_INFO = ' SITE_INFO';
export const PORTFOLIO_SITE_INFO = ' PORTFOLIO_SITE_INFO';
export const PORTFOLIO_IDX = 'PORTFOLIO_IDX';
export const CONTROL_AUTO_PLAY = 'CONTROL_AUTO_PLAY';
export const CONTROL_POPUP = 'CONTROL_POPUP';
export const LOG_ING = 'LOG_ING';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const CONTROL_REGISTER_POPUP = 'CONTROL_REGISTER_POPUP';
export const CATEGORY_STATE = 'CATEGORY_STATE';
export const VIEW_STATE = 'VIEW_STATE';

export default (state = initialState , action) => {
    switch (action.type) {
        case  LOG_ING : {
            return {
                ...state,
                isLoggedIn : true,
            };
        }
        case  LOG_IN : {
            return {
                ...state,
                isLoggedIn : true,
                userInfo : action.data,
            };
        }
        case  LOG_OUT : {
            return {
                ...state,
                isLoggedIn : false,
                userInfo : {}
            };
        }
        case SITE_INFO : {
            return {
                ...state,
                siteInfo : action.data
            };
        }
        case PORTFOLIO_SITE_INFO : {
            return {
                ...state,
                portfolioInfo : action.data.site,
                portfolioImgInfo: action.data.category ? action.data.category : {}
            };
        }
        case PORTFOLIO_IDX : {
            return {
                ...state,
                portfolioIdx: action.data
            };
        }
        case CONTROL_AUTO_PLAY : {
            return {
                ...state,
                portfolioAutoPlay : !state.portfolioAutoPlay
            };
        }
        case CONTROL_POPUP : {
            return {
                ...state,
                portfolioPopup : action.data
            };
        }
        case CONTROL_REGISTER_POPUP : {
            return {
                ...state
            }
        }
        case CATEGORY_STATE : {
            return {
                ...state,
                categoryState: action.data.state,
                categoryValue: action.data.value ? action.data.value : '',
                addCategory: action.data.add ? action.data.add : false
            }
        }
        case VIEW_STATE : {
            return {
                ...state,
                viewState: action.data.state,
                viewValue: action.data.value ? action.data.value : ''
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
};
