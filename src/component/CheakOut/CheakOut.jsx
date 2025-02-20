import React, { useContext } from "react";
import { useFormik } from "formik";
import { CartContext } from "../Context/CartContext";
import { data } from "autoprefixer";
import { useState } from "react";

export default function CheakOut() {
  let { CheakOut, cardId } = useContext(CartContext);
  const [isLodding, setisLodding] = useState(false);
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
  
      onSubmit: async (values) => {
        try {
          setisLodding(true); 
          let response = await CheakOut(cardId, "http://localhost:5173", values);
          window.location.href = response.session.url;
        } catch (error) {
          console.error("Checkout Error:", error);
        } finally {
          setisLodding(false);  
        }
      },
  
  });

  return (
    <>
      <h2 className="text-center m-4 fw-bolder text-warning">Checkout</h2>
      <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="col-md-6 bg-white p-4 shadow rounded">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Details</label>
              <input
                type="text"
                name="details"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
                className="form-control"
                placeholder="Enter your details"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="form-control"
                placeholder="Enter your phone"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                className="form-control"
                placeholder="Enter your city"
                required
              />
            </div>

            <div className="text-center">
              {" "}
              <button type="submit" className="btn btn-warning w-100  ">
                {isLodding ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                ) : (
                  "Checkout"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
