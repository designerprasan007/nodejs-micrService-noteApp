import React from 'react'
import { Navigate } from "react-router-dom";
import {isLoggedIn} from './isLoggedin'


const PrivateRoute = ({Component, ...rest}) => {
  return (
    isLoggedIn() ? <Component /> : <Navigate to="/login" />
  )
}

export default PrivateRoute