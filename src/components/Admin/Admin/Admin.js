import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../../Dashboard/Sidebar/Sidebar';
import AllOrder from '../../ManageOrder/AllOrder/AllOrder';
import OrderHistory from '../OrderHistory/OrderHistory';

const Admin = () => {

    return (
        <div className="container-fluid row">

            <div className="col-md-2">
                <Sidebar></Sidebar>
            </div>

            <div className="col-md-10">
                <OrderHistory></OrderHistory>
                {/* <AllOrder></AllOrder> */}
            </div>
        </div>
    );
};

export default Admin;