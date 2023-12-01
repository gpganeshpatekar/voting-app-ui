import React, { useEffect } from 'react'
import VotingResult from '../components/VotingResult'
import BaseLayout from './BaseLayout'
import { useNavigate } from 'react-router-dom';
import { getCurrentUserDetail, isLoggedIn } from '../auth';

const AdminHomePage = () => {
  const navigate = useNavigate();
    
  useEffect(() => {

   const user = getCurrentUserDetail();

    if (isLoggedIn && user?.roles[0]?.id === 5002) {
      navigate('/user/voting')
    }
    
  }, [navigate])
  return (
      <>
      <BaseLayout>
        <VotingResult />
        </BaseLayout>
      </>
  )
}

export default AdminHomePage