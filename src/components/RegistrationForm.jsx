import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PUBLIC_AXIOS } from '../services/axios-config';
import { DebounceInput } from 'react-debounce-input';

const RegistrationForm = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        phoneno: '',
    });

    const [isUserNameExist, setIsUserNameExist] = useState(false);
    const [isEmailExist, setIsEmailExist] = useState(false);
    const [isPhoneNumberExist, setIsPhoneNumberExist] = useState(false);
    const [preventReg, setPreventReg] = useState(true);


    const [isUserNameExistMsg, setIsUserNameExistMsg] = useState('');
    const [isEmailExistMsg, setIsEmailExistMsg] = useState('');
    const [isPhoneNumberExistMsg, setIsPhoneNumberExistMsg] = useState('');

    const [successMessage, setSuccessMessage] = useState('');

    const onChangeUsernameExist = async (event) => {
        const username = event.target.value;
        if (username.length === 0) {
            return;
        }
        const response = await PUBLIC_AXIOS.post(`/users/check-username/${username}`);
        const result = await response.data;
        console.log('Username Check API Response : ', result);
        setData({ ...data, username: event.target.value });
        if (response.data === false && username.length > 0) {
            setIsUserNameExistMsg("Username is already exist");
            setIsUserNameExist(false);
            setPreventReg(false)
        } else {
            setIsUserNameExistMsg("");
            setIsUserNameExist(true);
            setPreventReg(true)
        }
    }

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const onChangeEmailExist = async (event) => {
        const email = event.target.value;
        if (email.length === 0) {
            return;
        }
        const response = await PUBLIC_AXIOS.post(`/users/check-email/${email}`);
        const result = await response.data;
        console.log('Email Check API Response : ', result);
        setData({ ...data, email: event.target.value });
        if (response.data === false && email.length > 0) {
            setIsEmailExistMsg("Email is already exist");
            setIsEmailExist(false);
            setPreventReg(false)
        } else {
            setIsEmailExistMsg("");
            setIsEmailExist(true);
            setPreventReg(true)
        }
    }

    const onChangePhoneNumberExist = async (event) => {
        const phoneno = event.target.value;
        if (phoneno.length === 0) {
            return;
        }
        const response = await PUBLIC_AXIOS.post(`/users/check-phone/${phoneno}`);
        const result = await response.data;
        console.log('Phone Number Check API Response : ', result);
        setData({ ...data, phoneno: event.target.value });
        if (response.data === false && phoneno.length > 0) {
            setIsPhoneNumberExistMsg("Phone Number is already exist");
            setIsPhoneNumberExist(false);
            setPreventReg(false)
        } else {
            setIsPhoneNumberExistMsg("");
            setIsPhoneNumberExist(true);
            setPreventReg(true)
        }
    }

    const handleRegisterUser = async (event) => {
        event.preventDefault();

        try {
            console.log(isUserNameExist, isEmailExist, isPhoneNumberExist);
            if (isUserNameExist === true && isEmailExist === true && isPhoneNumberExist === true) {
                console.log(isUserNameExist, isEmailExist, isPhoneNumberExist);
                const response = await PUBLIC_AXIOS.post(`/users/register`, data);
                console.log("register : ", response);
            setData({
                username: '',
                email: '',
                password: '',
                phoneno: ''
            });
            setSuccessMessage('You have successfully registered.');
            } else {
                console.log("error")
            }

        } catch (error) {

        }

    }

    const redirectToLogin = () => {
        navigate('/');
    }


    return (
        <div className='reg-form'>
            <form onSubmit={handleRegisterUser}>
                <div>
                    <h2>REGISTER HERE</h2>
                </div>
                <div>
                    <h3 className='success'>{successMessage}</h3>
                </div>
                <div>
                    <DebounceInput
                        id='username'
                        name='username'
                        minLength={2}
                        type="text"
                        placeholder="USERNAME"
                        value={data.username}
                        debounceTimeout={1000}
                        onChange={onChangeUsernameExist}
                        required />
                </div>
                <span>{isUserNameExistMsg}</span>
                <div>
                    <input type='password' name='password' value={data.password} placeholder='PASSWORD' onChange={handleOnChange} />
                </div>
                <span></span>
                <div>
                    <DebounceInput
                        id='email'
                        name='email'
                        minLength={2}
                        type="email"
                        placeholder="EMAIL"
                        value={data.email}
                        debounceTimeout={1000}
                        onChange={onChangeEmailExist}
                        required />
                </div>
                <span>{isEmailExistMsg}</span>
                <div>
                    <DebounceInput
                        id='phoneno'
                        name='phoneno'
                        minLength={2}
                        type="text"
                        placeholder="PHONE NUMBER"
                        value={data.phoneno}
                        debounceTimeout={1000}
                        onChange={onChangePhoneNumberExist}
                        required />
                </div>
                <span>{isPhoneNumberExistMsg}</span>
                <div className='log-reg-btn'>
                    <button type='button' onClick={redirectToLogin}>LOGIN</button>
                    <button type='submit' disabled={preventReg === false}>REGISTER</button>
                </div>

            </form>
        </div>
    )
}

export default RegistrationForm