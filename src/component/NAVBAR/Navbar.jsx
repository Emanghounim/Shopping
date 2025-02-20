import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { ContextProvider } from "../Context/Context";
import { CartContext } from "../Context/CartContext";
import stylee from "./Navbar.module.css";
export default function Navbar() {
  let navigate = useNavigate();
  const { loginContexT, setloginContexT } = useContext(ContextProvider);
  const { numberItemCard } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function signOut() {
    localStorage.removeItem("useTokken");
    setloginContexT(null);
    navigate("/login");
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg bg-secondary ${isScrolled ? "fixed-top shadow-lg" : ""}`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center text-dark fw-bold text-warning" to="">
          <FaShoppingCart className="me-2" size={28} /> SHOPPING
        </Link>

         <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>

         <div className={`collapse navbar-collapse justify-content-center ${menuOpen ? "show" : ""}`} id="navbarNav">
          {loginContexT !== null ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold mx-3" to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold mx-3" to="/product" onClick={() => setMenuOpen(false)}>
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold mx-3 position-relative" to="/cart" onClick={() => setMenuOpen(false)}>
                  Cart
               {numberItemCard?<span className="position-absolute top-4 start-100 translate-middle badge rounded-pill bg-warning">
                    {numberItemCard}
                  </span>:null}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold mx-3" to="/categories" onClick={() => setMenuOpen(false)}>
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold mx-3" to="/wishes" onClick={() => setMenuOpen(false)}>
                  Wishes
                </Link>
              </li>

               <li className="nav-item d-lg-none">
                <Link onClick={() => { signOut(); setMenuOpen(false); }} className="nav-link fw-bolder text-warning mx-3" to="/login">
                  LogOut
                </Link>
              </li>
            </ul>
          ) : null}
        </div>

        {loginContexT != null ? (
          <>
            <div>
              <Link className="nav-link fw-bolder me-3" to="/signin" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </div>
            <div>
              <Link className="nav-link fw-bolder me-3" to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </div>
          </>
        ) : (
           <Link onClick={signOut} className="nav-link fw-bolder me-3 d-none d-lg-block text-warning" to="/login">
            LogOut
          </Link>
        )}
      </div>
    </nav>
  );
}
 
 
