import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../App';
import Sidebar from '../../Dashboard/Sidebar/Sidebar';

const AddService = () => {

    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);

    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    }

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, email, photoURL } = loggedInUser;

    const [formSuccessMessage, setFormSuccessMessage] = useState(null);
    const [formErrorMessage, setFormErrorMessage] = useState(null);

    const onSubmit = (data) => {
        data.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', info.title);
        formData.append('description', info.description);

        console.log('service data', data);

        fetch('https://fierce-cliffs-21804.herokuapp.com/addService', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(success => {
                if (success) {
                    // alert('Service Added Successfully!')
                    setFormSuccessMessage('Service Added Successfully ✔️')
                    setFormErrorMessage(null);
                } else {
                    setFormErrorMessage('Service post failed ❌')
                    setFormSuccessMessage(null);
                }
            })
            .catch(err => console.log(err))
    }

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }

    return (
        <div className="container-fluid row">

            <div className="col-md-2">
                <Sidebar></Sidebar>
            </div>


            {/* <div style={{ height: '100vh', width: '80%', background: '#F4F7FC' }}> */}
            <div className="col-md-10" style={{ height: '100vh', background: '#F4F7FC' }}>

                {/* <div className="pt-5 ml-5 d-flex justify-content-between">
                    <h1>Add Service</h1>
                    <h3 className="mr-5">{name}</h3>
                </div> */}
                <div className="d-flex align-items-center dashboardHeaderBg p-5">
                    <h1 className="animate__animated animate__fadeInLeft">Add Service</h1>
                    <div class="ml-auto animate__animated animate__fadeInRight">
                        <div className="row align-items-center">
                            <h5>{name}</h5>
                            <img src={photoURL} alt="" className="mx-3 rounded-circle" width="60" />
                        </div>
                    </div>
                </div>

                <form onSubmit={onSubmit} className="customFormStyle" >
                    
                    <div className="bg-white p-5" style={{ width: '800px' }}>

                        <div className="form-group">
                            <div class="form-row">
                                <div class="col">
                                    <label htmlFor="">Service Title</label>
                                    <input onChange={handleBlur} type="text" name="title" className="form-control form-control-lg" maxlength="60" placeholder="Enter title (max 60 characters)" required />
                                </div>
                                <div class="col">
                                    <input onChange={handleFileChange} type="file" className="btn w-100 form-control-lg btnUploadFile form-control" required /> Upload Image
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Description</label>
                            <textarea onChange={handleBlur} type="text" name="description" className="form-control" maxlength="120" cols="30" rows="6" placeholder="Enter Description (max 120 characters)" required></textarea>
                        </div>

                        {/* <div className="row d-flex justify-content-end">
                            <button type="submit" class="btn btn-success" >Submit</button>
                        </div> */}
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

                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddService;