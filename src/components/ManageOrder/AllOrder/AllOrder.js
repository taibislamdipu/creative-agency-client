import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const AllOrder = ({ allOrders }) => {

    console.log('allOrders props', allOrders);
    const { _id, name, email, serviceName, details, orderImg } = allOrders;

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
                const result = data.map(d => ({ ...d, status: 'pending' }))

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
                    alert('Status updated successfully')
                }
            })
    }

    const defaultOption = options[0];

    return (

        <div>
            <table className="table table-hover bg-white">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email ID</th>
                        <th scope="col">Service</th>
                        <th scope="col">Project Details</th>
                        <th scope="col">Image</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={_id}>
                        <th>{name}</th>
                        <td>{email}</td>
                        <td>{serviceName}</td>
                        <td>{details}</td>
                        <td>
                            {
                                allOrders.orderImg ? <img className="rounded-circle " style={{ height: '40px' }} src={`data:image/png;base64,${allOrders.orderImg.img}`} alt="" />
                                    :
                                    <img className="rounded-circle" style={{ height: '40px' }} src={`https://fierce-cliffs-21804.herokuapp.com/allOrders/${orderImg.img}`} alt="" />
                            }
                        </td>
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