import React from 'react'
import { Route, Navigate, redirect } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({children},{...rest}) => {
    let {user}=useContext(AuthContext)
    if (!user) {
      console.log("you don't have the right ") 
      return   <Navigate to="login"/>
    }
    
  
    return children;

  }
    


export default PrivateRoute
