import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery'

export default function Register({ decodeUser }) {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function registerNewUser(obj) {
    setLoading(true);
    // console.log(obj);
    try {
      let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup", obj);
      // console.log(data);
      if (data.message == 'success') {
        localStorage.setItem('token', data.token);
        setLoading(false);
        $(".successMsg").fadeIn(2000, function () {
          navigate('/home');
          decodeUser();
        })
      }
    } catch (error) {
      setLoading(false);
      $(".errorMsg").fadeIn(1000, function () {
        setTimeout(() => {
          $(".errorMsg").fadeOut(1000)
        }, 3000);
      })
    }
  }

  let formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    onSubmit: function (values) {
      let newUser = {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password,
        rePassword: values.rePassword,
        phone: values.phone
      }
      // console.log(newUser);
      registerNewUser(newUser);
    },
    validate: function (values) {
      let errors = {};
      if (!/^[a-zA-Z ]{2,}$/.test(values.firstName)) {
        errors.firstName = 'Name must be 2 characters and more!';
      }
      if (!/^[a-zA-Z ]{2,}$/.test(values.lastName)) {
        errors.lastName = 'Name must be 2 characters and more!';
      }
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
        errors.email = "Enter a valid Email 'example@example.domain'";
      }
      if (!/^(\+\d{1,3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,6}$/.test(values.phone)) {
        errors.phone = "Enter Valid Phone Number";
      }
      if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(values.password)) {
        errors.password = "Enter a valid password 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'"
      }
      if (values.password != values.rePassword) {
        errors.rePassword = "Password doesn't match!"
      }
      return errors;
    }
  })

  return <>
    <div className="container p-5 customMargin">
      <div className="row">
        <div className="col-12"><div style={{ 'display': 'none' }} className="alert alert-danger text-center errorMsg">Email Already Exists</div></div>
        <div className="col-12"><div style={{ 'display': 'none' }} className="alert alert-success text-center successMsg">Success</div></div>
        <div className="col-6 p-0">
          <div className="loginImage h-100">
            <img src={require("../../Images/gaming.jpg")} alt="Gaming" className='w-100 h-100' />
          </div>
        </div>
        <div className="col-6 p-0 formBG">
          <h2 className='text-center mt-4 mb-2'>Create My Account!</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="row p-4">
              <div className="col-6 mb-3"><input onBlur={formik.handleBlur} onChange={formik.handleChange} id='firstName' value={formik.values.firstName} className="form-control" type="text" placeholder='First Name' />{formik.errors.firstName && formik.touched.firstName ? <div className="alert alert-danger text-center">{formik.errors.firstName}</div> : ''}</div>
              <div className="col-6 mb-3"><input onBlur={formik.handleBlur} onChange={formik.handleChange} id='lastName' value={formik.values.lastName} className="form-control" type="text" placeholder='Last Name' />{formik.errors.lastName && formik.touched.lastName ? <div className="alert alert-danger text-center">{formik.errors.lastName}</div> : ''}</div>
              <div className="col-12 mb-3"><input onBlur={formik.handleBlur} onChange={formik.handleChange} id='email' value={formik.values.email} className="form-control" type="email" placeholder='Email Address' />{formik.errors.email && formik.touched.email ? <div className="alert alert-danger text-center">{formik.errors.email}</div> : ''}</div>
              <div className="col-12 mb-3"><input onBlur={formik.handleBlur} onChange={formik.handleChange} id='phone' value={formik.values.phone} className="form-control" type="number" placeholder='Phone Number' />{formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger text-center">{formik.errors.phone}</div> : ''}</div>
              <div className="col-12 mb-3"><input onBlur={formik.handleBlur} onChange={formik.handleChange} id='password' value={formik.values.password} className="form-control" type="password" placeholder='Password' />{formik.errors.password && formik.touched.password ? <div className="alert alert-danger text-center">{formik.errors.password}</div> : ''}</div>
              <div className="col-12 mb-3"><input onBlur={formik.handleBlur} onChange={formik.handleChange} id='rePassword' value={formik.values.rePassword} className="form-control" type="password" placeholder='Confirm Password' />{formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger text-center">{formik.errors.rePassword}</div> : ''}</div>
              <div className="col-12 mb-3"><button type="submit" disabled={loading || !(formik.isValid && formik.dirty)} className="btn btn-primary w-100 text-white p-2">{loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login"}</button></div>
              <div className="col-12">
                <p className='terms mb-2'>This site is protected by reCAPTCHA and the Google <a target="_blank" href="https://policies.google.com/privacy">Privacy Policy</a> and <a target="_blank" href="https://policies.google.com/terms">Terms of Service</a> apply.</p>
              </div>
              <div className="col-12"></div>
              <div className="col-12"><hr /></div>
              <div className="col-12"><p className='login text-center'>Already a member? <Link className='text-decoration-none' to={"/login"}>Login <i className="fa-solid fa-chevron-right"></i></Link></p></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
}
