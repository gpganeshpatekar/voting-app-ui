import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import BaseLayout from './BaseLayout'
import { useNavigate } from 'react-router-dom'
import { getCurrentUserDetail, isLoggedIn } from '../auth'

const LoginPage = () => {

  const navigate = useNavigate();


  useEffect(() => {

   const user = getCurrentUserDetail();

    if (isLoggedIn && user?.roles[0]?.id === 5001) {
      navigate('/user/admin')
    } else if (isLoggedIn && user?.roles[0]?.id === 5002) {
      navigate('/user/voting')
    }
  },[navigate])

    return (<>
      <BaseLayout>
      <LoginForm />
      </BaseLayout>
    </>)
  }
  


export default LoginPage