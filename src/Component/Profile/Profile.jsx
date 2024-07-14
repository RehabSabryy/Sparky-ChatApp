import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        let userProfile = null;
        if (user.providerData && user.providerData[0].providerId === 'password') {
          // User logged in with email/password
          userProfile = await fetchUserProfile(user.uid);
        } else if (user.providerData && user.providerData[0].providerId === 'google.com') {
          // User logged in with Google
          userProfile = { displayName: user.displayName };
        }
        setProfile(userProfile);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const fetchUserProfile = async (userId) => {
    const docRef = doc(db, "profiles", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>User not logged in</div>;
  }

  return (
    <>
      <div className="d-flex">
        <div className="row w-100">
        <div className="col-md-8 rounded-4 bg-light position-relative me-4 p-0 ms-5 ">
          <div className='cover-wrapper'>
            <img src="/images/cover.jpg" className='rounded-5 w-100 cover-img' alt="cover" />
            <img src="/images/icon.png" className='icon-size position-absolute profile-img' alt="profile" />
          </div>
          <div className='mt-5'>
            <h1>{profile.displayName}</h1>
            <h5>{user.email}</h5>
          </div>
        </div>
        <div className="col-md-3 rounded-4 bg-light p-4">
            <h6 className='fw-bold mb-4'>Connect with new friends</h6>
            
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex">
                    <img src="/images/user.jpg" className='rounded-circle icon-size' alt="friends" />
                    <p className='fw-bold d-flex ms-2 align-items-center'>Rehab Sabry</p>
                </div>
                <div>
                    <img src="/images/link.png" style={{width:"25px"}} alt="Connect" />
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex">
                    <img src="/images/user.jpg" className='rounded-circle icon-size' alt="friends" />
                    <p className='fw-bold d-flex ms-2 align-items-center'>Rehab Sabry</p>
                </div>
                <div>
                    <img src="/images/link.png" style={{width:"25px"}} alt="Connect" />
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex">
                    <img src="/images/user.jpg" className='rounded-circle icon-size' alt="friends" />
                    <p className='fw-bold d-flex ms-2 align-items-center'>Rehab Sabry</p>
                </div>
                <div>
                    <img src="/images/link.png" style={{width:"25px"}} alt="Connect" />
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex">
                    <img src="/images/user.jpg" className='rounded-circle icon-size' alt="friends" />
                    <p className='fw-bold d-flex ms-2 align-items-center'>Rehab Sabry</p>
                </div>
                <div>
                    <img src="/images/link.png" style={{width:"25px"}} alt="Connect" />
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex">
                    <img src="/images/user.jpg" className='rounded-circle icon-size' alt="friends" />
                    <p className='fw-bold d-flex ms-2 align-items-center'>Rehab Sabry</p>
                </div>
                <div>
                    <img src="/images/link.png" style={{width:"25px"}} alt="Connect" />
                </div>
            </div>
        </div>
        </div>
      </div>
    </>
  );
}
