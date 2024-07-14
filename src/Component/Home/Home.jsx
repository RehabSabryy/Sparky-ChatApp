import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min.js";
import { Link } from "react-router-dom";
export default function Home() {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = NET({
      el: vantaRef.current,
      THREE: THREE,
      backgroundColor: 0x402E7A,
      maxDistance: 20.0,
      spacing: 16.0,
      showDots: true,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div className="vh-100 p-0" ref={vantaRef}>
      <div className="languages d-flex justify-content-end p-3">
        <button type="button" className="btn btn-link text-white">English</button>
        <button type="button" className="btn btn-link text-white">Arabic</button>
      </div>
      <div className="d-flex flex-column ">
        <h1
          className="d-flex ms-5 pt-5 textShadow text-white mainSparkyText">
          Sparky
        </h1>
        <h2 className="ms-5 mt-5 text-white fw-bold textShadow"> Keep your chats lively and sparky.</h2>
    </div>
    <div className="btns mt-5 row w-100">
      <Link to={"/login"} className="col-md-2 d-flex justify-content-end text-decoration-none">
         <button className="btn btn-warning me-4 fw-bold fs-5 p-2 w-50">Log In</button>
      </Link >   
      <Link to={"/signup"} className="col-md-2 text-decoration-none">
          <button className="btn btn-warning fw-bold fs-5 p-2 w-50">Sign Up</button>
      </Link>
    </div>
    </div>
  );
}
