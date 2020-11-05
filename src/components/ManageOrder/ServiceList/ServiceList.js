import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../../Dashboard/Sidebar/Sidebar';
import webDesign from '../../../images/icons/web-design.png';

const ServiceList = () => {

    const [order, setOrder] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, email, photoURL } = loggedInUser;



    useEffect(() => {
        fetch(`https://fierce-cliffs-21804.herokuapp.com/specificOrder?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [])

    // console.log('order history', order);

    const containerStyle = {
        height: "100%",
    }

    return (
        <div className="container-fluid row" style={containerStyle}>

            <div className="col-md-2">
                <Sidebar></Sidebar>
            </div>

            <div className="col-md-10" style={{ background: '#F4F7FC' }}>
                <div className="d-flex align-items-center dashboardHeaderBg p-5">
                    <h1 className="animate__animated animate__fadeInLeft">Order History</h1>
                    <div class="ml-auto">
                        <div className="row align-items-center animate__animated animate__fadeInRight">
                            <div className="col">
                                <h5>{name}</h5>
                                <p><small className="text-secondary">{email}</small></p>
                            </div>
                            <img src={photoURL} alt="" className="mx-3 rounded-circle" width="60" />
                        </div>

                    </div>
                </div>

                {/* <div className="customFormStyle"> */}

                <div className="p-5 container">
                    <div className="animate__animated animate__fadeInRight row ">
                            {
                            order.map(service => <div className="col-md-4">
                                <div className="card custom-card-style my-3 border border-secondary rounded p-3" >
                                    <div className="d-flex justify-content-between">
                                    <h5 class="card-title">{service.serviceName}</h5>
                                        <button className="btn btn-outline-info">{service.status}</button>
                                    </div>
                                    <p>$ {service.price}</p>
                                    <p class="card-text my-5">{service.details}</p>
                                    <a href="/payment">${service.price} Make Payment</a>
                                </div>

                                {/* <hr /> */}
                                </div>)
                            }

                        </div>

                    </div>
                </div>

            </div>
        // </div >
    );
};

export default ServiceList;