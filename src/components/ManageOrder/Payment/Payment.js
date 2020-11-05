import React, { useContext } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../../Dashboard/Sidebar/Sidebar';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';

// import { CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Hk7lEGvF4n53p078HSGTkAYJf4w3CBlPHuv75jmWcreLohP4iavWxv1ByNc943Yb0JrJ1hiqQNUgnrAE94On1xH00yYdMrdU6');


const Payment = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, email, photoURL } = loggedInUser;

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

                <div className="customFormStyle w-50">

                    <div className="bg-white p-5">
                        <div className="animate__animated animate__fadeInRight">
                            <h1 className="mb-5">Payment Form</h1>

                            <Elements stripe={stripePromise}>
                                <SimpleCardForm></SimpleCardForm>
                                {/* <SplitCardForm></SplitCardForm> */}
                            </Elements>
                        </div>

                    </div>
                </div>

            </div>
        </div >
    );
};

export default Payment;