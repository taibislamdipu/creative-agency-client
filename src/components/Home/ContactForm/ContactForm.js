import React from 'react';
import mainHeaderImg from '../../../images/mainHeaderImg.png';
import MyForm from './MyForm';

const ContactForm = () => {

    function comingSoon() {
        alert('This feature is Coming Soon!!')
    }

    return (
        <main style={{ height: '700px', background: '#FBD062' }} className="row p-2" id="contactUs">
            <div className="col-md-4 offset-md-1 mt-5">
                <h1>Let us handle your <br /> project, professionally.</h1>
                <p className="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta consectetur voluptate at autem. Dolorem recusandae architecto nam provident! Repellendus inventore ipsa minima amet perferendis rerum dolor quis.</p>
            </div>
            <div className="col-md-6 mt-5">
                <MyForm></MyForm>
            </div>

        </main>
    );
};

export default ContactForm;