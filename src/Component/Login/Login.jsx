import React, { useEffect, useRef ,useState} from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min.js";
import { Link, useNavigate } from "react-router-dom";
import Google from "../GoogleAuth/Google";
import { Helmet } from "react-helmet";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [form,setForm]=useState({
    email: "",
    password: "",
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
    const {email,password}=form;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();  
      
      console.log("login success",user);
      console.log("Token:", token); 
      // Save token to local storage
      localStorage.setItem("auth-token", token);
      navigate("/layout/all");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  return (
    <div className="vh-100 container-fluid" ref={vantaRef}>
      <Helmet>
        <title>Login | Sparky</title>
      </Helmet>
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
     <form className="w-50 m-auto bg-white p-5 rounded-5" onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center">
        <img src="images/icon.png"className="icon-size" alt="Icon" />
      <h3 className="d-flex align-items-center">Sparky</h3>
        </div>
        <h4> Sign In</h4>
  <div className="mb-3">
    <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Email" onChange={handleInputChange} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <input type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder="Enter Your Password" onChange={handleInputChange} required/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <div className="mb-3 text-center">
    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
  </div>
  <div className="d-flex justify-content-center">
    <button type="submit" className="btn btn-warning fw-bold w-25 p-2">Sign In</button>
  </div>
  {error && <p className=" text-danger">{error}</p>}
  <Google/>
</form>
</div>
    </div>
  );
};