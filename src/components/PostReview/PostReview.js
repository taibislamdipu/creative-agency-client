import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import Sidebar from '../Dashboard/Sidebar/Sidebar';

const PostReview = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, email, photoURL } = loggedInUser;

    const [formSuccessMessage, setFormSuccessMessage] = useState(null);
    const [formErrorMessage, setFormErrorMessage] = useState(null);

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            name: name
        }
    });

    const onSubmit = data => {
        // sending user gmail profile image to database as userPhoto
        data.userPhoto = photoURL;
        
        // console.log('gmail data', data);

        // insert review into database
        fetch('https://fierce-cliffs-21804.herokuapp.com/addReview', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(success => {
                if (success) {
                    // alert('Review post successfully.')
                    setFormSuccessMessage('Review post successfully ✔️')
                    setFormErrorMessage(null);
                    document.getElementById('myform').reset(); //reset form data
                } else {
                    setFormErrorMessage('Review post failed ❌')
                    setFormSuccessMessage(null);
                }
            })
            .catch(err => console.log(err))

    }

    const containerStyle = {
        height: "100%",
    }



    return (
        <div className="container-fluid row" style={containerStyle}>

            <div className="col-md-2">
            <Sidebar></Sidebar>
            </div>


            {/* <div style={{ height: '100vh', width: '80%', background: '#F4F7FC' }}> */}
            <div className="col-md-10" style={{ height: '100vh', background: '#F4F7FC' }}>


                {/* <div className="pt-5 ml-5 d-flex justify-content-between">
                    <h1 >Review</h1>
                    <h3 className="mr-5">{name}</h3>
                </div> */}

                <div className="d-flex align-items-center dashboardHeaderBg p-5">
                    <h1 className="animate__animated animate__fadeInLeft">Review</h1>
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

                <form className="customFormStyle mb-5" onSubmit={handleSubmit(onSubmit)} id="myform">

                    <div className="form-group animate__animated animate__fadeInRight">
                        <input type="text" ref={register({ required: true })} name="name" className="form-control form-control-lg" maxlength="20" placeholder="Your name" /* value={name} */ />
                        {errors.name && <span className="text-danger">This field is required</span>}
                    </div>

                    <div className="form-group animate__animated animate__fadeInRight">
                        <input type="text" ref={register({ required: true })} name="company" className="form-control form-control-lg" maxlength="25" placeholder="Company’s name, Designation" />
                        {errors.company && <span className="text-danger">This field is required</span>}
                    </div>

                    <div className="form-group animate__animated animate__fadeInRight">
                        <textarea type="text" ref={register({ required: true })} name="description" className="form-control" cols="30" rows="6" maxlength="100" placeholder="Description(max 100words)"></textarea>
                        {errors.description && <span className="text-danger">This field is required</span>}

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

    );
};

export default PostReview;