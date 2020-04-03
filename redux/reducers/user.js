
export const initialState = {
    isLoggedIn : false,
    userInfo : {},
    siteInfo : {},
    siteState : 'unselected', // 'unselected' : 사이트 선택 안됨 'selected' : 사이트 선택 됨 'none' : 사이트 없음
    siteValue : '',
    categoryInfo : {},
    categoryState : 'unselected', // 'unselected' : 카테고리 선택 안됨 'selected' : 카테고리 선택 됨 'none' : 카테고리 없음
    categoryValue : '',
    portfolioAutoPlay : false, // 자동 슬라이드
    portfolioPopup : false // 이미지 이동 팝업 노출
};

export const PORTFOLIO_SITE_INFO = ' PORTFOLIO_SITE_INFO';
export const PORTFOLIO_CATEGORY_INFO = ' PORTFOLIO_CATEGORY_INFO';
export const CONTROL_AUTO_PLAY = 'CONTROL_AUTO_PLAY';
export const CONTROL_POPUP = 'CONTROL_POPUP';
export const LOG_ING = 'LOG_ING';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const CONTROL_REGISTER_POPUP = 'CONTROL_REGISTER_POPUP';
export const CATEGORY_STATE = 'CATEGORY_STATE';

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
        case PORTFOLIO_SITE_INFO : {
            return {
                ...state,
                siteInfo : action.data
            };
        }
        case PORTFOLIO_CATEGORY_INFO : {
            return {
                ...state,
                siteInfo : Site[action.data.site],
                categoryInfo : Site[action.data.site].category[action.data.category]
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
                categoryValue: action.data.value ? action.data.value : ''
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
};
