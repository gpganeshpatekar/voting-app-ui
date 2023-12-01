import React, { useEffect} from 'react'
import Voting from '../components/Voting'
import BaseLayout from './BaseLayout'
import { getCurrentUserDetail, isLoggedIn } from '../auth'
import { useNavigate } from 'react-router-dom'

const VotingPage = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const user = getCurrentUserDetail();
 
     if (isLoggedIn && user?.roles[0]?.id === 5001) {
       navigate('/user/admin')
     } else {
       navigate('/')
     }
   }, [navigate])

  return (
    <>
      <BaseLayout>
      <Voting />
      </BaseLayout>
          
      </>
  )
}

export default VotingPage