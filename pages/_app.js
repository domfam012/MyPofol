import React from "react";

// using redux
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import store from '../redux/store';

// 전역 css
import "../public/css/bootstrap.min.css";
import "../public/css/fonts/fontawesome/fontawesome.css";
import "../public/css/fonts/fontawesome/brands.css";
import "../public/css/fonts/fontawesome/regular.css";
import "../public/css/fonts/fontawesome/solid.css";

function MyApp({ Component, pageProps, store }) {
// pageProps that were returned from 'getInitialProps are stored in the props

    return (
        <Provider store={store}>
            <Component {...pageProps}/>
        </Provider>
    );
}

// makeStore fn that returns a new store for every request
const makeStore = () => store;
// withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp);
