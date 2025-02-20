import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5  mt-3">
      <div className="container">
        <div className="row">
 {/* اول سكشن */}
 
           <div className="col-md-3">
            <h5 className="text-warning">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link className="text-light text-decoration-none" to="/">🏠 Home</Link></li>
              <li><Link className="text-light text-decoration-none" to="/product">🛍️ Products</Link></li>
              <li><Link className="text-light text-decoration-none" to="/allBrand">🏷️ Brands</Link></li>
              <li><Link className="text-light text-decoration-none" to="/wishes">❤️ Wishlist</Link></li>
              <li><Link className="text-light text-decoration-none" to="/cart">🛒 Cart</Link></li>
            </ul>
          </div>

          {/* تاني سكشن     */}
          <div className="col-md-3">
            <h5 className="text-warning">📞 Contact Us</h5>
            <ul className="list-unstyled">
              <li><FaEnvelope className="me-2" /> support@shop.com</li>
              <li><FaPhone className="me-2" /> 01010101010</li>
              <li><FaMapMarkerAlt className="me-2" /> 10th of Ramdan, Egypt</li>
            </ul>
          </div>

          {/* تالت سكشن */}
          <div className="col-md-3">
            <h5 className="text-warning">Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-4"><FaFacebook /></a>
              <a href="#" className="text-light fs-4"><FaInstagram /></a>
              <a href="#" className="text-light fs-4"><FaTwitter /></a>
              <a href="#" className="text-light fs-4"><FaYoutube /></a>
            </div>
          </div>

          {/* رابع سكشن */}
          <div className="col-md-3 text-center">
            <h5 className="text-warning">💡 About Us</h5>
            <p className="small">We offer the best products at the best prices with a smooth shopping experience.</p>
          </div>
        </div>
      </div>

      {/* Copyright   */}
      <div className="text-center bg-warning p-1 mt-3">
        <small>© {new Date().getFullYear()} SHOPPING. All rights reserved.</small>
      </div>
    </footer>
  );
}
