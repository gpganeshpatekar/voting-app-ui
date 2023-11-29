import React, { useContext, useState } from 'react'
import userContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { logInUser } from '../services/user-service';
import { doLoggedIn } from '../auth';

const LoginForm = () => {

    const userContextData = useContext(userContext);

    const [logInError, setLogInError] = useState('');
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    // const handleOnChange = (event, field) => {
    //     let actualValue = event.target.value;
    //     setCredentials({
    //         ...credentials,
    //         [field]: actualValue,
    //     });
    // };

    const handleOnChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }
    const handleLogInForm = (event) => {
        event.preventDefault();

        if (credentials.username.trim() === "" || credentials.password.trim() === "") {
            setLogInError("Credentials can not be empty.")
            return
        }
        logInUser(credentials).then(response => {

            doLoggedIn(response, () => {
                console.log("response has been saved to session storage");
                userContextData.setUser({
                    data: response.user,
                    logIn: true,
                });
                console.log("Login Form ", response);
                if (response.user.roles[0].id === 5001) {
                    navigate("/user/admin")
                } else {
                    navigate("/user/voting")
                }
            });
        }).catch((error) => {

            if (error) {
                setLogInError(error.response.data.message)
            }
        });
    }

    const redirectToRegisterUser = () => {
        navigate('/');
    }
    return (
        <div className='reg-form'>
            <form onSubmit={handleLogInForm}>
                <div>
                    <h2>LOGIN HERE</h2>
                </div>
                <div>
                    <input type='text' name='username' value={credentials.username} placeholder='USERNAME' onChange={handleOnChange} required />
                </div>
                <div>
                    <input type='password' name='password' value={credentials.password} placeholder='PASSWORD' onChange={handleOnChange} required />
                </div>
                <div className='log-reg-btn'>
                    <button type='submit'>LOGIN</button>&nbsp;
                    <button onClick={redirectToRegisterUser}>REGISTER</button>
                </div>
                <div>
                    <h3>{logInError}</h3>
                </div>
            </form>
        </div>
    )
}

export default LoginForm