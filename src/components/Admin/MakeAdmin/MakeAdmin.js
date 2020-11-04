import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../App';
import Sidebar from '../../Dashboard/Sidebar/Sidebar';

const MakeAdmin = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const { name, email, photoURL } = loggedInUser;

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
                    alert('Email Added Successfully!!')
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
                        <form class="form-inline" onSubmit={handleSubmit(onSubmit)}>

                            <div class="form-group mx-sm-3 mb-2">
                                <input type="email" name="email" ref={register({ required: true })} class="form-control" id="" placeholder="jon@gamil.com" />
                            </div>
                            <button type="submit" class="btn btn-success mb-2">Submit</button>

                        </form>
                    </div>
                </div>




            </div>
        </div >
    );
};

export default MakeAdmin;