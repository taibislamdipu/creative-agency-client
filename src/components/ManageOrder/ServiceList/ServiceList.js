import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../../Dashboard/Sidebar/Sidebar';

import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Elements } from '@stripe/react-stripe-js';
import SimpleCardForm from '../Payment/SimpleCardForm';
import { loadStripe } from '@stripe/stripe-js';
import SplitCardForm from '../Payment/SplitCardForm';
import SearchField from 'react-search-field';

const stripePromise = loadStripe('pk_test_51Hk7lEGvF4n53p078HSGTkAYJf4w3CBlPHuv75jmWcreLohP4iavWxv1ByNc943Yb0JrJ1hiqQNUgnrAE94On1xH00yYdMrdU6');

const customStylesModal = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '30%'
    }
};


const ServiceList = () => {

    const [price, setPrice] = useState(0);
    const [order, setOrder] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, email, photoURL } = loggedInUser;

    useEffect(() => {
        fetch(`https://fierce-cliffs-21804.herokuapp.com/specificOrder?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [])

    console.log('order history', order);

    // dashboard right div style
    const containerStyle = {
        height: "100%",
    }

    var subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal(service) {
        setIsOpen(true);
        // console.log('service', service);
        setPrice(service.price);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#32A6EF';
    }

    function closeModal() {
        setIsOpen(false);
    }

    // search bar function
    function onChange() {
        console.log('object');
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
                <div className="my-3">
                    <SearchField
                        placeholder='Search item'
                        onChange={onChange}
                    />
                </div>


                <div className="p-5 container">
                    <div className="animate__animated animate__fadeInRight row ">
                            {
                            order.map(service => <div className="col-md-6">
                                <div className="card custom-card-style my-3 border border-secondary rounded p-3" style={{ height: 300 }}>
                                    <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                    <h5 class="card-title">{service.serviceName}</h5>
                                        <button className="btn btn-outline-info">{service.status}</button>
                                    </div>
                                        <p>$ {service.price}</p>
                                        <p class="card-text overflow-auto">{service.details}</p>
                                    </div>
                                    <div className="card-footer bg-white">
                                        <button className="btn btnSubmit w-100" onClick={() => openModal(service)}><span style={{ fontWeight: 'bold' }}>${service.price}</span> Make Payment</button>
                                    </div>
                                </div>                        
                                </div>)
                            }
                    </div>

                    </div>
            </div>

            <div>

                {/* <button onClick={openModal}>Open Modal</button> */}
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStylesModal}
                    contentLabel="Example Modal"
                >

                    <h2 className="mb-5" ref={_subtitle => (subtitle = _subtitle)}>Make Payment of <span style={{ color: '#23272A' }}>${price}</span></h2>
                    {/* <button onClick={closeModal}>close</button> */}
                    {/* {service.price} */}
                    {/* <div>I am a modal </div> */}
                    {/* <form>
                        <input />
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                    </form> */}

                    <Elements stripe={stripePromise}>
                        <SimpleCardForm></SimpleCardForm>
                        {/* <SplitCardForm></SplitCardForm> */}
                    </Elements>
                </Modal>

            </div>


            </div>
        // </div >
    );
};

export default ServiceList;