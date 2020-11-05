import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

import logo from '../../images/logos/logo.png';
import googleLogo from '../../images/icons/google-logo.png';

import './Login.css';
import firebaseConfig from './firebase.config';

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);



    const history = useHistory()
    const location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } }

    //Google sign-in provider
    var googleLoginProvider = new firebase.auth.GoogleAuthProvider();

    const handleGoogleLogin = () => {

        // Initialize Firebase
        // firebase.initializeApp(firebaseConfig);
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }

        //Authenticate with Firebase using the Google provider object.
        firebase.auth().signInWithPopup(googleLoginProvider).then(function (result) {
            const { displayName, email, photoURL } = result.user;
            const signedInUser = { name: displayName, email, photoURL }
            setLoggedInUser(signedInUser);
            // storeAuthToken();
            history.replace(from);

            
        }).catch(function (error) {
            // Handle Errors here.
            const errorMessage = error.message;
            console.log(errorMessage);
        });

        const storeAuthToken = () => {
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                .then(function (idToken) {
                    sessionStorage.setItem('token', idToken);
                    history.replace(from);
                }).catch(function (error) {
                    // Handle error
                });
        }
    }



    return (

        <div className="text-center">

            <div className="my-5">
                <a className="navbar-brand" href="/"><img src={logo} alt="" style={{ height: '50px' }} /></a>
            </div>

            <div className="login-form">
                <h3>Login with</h3>
                <button onClick={handleGoogleLogin} className="btn w-75 border my-3">
                    <img src={googleLogo} style={{ height: '30px' }} alt="" /> Continue with Google
                </button>
                <p>Don’t have an account? <a href="" onClick={handleGoogleLogin}>Create an account</a></p>
            </div>
            
        </div>
    );
};

export default Login;