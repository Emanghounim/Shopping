import React from 'react'

import stylee from'./Layout.module.css'
import { Outlet } from 'react-router-dom'
 import Navbar from '../NAVBAR/Navbar'
import Footer from '../Footer/Footer'
export default function Layout () {
  return <>
   <Navbar/>
   <div className="content">
 <Outlet/>  </div>
<Footer/>


 
    



  </>
}

 