import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '.'

const PrivateRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />
}

export default PrivateRoute