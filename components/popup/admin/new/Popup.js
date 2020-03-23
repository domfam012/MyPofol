import React from 'react';
import Header from '../../../../components/header/admin/new'

const Popup = props => {
    return (
        <div className="wrap">
            <Header/>
            {props.children}
        </div>
    )
};

export default Popup;
