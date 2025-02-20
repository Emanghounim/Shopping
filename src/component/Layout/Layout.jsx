import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../NAVBAR/Navbar";
import Footer from "../Footer/Footer";
import stylee from "./Layout.module.css";  

export default function Layout() {
  return (
    <div className={stylee.layoutContainer}>
      <Navbar />
      <main className={stylee.mainContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
