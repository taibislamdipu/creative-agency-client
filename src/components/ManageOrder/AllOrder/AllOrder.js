import React, { useEffect, useRef, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Modal from 'react-modal';

const customStylesModal = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%'
    }
};

const AllOrder = ({ allOrders }) => {

    console.log('allOrders props', allOrders);
    const { _id, name, email, serviceName, details, orderImg, date } = allOrders;

    const newStatus = allOrders.status;

    const [all, setAll] = useState([])
    const [status, setStatus] = useState('status')

    const options = [
        { value: 'Pending', label: 'Pending' },
        { value: 'On Going', label: 'On Going' },
        { value: 'Done', label: 'Done' },
        { value: 'Cancel', label: 'Cancel' },
    ]



    useEffect(() => {
        fetch('https://fierce-cliffs-21804.herokuapp.com/allOrders')
            .then(res => res.json())
            .then(data => {
                const result = data.map(d => ({ ...d, status: 'Pending' }))

                setAll(result);
            })
    }, [])

    const change = (e, id) => {
        fetch(`https://fierce-cliffs-21804.herokuapp.com/update/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: e.value })
        })

            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Status updated successfully.')
                }
            })
    }

    const defaultOption = options[0];

    var subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal(service) {
        setIsOpen(true);
        // console.log('service', service);
        // setPrice(service.price);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#32A6EF';
    }

    function closeModal() {
        setIsOpen(false);
    }

    // Print Project Description Function
    function printDoc() {
        const description = document.getElementById('project-description');
        window.print(description);
    }

    return (

        <div>
            <table className="table table-hover bg-white">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Service</th>
                        <th scope="col">Details</th>
                        <th scope="col">Image</th>
                        <th scope="col">Ordered</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={_id}>
                        <th>{name}</th>
                        <td>{email}</td>
                        <td>{serviceName}</td>
                        {/* <td>{details}</td> */}
                        <td>
                            <button className="btn btn-light" onClick={openModal} id="view-btn">View</button>

                            <Modal
                                isOpen={modalIsOpen}
                                onAfterOpen={afterOpenModal}
                                onRequestClose={closeModal}
                                style={customStylesModal}
                                contentLabel="Example Modal"
                            >

                                <div className="mb-5" ref={_subtitle => (subtitle = _subtitle)}>
                                    <h3>Project Description</h3>

                                    <button className="btn btn-light" onClick={printDoc}>Print</button>

                                    <p className="text-secondary" id="project-description">
                                        {details}
                                    </p>
                                </div>
                            </Modal>
                        </td>

                        <td>
                            {
                                allOrders.orderImg ? <img className="rounded " style={{ height: '40px' }} src={`data:image/png;base64,${allOrders.orderImg.img}`} alt="" />
                                    :
                                    <img className="rounded" style={{ height: '40px' }} src={`https://fierce-cliffs-21804.herokuapp.com/allOrders/${orderImg.img}`} alt="" />
                            }
                        </td>
                        <td>{date}</td>
                        <td>
                            <Dropdown options={options} onChange={(e) => { change(e, `${_id}`) }} value={newStatus} /* placeholder="Select an option" */ />
                        </td>
                    </tr>

                    {/* {
                        all.map(a =>
                            <tr key={a._id}>
                                <th>{a.name}</th>
                                <td>{a.email}</td>
                                <td>{a.serviceName}</td>
                                <td className="col-md-2">{a.details}</td>
                                <td>
                                    <Dropdown options={options} onChange={(e) => { change(e, `${a._id}`) }} value={defaultOption} placeholder="Select an option" />
                                </td>
                            </tr>)
                    } */}
                </tbody>
            </table>
        </div>
    );
};

export default AllOrder;