import React from "react";

// using redux
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import withRedux from 'next-redux-wrapper';
import reducer from '../redux/reducers/rootReducer';

/**
 *  css loading
 *  ../ -> /
 *  ../../ -> /
 */
// 전역 css
import "../public/css/bootstrap.min.css";

function MyApp({ Component, pageProps, store }) {
// pageProps that were returned from 'getInitialProps are stored in the props

    return (
        <Provider store={store}>
            <Component {...pageProps}/>
        </Provider>
    );
}

export default withRedux((initialState, options) => {
    const middlewares = [];
    const enhancer = compose(
        applyMiddleware(...middlewares),
        !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    );
    const store = createStore(reducer, initialState, enhancer);
    return store;
})(MyApp);