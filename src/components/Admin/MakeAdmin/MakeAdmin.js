import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../App';
import Sidebar from '../../Dashboard/Sidebar/Sidebar';

const MakeAdmin = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, email, photoURL } = loggedInUser;

    const [formSuccessMessage, setFormSuccessMessage] = useState(null);
    const [formErrorMessage, setFormErrorMessage] = useState(null);

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {

        fetch('https://fierce-cliffs-21804.herokuapp.com/adminEmail', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(success => {
                if (success) {
                    // alert('Email Added Successfully!!')
                    setFormSuccessMessage('Email Added Successfully ✔️')
                    setFormErrorMessage(null);
                } else {
                    setFormErrorMessage('Email Adding Failed! ❌')
                    setFormSuccessMessage(null);
                }
            })
    }

    return (
        <div className="container-fluid row">

            <div className="col-md-2">
            <Sidebar></Sidebar>
            </div>

            <div className="col-md-10" style={{ height: '100vh', background: '#F4F7FC' }}>

                <div className="d-flex align-items-center dashboardHeaderBg p-5">
                    <h1 className="animate__animated animate__fadeInLeft">Add Admin</h1>
                    <div class="ml-auto animate__animated animate__fadeInRight">
                        <div className="row align-items-center">
                            <h5>{name}</h5>
                            <img src={photoURL} alt="" className="mx-3 rounded-circle" width="60" />
                        </div>
                    </div>
                </div>

                <div className="customFormStyle">
                    <div className="form-group bg-white p-5" style={{ width: '800px' }}>

                        <label htmlFor="">Email</label>
                        <p>{errors.email && <span className="text-danger">This field is required</span>}</p>
                        <form class="" onSubmit={handleSubmit(onSubmit)}>

                            <div class="form-group">
                                <input type="email" name="email" ref={register({ required: true })} class="form-control" id="" placeholder="jon@gamil.com" />
                            </div>

                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btnSubmit animate__animated animate__fadeInRight" >Submit</button>

                                <div>
                                    {
                                        formSuccessMessage && <p className="animate__animated animate__fadeInDown" style={{ color: 'green' }}>{formSuccessMessage}</p>
                                    }
                                    {
                                        formErrorMessage && <p className="animate__animated animate__fadeInDown" style={{ color: 'red' }}>{formErrorMessage}</p>
                                    }
                                </div>
                            </div>

                        </form>
                    </div>
                </div>




            </div>
        </div >
    );
};

export default MakeAdmin;