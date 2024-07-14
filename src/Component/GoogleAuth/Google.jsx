import React from 'react';
import Style from './Google.module.css';
import { auth, provider, db } from '../../firebase-config';
import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

export default function Google() {
    const navigate = useNavigate();
    const cookies = new Cookies();

    const saveUserProfile = async (user) => {
        try {
            await setDoc(doc(db, "profiles", user.uid), {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid
            }, { merge: true });
        } catch (error) {
            console.error("Error saving user profile:", error);
        }
    };

    const signinWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await saveUserProfile(user);
            // cookies.set("auth-token", user.refreshToken);
            localStorage.setItem("auth-token", user.refreshToken);
            navigate("/layout/all");
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const signinWithFacebook = async () => {
        const fbProvider = new FacebookAuthProvider();
        try {
            const result = await signInWithPopup(auth, fbProvider);
            const user = result.user;
            await saveUserProfile(user);
            // cookies.set("auth-token", user.refreshToken);
            localStorage.setItem("auth-token", user.refreshToken);
            navigate("/layout/all");
        } catch (error) {
            console.error("Error signing in with Facebook:", error);
        }
    };

    return (
        <div className="mb-3 text-center mt-4">
            <p className={`${Style.googleSignIn} w-100 d-flex justify-content-center align-items-end`}>Or Sign In with</p>
            <img src='images/gmail.png' className='gmail-size me-3' alt='Google' onClick={signinWithGoogle} />
            <img src="images/facebook.png" alt="Facebook" className='gmail-size' onClick={signinWithFacebook} />
        </div>
    );
}
