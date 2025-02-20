import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ContextProvider } from "../Context/Context";

export default function SignIn() {
  const { loginContext, setLoginContext } = useContext(ContextProvider);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  async function handleRegister(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      setIsLoading(false);

      if (data.message === "success" && data.token) {
        setLoginContext(data.token);
        localStorage.setItem("useTokken", data.token);
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(error.response?.data?.message || "An error occurred");
    }
  }

  let validationSchema = yup.object().shape({
    name: yup.string().max(6, "Max characters is 6").min(3, "Min characters is 3").required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().matches(/^01[1250][0-9]{8}$/, "Invalid phone number").required("Phone is required"),
    password: yup.string().matches(/^[A-Za-z0-9]{6,7}$/, "Password must be 6-7 characters long").required("Password is required"),
    rePassword: yup.string().oneOf([yup.ref("password")], "Passwords do not match").required("Re-entering password is required"),
  });

  let formik = useFormik({
    initialValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="d-flex justify-content-center align-items-center bg-light">
      <div className="card p-1 mt-5 shadow-lg" style={{ width: "550px" }}>
        {isError && <div className="alert alert-danger text-center" role="alert">{isError}</div>}
        <h2 className="text-center mb-4 fw-bolder text-warning">Register</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3 p-3">
            <label className="form-label">Name</label>
            <input type="text" id="name" name="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className="form-control" placeholder="Enter your Name" required />
            {formik.touched.name && formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
          </div>

          <div className="mb-3 p-3">
            <label className="form-label">Email</label>
            <input type="email" id="email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className="form-control" placeholder="Enter your Email" required />
            {formik.touched.email && formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
          </div>

          <div className="mb-3 p-3">
            <label className="form-label">Phone</label>
            <input type="tel" id="phone" name="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className="form-control" placeholder="Enter your Phone" required />
            {formik.touched.phone && formik.errors.phone && <div className="text-danger">{formik.errors.phone}</div>}
          </div>

          <div className="mb-3 p-3">
            <label className="form-label">Password</label>
            <input type="password" id="password" name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className="form-control" placeholder="Enter your Password" required />
            {formik.touched.password && formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}
          </div>

          <div className="mb-3 p-3">
            <label className="form-label">RePassword</label>
            <input type="password" id="rePassword" name="rePassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className="form-control" placeholder="Re-enter your Password" required />
            {formik.touched.rePassword && formik.errors.rePassword && <div className="text-danger">{formik.errors.rePassword}</div>}
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-outline-warning w-50 p-1" disabled={isLoading}>
              {isLoading ? <span className="spinner-border spinner-border-sm" role="status"></span> : "Register"}
            </button>
          </div>
        </form>
        <p className="text-center text-muted mt-3">Already have an account? <Link to="/login" className="text-warning">Signin</Link></p>
      </div>
    </div>
  );
}
