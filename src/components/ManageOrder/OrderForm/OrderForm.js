import React, { useContext, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../../Dashboard/Sidebar/Sidebar';

const OrderForm = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { name, email, photoURL } = loggedInUser;

    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);

    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    }

    const onSubmit = data => {
        data.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', loggedInUser.name || info.name);
        formData.append('email', loggedInUser.email || info.email);
        formData.append('serviceName', info.serviceName);
        formData.append('details', info.details);
        formData.append('price', info.price);
        formData.append('status', 'pending');

        // console.log('user data', data);

        // insert order info to database
        fetch('https://fierce-cliffs-21804.herokuapp.com/addOrder', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(success => {
                if (success) {
                    alert('Order has been send successfully.');
                }
            })
            .catch(err => console.log(err));
    }

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
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
            <div className="col-md-10" style={{ background: '#F4F7FC' }}>

                {/* <div className="pt-5 ml-5 d-flex justify-content-between">
                    <h1 >Order</h1>
                    <h3 className="mr-5">{name}</h3>
                </div> */}
                {/* <div className="d-flex align-items-center p-4">
                    <h1 style={{ fontSize: 50 }}>Order</h1>
                    <div class="ml-auto">
                        <div className="row align-items-center">
                            <h5>Taib Islam Dipu</h5>
                            <img src="" alt="" className="mx-3 rounded-circle" width="60" />
                        </div>
                    </div>
                </div>
                <hr /> */}

                <div className="d-flex align-items-center dashboardHeaderBg p-5">
                    <h1 className="animate__animated animate__fadeInLeft">Order</h1>
                    <div class="ml-auto">
                        <div className="row align-items-center animate__animated animate__fadeInRight">
                            <h5>{name}</h5>
                            <img src={photoURL} alt="" className="mx-3 rounded-circle" width="60" />
                        </div>
                    </div>
                </div>


                <form onSubmit={onSubmit} className="customFormStyle " >

                    <div className="form-group animate__animated animate__slideInRight">
                        <input type="text" onBlur={handleBlur} name="name" className="form-control form-control-lg" /* value={name} */ placeholder="Your name / company’s name" required />
                    </div>

                    <div className="form-group animate__animated animate__slideInRight">
                        <input type="email" onBlur={handleBlur} name="email" className="form-control form-control-lg" /* value={email} */ placeholder="Your email address" required />
                    </div>

                    <div className="form-group animate__animated animate__slideInRight">
                        <input type="text" onBlur={handleBlur} name="serviceName" className="form-control form-control-lg" maxlength="20" placeholder="Graphic Design" required />

                    </div>

                    <div className="form-group animate__animated animate__slideInRight">
                        <textarea type="text" onBlur={handleBlur} name="details" className="form-control" cols="30" rows="6" maxlength="120" placeholder="Project Details" required></textarea>
                    </div>

                    <div className="form-group animate__animated animate__slideInRight">
                        <div class="form-row">
                            <div class="col">
                                <input type="number" min="10" step="1" oninput="validity.valid||(value='');" onBlur={handleBlur} name="price" className="form-control form-control-lg" placeholder="Price" required />
                            </div>
                            <div class="form-row mt-3">
                                <input onChange={handleFileChange} type="file" className="btn w-100 form-control-lg btnUploadFile form-control" /> Upload project file
                                <span className="text-secondary">*Optional</span>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btnSubmit animate__animated animate__fadeInRight" >Submit</button>

                </form>
            </div>
        </div>






    );
};

export default OrderForm;