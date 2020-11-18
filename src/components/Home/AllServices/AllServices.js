import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './AllServices.css';

const AllServices = ({ allServices }) => {

    const { _id, image, title, description } = allServices;

    // console.log('allServices props', allServices);



    return (
        <div className="col-md-4 ">
            {/* <Link to={'/dashboard'} style={{ textDecoration: 'none' }} > */}
            <Link to={'/orderForm'} style={{ textDecoration: 'none' }} >
                <div className="card custom-card-style my-5 border border-secondary rounded trans-card" style={{ height: 250 }}>
                    <div className="card-body ">
                        {
                            allServices.image ? <img className="rounded-circle " style={{ height: '40px' }} src={`data:image/png;base64,${allServices.image.img}`} alt="" />
                                :
                                <img className="rounded-circle" style={{ height: '40px' }} src={`https://fierce-cliffs-21804.herokuapp.com/getServices/${image.img}`} alt="" />
                        }
                        <h3 className="text-dark">{title}</h3>
                        <p className="text-secondary">{description}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default AllServices;