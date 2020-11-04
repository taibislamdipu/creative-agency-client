import React, { useContext, useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { UserContext } from '../../../App';

const AllOrder = () => {


    // const { _id, name, email, serviceName, details } = allOrders;
    // const newStatus = allOrders.status;

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, email, photoURL } = loggedInUser;

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
                const result = data.map(d => ({ ...d, status: 'pending' }))

                setAll(result);
            })
    }, [])

    const change = (e, id) => {
        fetch(`http://localhost:5000/update/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: e.value })
        })

            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Status updated successfully')
                }
            })
    }

    const defaultOption = options[0];

    return (

        <div className="container-fluid row">

            <div style={{ height: '100vh', background: '#F4F7FC' }} className="p-5">

                <div className="d-flex align-items-center dashboardHeaderBg p-5">
                    <h1>All Order list</h1>
                    <div class="ml-auto">
                        <div className="row align-items-center">
                            <h5>{name}</h5>
                            <img src={photoURL} alt="" className="mx-3 rounded-circle" width="60" />
                        </div>
                    </div>
                </div>


            <table className="table table-hover bg-white">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email ID</th>
                        <th scope="col">Service</th>
                        <th scope="col">Project Details</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                        {/* <tr key={_id}>
                        <th>{name}</th>
                        <td>{email}</td>
                        <td>{serviceName}</td>
                        <td className="col-md-2">{details}</td>
                        <td>
                            <Dropdown options={options} onChange={(e) => { change(e, `${_id}`) }} value={newStatus} />
                        </td>
                    </tr> */}

                        {
                        all.map(a =>
                            <tr key={a._id}>
                                <th>{a.name}</th>
                                <td>{a.email}</td>
                                <td>{a.serviceName}</td>
                                <td>{a.details}</td>

                                <td>
                                    <Dropdown options={options} onChange={(e) => { change(e, `${a._id}`) }} value={defaultOption} placeholder="Select an option" />
                                </td>
                            </tr>)
                        }
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default AllOrder;