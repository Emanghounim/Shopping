import React from 'react'
import stylee from'./protectedRoute.module.css'
import { Navigate } from 'react-router-dom'

 

export default function ProtectedRoute (props) {
   return  <>
  
  {    localStorage.getItem("useTokken")?props.children:<Navigate to={"/login"}/>
  }
  
  </>
 
}