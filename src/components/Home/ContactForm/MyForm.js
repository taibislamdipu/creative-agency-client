// Customize this 'myform.js' script and add it to your JS bundle.
// Then import it with 'import MyForm from "./myform.js"'.
// Finally, add a <MyForm/> element whereever you wish to display the form.

import React from "react";

export default class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            status: ""
        };
    }

    render() {
        const { status } = this.state;
        return (
            <form
                onSubmit={this.submitForm}
                action="https://formspree.io/f/mzbkgype"
                method="POST"
            >
                {/* <!-- add your custom form HTML here --> */}
                <div class="form-group">
                    <input type="text" name="email" id="email" className="form-control" placeholder="Your email address " required />
                </div>

                <div class="form-group">
                    <input type="text" name="name" id="name" className="form-control" placeholder="Your name / company's name" required />
                </div>

                <div class="form-group">
                    <textarea type="text" name="message" className="form-control" id="text" cols="30" rows="10" placeholder="Your message" required></textarea>
                </div>

                {status === "SUCCESS" ? <h4 style={{ color: "green" }}>Thanks!</h4> : <button className="btn btn-dark" type="submit">Submit</button>}
                {status === "ERROR" && <h4 style={{ color: "red" }}>Ooops! There was an error.</h4>}
            </form>


        );
    }

    submitForm(ev) {
        ev.preventDefault();
        const form = ev.target;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                form.reset();
                this.setState({ status: "SUCCESS" });
            } else {
                this.setState({ status: "ERROR" });
            }
        };
        xhr.send(data);
    }
}