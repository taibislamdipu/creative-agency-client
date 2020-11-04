import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import AllOrder from '../../ManageOrder/AllOrder/AllOrder';

const OrderHistory = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, email, photoURL } = loggedInUser;

    const [order, setOrder] = useState([])

    useEffect(() => {
        fetch('https://fierce-cliffs-21804.herokuapp.com/allOrders')
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [])

    const customStyle = {
        height: '100%'
    }

    return (

        <div className="container-fluid" style={{ background: '#F4F7FC' }} className="p-5">

            <div className="d-flex align-items-center dashboardHeaderBg p-5">
                <h1 className="animate__animated animate__fadeInLeft">All Order list</h1>
                <div class="ml-auto">
                    <div className="row align-items-center animate__animated animate__fadeInRight">
                        <h5>{name}</h5>
                        <img src={photoURL} alt="" className="mx-3 rounded-circle" width="60" />
                    </div>
                </div>
            </div>

            {/* <div>
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email ID</th>
                            <th scope="col">Service</th>
                            <th scope="col">Project Details</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                </table>
            </div> */}
            <div style={customStyle}>
                {
                    order.map(allOrders => <AllOrder allOrders={allOrders}></AllOrder>)
                }
            </div>


        </div>

    );
};

export default OrderHistory;