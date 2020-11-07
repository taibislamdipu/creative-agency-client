import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import AllOrder from '../../ManageOrder/AllOrder/AllOrder';

const OrderHistory = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, email, photoURL } = loggedInUser;

    const [order, setOrder] = useState([])

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch('https://fierce-cliffs-21804.herokuapp.com/allOrders')
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [])

    const customStyle = {
        height: '100%'
    }

    useEffect(() => {
        fetch('https://fierce-cliffs-21804.herokuapp.com/isAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsAdmin(data));
    }, [])

    return (

        <div>
            {isAdmin &&
                <div className="container-fluid" style={{ background: '#F4F7FC' }} className="p-5">

                    <div className="d-flex align-items-center dashboardHeaderBg p-5">
                        <h1 className="animate__animated animate__fadeInLeft">All Order list</h1>
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

                    <div style={customStyle}>
                        {
                            order.map(allOrders => <AllOrder allOrders={allOrders}></AllOrder>)
                        }
                    </div>
                </div>
            }
        </div>

    );
};

export default OrderHistory;