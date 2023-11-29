import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PUBLIC_AXIOS } from '../services/axios-config';

const RegistrationForm = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        phoneno: '',
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleRegisterUser = async (event) => {
        event.preventDefault();

        try {

            const response = await PUBLIC_AXIOS.post(`/users/register`, data);
            console.log("register : ", response);
            setData({
                username: '',
                email: '',
                password: '',
                phoneno: ''
            });
            setSuccessMessage('You have successfully registered.');
        } catch (error) {

        }

    }

    const redirectToLogin = () => {
        navigate('/login');
    }


    return (
        <div className='reg-form'>
            <form onSubmit={handleRegisterUser}>
                <div>
                    <h2>REGISTER HERE</h2>
                </div>
                <div>
                    <input type='text' name='username' value={data.username} placeholder='USERNAME' onChange={handleOnChange} />
                </div>
                <div>
                    <input type='password' name='password' value={data.password} placeholder='PASSWORD' onChange={handleOnChange} />
                </div>
                <div>
                    <input type='email' name='email' value={data.email} placeholder='EMAIL ID' onChange={handleOnChange} />
                </div>
                <div>
                    <input type='text' name='phoneno' value={data.phoneno} placeholder='PHONE NO' onChange={handleOnChange} />
                </div>
                <div className='log-reg-btn'>
                    <button type='button' onClick={redirectToLogin}>LOGIN</button>
                    <button type='submit'>REGISTER</button>
                </div>
                <div>
                    <h3>{successMessage}</h3>
                </div>
            </form>
        </div>
    )
}

export default RegistrationForm