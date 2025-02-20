import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { ContextProvider } from "../Context/Context";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  let navigate = useNavigate();
  const { loginContexT, setloginContexT } = useContext(ContextProvider);
  const { numberItemCard } = useContext(CartContext);
  
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

  return (
    <nav className={`navbar navbar-expand-lg bg-secondary ${isScrolled ? "fixed-top shadow-lg" : ""}`}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center text-dark fw-bold text-warning" to="">
          <FaShoppingCart className="me-2" size={28} /> SHOPPING
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          {loginContexT !== null ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold mx-3" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold mx-3" to="/product">Product</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold mx-3 position-relative" to="/cart">
                  Cart
                  <span className="position-absolute top-4 start-100 translate-middle badge rounded-pill bg-warning">
                    {numberItemCard}
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold mx-3" to="/categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold mx-3" to="/wishes">Wishes</Link>
              </li>
            </ul>
          ) : null}
        </div>

        {loginContexT != null ? (
          <>
            <div>
              <Link className="nav-link fw-bolder me-3" to="/signin">Register</Link>
            </div>
            <div>
              <Link className="nav-link fw-bolder me-3" to="/login">Login</Link>
            </div>
          </>
        ) : (
          <div>
            <Link onClick={signOut} className="nav-link fw-bolder me-3" to="/login">LogOut</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
