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

    return (
        <div className="container-fluid row">

            <div className="col-md-2">
            <Sidebar></Sidebar>
            </div>

            <div className="col-md-10" style={{ height: '100vh', background: '#F4F7FC' }}>
                <div className="d-flex align-items-center dashboardHeaderBg p-5">
                    <h1 className="animate__animated animate__fadeInLeft">Order History</h1>
                    <div class="ml-auto">
                        <div className="row align-items-center animate__animated animate__fadeInRight">
                            <h5>{name}</h5>
                            <img src={photoURL} alt="" className="mx-3 rounded-circle" width="60" />
                        </div>
                    </div>
                </div>

                <div className="customFormStyle ">

                    <div className="bg-white p-5">
                        <div className="animate__animated animate__fadeInRight">
                            {
                                order.map(service => <div>
                                    <div className="row">
                                        <h5 class="card-title">{service.serviceName}</h5>
                                        <button className="btn btn-outline-info ml-5">{service.status}</button>
                                    </div>
                                    <p class="card-text my-5">{service.details}</p>
                                    <hr />
                                </div>)
                            }
                        </div>

                    </div>
                </div>

            </div>
        </div >
    );
};

export default ServiceList;