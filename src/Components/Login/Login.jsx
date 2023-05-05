import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery'

export default function Login({ decodeUser }) {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function loginUser(obj) {
    // console.log(obj);
    setLoading(true);
    try {
      let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin", obj);
      // console.log(data);
      if (data.message == 'success') {
        localStorage.setItem('token', data.token);
        setLoading(false);
        $(".successMsg").fadeIn(2000, function () {
          navigate('/home', { replace: true });
          decodeUser();
        })
      }
    } catch (error) {
      setLoading(false);
      // console.log(error);
      $(".errorMsg").fadeIn(1000, function () {
        setTimeout(() => {
          $(".errorMsg").fadeOut(1000)
        }, 3000);
      })
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: function (values) {
      let newUser = {
        email: values.email,
        password: values.password,
      }
      loginUser(newUser);
    },
    validate: function (values) {
      let errors = {};
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
        errors.email = "Enter a valid Email 'example@example.domain'";
      }
      return errors;
    }
  })

  return <>
    <div className="container p-5 customMargin">
      <div className="row">
        <div className="col-12"><div style={{ 'display': 'none' }} className="alert alert-danger text-center errorMsg">Incorrect email or password</div></div>
        <div className="col-12"><div style={{ 'display': 'none' }} className="alert alert-success text-center successMsg">Success</div></div>
        <div className="col-6 p-0">
          <div className="loginImage h-100">
            <img src={require("../../Images/gaming.jpg")} alt="Gaming" className='w-100 h-100' />
          </div>
        </div>
        <div className="col-6 p-0 formBG">
          <div className="image text-center mt-4"><img src={require('../../Images/logo.png')} alt="gaming logo" className='w-25' /></div>
          <h2 className='text-center mb-2'>Log in to GameOver!</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="row p-4">
              <div className="col-12 mb-3"><input onBlur={formik.handleBlur} onChange={formik.handleChange} id='email' value={formik.values.email} className="form-control" type="email" placeholder='Email Address' />{formik.errors.email && formik.touched.email ? <div className="alert alert-danger text-center">{formik.errors.email}</div> : ''}</div>
              <div className="col-12 mb-3"><input onBlur={formik.handleBlur} onChange={formik.handleChange} id='password' value={formik.values.password} className="form-control" type="password" placeholder='Password' />{formik.errors.password && formik.touched.password ? <div className="alert alert-danger text-center">{formik.errors.password}</div> : ''}</div>
              <div className="col-12 mb-2"><button type="submit" disabled={loading || !(formik.isValid && formik.dirty)} className="btn btn-primary w-100 text-white p-2">{loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login"}</button></div>
              <div className="col-12"><hr /></div>
              <div className="col-12"><p className='login text-center'>Not a member yet? <Link className='text-decoration-none' to={"/register"}>Create Account <i className="fa-solid fa-chevron-right"></i></Link></p></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
}
