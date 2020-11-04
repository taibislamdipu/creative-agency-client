import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faSignOutAlt, faCommentDots, faPlus, faUserPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../App';
import logo from '../../../images/logos/logo.png';


const Sidebar = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);

    // useEffect(() => {
    //     fetch(`http://localhost:5000/admin?email=${loggedInUser.email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log('admin props', data);
    //             if (data) {
    //                 const newUser = { ...loggedInUser };
    //                 newUser.setUser = true;
    //                 setLoggedInUser(newUser)
    //             }
    //             else {
    //                 const newUser = { ...loggedInUser };
    //                 newUser.setUser = false;
    //                 setLoggedInUser(newUser)
    //             }
    //         })
    // }, [])

    useEffect(() => {
        fetch('http://localhost:5000/isAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsAdmin(data));
    }, [])


    return (


        <div className="sidebar d-flex flex-column justify-content-between " style={{ height: "100vh" }}>

            <ul className="list-unstyled">
                <a className="navbar-brand mt-5" href="/"><img src={logo} alt="" style={{ height: '50px' }} /></a>

                <div className="my-5">

                    <li>
                        <Link to="/orderForm" className="sideBarlink">
                            <FontAwesomeIcon icon={faShoppingCart} /> <span>Order</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/serviceList" className="sideBarlink">
                            <FontAwesomeIcon icon={faList} /> <span>Service List</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/postReview" className="sideBarlink">
                            <FontAwesomeIcon icon={faCommentDots} /> <span>Review</span>
                        </Link>
                    </li>

                </div>
                {isAdmin &&
                    <div>
                        <li>
                        <Link to="/admin" className="sideBarlink">
                                <FontAwesomeIcon icon={faList} /> <span>Order List</span>
                            </Link>
                        </li>
                        <li>
                        <Link to="/addService" className="sideBarlink">
                                <FontAwesomeIcon icon={faPlus} /> <span>Add Service</span>
                            </Link>
                        </li>
                        <li>
                        <Link to="/makeAdmin" className="sideBarlink">
                                <FontAwesomeIcon icon={faUserPlus} /> <span>Make Admin</span>
                            </Link>
                        </li>
                    </div>
                }

            </ul>
            <div className="text-center my-5">
                <Link to="/" className="text-dark"><FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span></Link>
            </div>
        </div>

    );
};

export default Sidebar;