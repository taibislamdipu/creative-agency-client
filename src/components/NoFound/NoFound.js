import React from 'react';
import errorImage from '../../images/404-error.gif';

const NoFound = () => {
    return (
        <div className="container-fluid text-center" style={{ background: '#F7F9FB', height: '100vh' }}>
            <div>
                <img src={errorImage} alt="" className="img-fluid" />
            </div>
            <div>
                <a href="/" style={{ fontSize: 30 }}>Back To Home</a>
            </div>
        </div>
    );
};

export default NoFound;