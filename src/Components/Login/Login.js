import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import firebaseConfig from './firebase.config';
import './Login.css';
import Google from '../../image/Google.png';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    })
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, photoURL, email } = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setLoggedInUser(signedInUser);
                setUser(signedInUser);
                history.replace(from);

            })
            .catch(error => {
            })
    }


    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 4;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (event.target.name === 'confirmPassword') {
            const isPasswordValid = event.target.value.length > 4;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    newUserInfo.isSignedIn = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        event.preventDefault();
    }
    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
        }).catch(function (error) {
        });
    }
    return (
        <div className='login-style'>
            {
                newUser ? <h1>Create new account</h1> : <h1>Login</h1>
            }
            <form className="login-form" onSubmit={handleSubmit}>
                <input type="text" name="name" onBlur={handleBlur} placeholder="Enter user name" required />
                <br />
                {
                    newUser && <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your email address" required />
                }
                <br />
                <input type="password" name="password" onBlur={handleBlur} id="" placeholder="password" required />
                {
                    newUser && <input type="password" name="confirmPassword" onBlur={handleBlur} id="" placeholder="Confirm password" required />
                }
                <input type="submit" className="btn btn-warning" value={newUser ? "Create new account" : "Login"} />
            </form>
            {
                newUser ? <label htmlFor="newUser"><small>Already have an account?</small></label> : <label htmlFor="newUser"><small>Don't have an account?</small></label>
            }
            <input type="checkbox" onClick={() => setNewUser(!newUser)} name="newUser" id="" />
            {
                newUser ? <label htmlFor="newUser"><small className="error">Login</small></label> : <label htmlFor="newUser"><small className="error">Create new account</small></label>
            }
            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged in'} successfully</p>
            }
            <button className="GoogleSignInBtn" onClick={handleGoogleSignIn}> <img style={{width: '25px'}} src={Google}/> Continue with Google</button>
        </div>
    );
};

export default Login;