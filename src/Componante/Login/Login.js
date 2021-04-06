import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import FacebookIcon from '@material-ui/icons/Facebook';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [user, setUser] = useState({
        error: '',
        success: false
    });
    const [newUser, setNewUser] = useState(true);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" }}

    // google signIn
    var provider = new firebase.auth.GoogleAuthProvider();
    const handleSignIn = () => {
        firebase.auth()
        .signInWithPopup(provider)
        .then(res => {
            setUser(res.user)
            setLoggedInUser(res.user)
           history.replace(from)
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorCode, errorMessage, email, credential)
        });
    }

    return (
        <div className="Login-area">
            <div className="login-form mt-5">
                { newUser ? <h3>Login</h3> : <h3>Create an account</h3> }
                <form>        
                    {
                       newUser ?
                        <> 
                            <input type="email" name="email" placeholder="Email" required/>
                            <input type="password" name="password" placeholder="Password" required/>
                            <input className="text-white mb-2" type="submit" value="Login"/>
                            <span>Dont have an account?</span>
                            <Link onClick={() => setNewUser(!newUser)}>Create an account</Link>
                        </>
                        :
                        <>
                            <input name="name" type="text" placeholder="Name" required/>             
                            <input name="email" type="email" placeholder="UserName or Email" required/>
                            <input name="password" type="password" placeholder="Password" required/>
                            <input className="text-white" type="submit" value="Create an acccount"/>
                            <span>Already have an account?</span>
                            <Link onClick={() => setNewUser(!newUser)}>login</Link>
                        </>
                    }
                </form>
                <p className="text-danger">{user.error}</p>
                {
                    user.success && <p className="text-success">User created successfully</p>
                }
                {
                    user.success && <p>User sign in successfully</p>
                }
            </div>
            <div className="social-login text-center">
                <span>Or</span>
                <button className="mb-2"><FacebookIcon></FacebookIcon> Continue with Facebook</button>
                <button onClick={handleSignIn}> Continue with Google</button>
            </div>
        </div>
    );
};

export default Login;