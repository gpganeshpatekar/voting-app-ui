import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { doLoggedOut, getCurrentUserDetail, isLoggedIn } from '../auth';
import userContext from '../context/userContext';

const TopNavbar = () => {

    const userContextData = useContext(userContext);

    const navigate = useNavigate();

    const [logIn, setLogIn] = useState(false);
    const [user, setUser] = useState(undefined);

    console.log(user)


    useEffect(() => {


        setLogIn(isLoggedIn());
        setUser(getCurrentUserDetail());

    }, [logIn])


    const logout = () => {
        doLoggedOut(() => {
            setLogIn(false);
            userContextData.setUser({
                data: null,
                logIn: false
            })
            console.log("Logout successfully..");
        })
        setTimeout(() => {
            navigate('/');
        }, 1000)
    }

    return (
        <nav>
            <ul className=''>
                {
                    logIn ?
                        <>
                            <li>
                                <NavLink>
                                    {
                                        (user.roles[0].id === 5001) ?
                                            "ADMIN - " :
                                            "USER - "
                                    }
                                    {user.username}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/'} onClick={logout}>Logout</NavLink>
                            </li>
                        </>

                        :
                        <>
                            <li>
                                <NavLink to={'/'}>Login</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/register'}>Register</NavLink>
                            </li>
                        </>

                }
            </ul>
        </nav>
    )
}

export default TopNavbar