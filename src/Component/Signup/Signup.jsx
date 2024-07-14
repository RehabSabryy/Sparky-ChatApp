import React, { useEffect, useRef, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min.js";
import Google from "../GoogleAuth/Google";
import { Helmet } from "react-helmet";
import {auth, provider,db } from '../../firebase-config'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Signup() {
  const [form,setForm]=useState({
    email: "",
    password: "",
    confirmPassword:"",
    phoneNumber: "",
    displayName: "",
    dob:"",
  });
  const [error,setError]=useState(null);
  const[loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = NET({
      el: vantaRef.current,
      THREE: THREE,
      backgroundColor: 0x402E7A,
      maxDistance: 20.00,
      spacing: 16.00,
      showDots: true
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);
  const handleInputChange=(e)=> {
    const {name,value}=e.target;
    setForm({...form,[name]:value});
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    const {email,password,confirmPassword,phoneNumber,displayName,dob}=form;
    if(password !== confirmPassword){
      setError("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
        // Add additional user data to Firestore
        await setDoc(doc(db, "profiles", user.uid), {
          displayName: displayName,
          dob: dob,
          phoneNumber: phoneNumber,
        });
        console.log("User signed up successfully:", user);
        navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="vh-100 container-fluid" ref={vantaRef}>
      <Helmet>
        <title>Sign Up | Sparky</title>
      </Helmet>
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
     <form className="w-50 m-auto bg-white p-4 rounded-5" onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center">
        <img src="images/icon.png" className="icon-size" alt="Icon" />
        <h3 className="text-center d-flex align-items-center">Sparky</h3>
        </div>
        <h4> Sign Up</h4>
      <div className="mb-3">
    <input type="text" className="form-control" id="displayName" name="displayName" placeholder="Enter Username" onChange={handleInputChange} required/>
  </div>
  <div className="mb-3">
    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter Email" onChange={handleInputChange} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <input type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder="Enter Password" onChange={handleInputChange} required/>
  </div>
  <div className="mb-3">
    <input type="password" className="form-control" name="confirmPassword" id="exampleInputPassword2" placeholder="Confirm Password" onChange={handleInputChange} required/>
  </div>
  <div className="mb-3 ">
    <input type="text" className="form-control" name="phoneNumber" id="phoneNumber" placeholder="Enter Phone Number" onChange={handleInputChange} required/>
  </div>
  <div className="mb-3">
    <input type="date" className="form-control" name="dob" id="dob" onChange={handleInputChange} required/>
  </div>
  {error && <p className="text-danger">{error}</p>}

  <div className="mb-3 text-center">
    <p>Already have an account? <Link to="/login">Log In</Link></p>
  </div>
  <div className="d-flex justify-content-center">
    <button type="submit" className="btn btn-warning fw-bold w-25 p-2">Sign Up</button>
  </div>
  <Google/>
</form>
</div>
    </div>
  );
};