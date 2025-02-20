import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ContextProvider } from "../Context/Context";
 
export default function SignIn() {
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
   const {loginContexT, setloginContexT}=useContext(ContextProvider)
  let navigate = useNavigate();

  async function handleLogin(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      setIsLoading(false);

      if (data.message === "success") {
        setloginContexT(data.token);
        localStorage.setItem("useTokken", loginContexT);
      }
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      setIsError(error.response?.data?.message || "An error occurred");
    }
  }

  let validationSchema = yup.object().shape({
   
    email: yup.string().email("Invalid email").required("Email is required"),
    
    password: yup
      .string()
      .matches(/^[A-Za-z0-9]{6,7}$/, "Password must be 6-7 characters long")
      .required("Password is required"),
    
  });

  let formik = useFormik({
    initialValues: {
    
      email: "",
      password: "",
      },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="d-flex justify-content-center align-items-center bg-light">
      <div className="card p-1 mt-5 shadow-lg" style={{ width: "550px" }}>
        {isError && (
          <div className="alert alert-danger text-center" role="alert">
            {isError}
          </div>
        )}
        <h2 className="text-center mb-4 fw-bolder text-warning">Login</h2>
        <form onSubmit={formik.handleSubmit}>
 

  <div className="mb-3 p-3">
    <label className="form-label">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      value={formik.values.email}
      className="form-control"
      placeholder="Enter your Email"
      required
    />
    {formik.touched.email && formik.errors.email && (
      <div className="text-danger">{formik.errors.email}</div>
    )}
  </div>
 

  <div className="mb-3 p-3">
    <label className="form-label">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      value={formik.values.password}
      className="form-control"
      placeholder="Enter your Password"
      required
    />
    {formik.touched.password && formik.errors.password && (
      <div className="text-danger">{formik.errors.password}</div>
    )}
  </div>
 

  <div className="text-center">
    <button type="submit" className="btn btn-outline-warning w-50 p-1" disabled={isLoading}>
      {isLoading ? <span className="spinner-border spinner-border-sm" role="status"></span> : "Login"}
    </button>
  </div>
</form>


        <p className="text-center text-muted mt-3">
       Do Not have an account?{" "}
          <Link to="/signin" className="text-warning">
          Register

          </Link>
        </p>
      </div>
    </div>
  );
}
