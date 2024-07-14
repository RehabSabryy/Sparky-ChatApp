import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { auth } from '../../firebase-config';
import { signOut } from 'firebase/auth';
export default function Navbar() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showLangDropDown, setShowLangDropDown] = useState(false);
  const navigate = useNavigate();
  //profile dropdown show and hide
  const handleMouseEnter = () => {
    setShowDropDown(true);
  };
  const handleMouseLeave = () => {
    setShowDropDown(false);
  };
  const handleLangMouseEnter = () => {
    setShowLangDropDown(true);
  };
  const handleLangMouseLeave = () => {
    setShowLangDropDown(false);
  };
//logout button
const logout = async() => {
    try {
        await signOut(auth);
        navigate("/login");
    } catch (error) {
        console.log(error);
        }
}
  return (
    <nav className="navbar navbar-expand-lg bg-white d-flex justify-content-between p-4">
      <div className="d-flex">
        <img src="/images/icon.png" className='navIcon-size' alt="Sparky Icon" />
        <Link className="navbar-brand main-color" to={"/layout/all"}>Sparky</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link main-color" to={'/layout/rooms'}>Rooms</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link main-color" to={'/layout/channels'}>Channels</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex">
        <img src="/images/language.png" className="gmail-size me-3" alt="Change Languages" />
        <div className="profile-container" onMouseEnter={handleMouseEnter}onMouseLeave={handleMouseLeave}>
          <img src="/images/user.jpg" className="gmail-size border rounded-circle" alt="Profile" onMouseEnter={handleLangMouseEnter} onMouseLeave={handleLangMouseLeave}/>
          {showDropDown && (
            <div className="dropdown-menu">
              <ul>
                <Link to={'/layout/profile'} className='text-decoration-none'>
                    <li className="dropdown-item" >Profile</li>
                </Link>
                <Link to={'/layout/settings'} className='text-decoration-none'>
                    <li className="dropdown-item">Settings</li>
                </Link>    
                <li className="dropdown-item" onClick={logout}>Logout</li>
              </ul>
            </div>
          )}
          {showLangDropDown && (
            <div className="dropdown-menu-lang">
              <ul>
                <li className="dropdown-item">English</li>
                <li className="dropdown-item">Arabic</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
