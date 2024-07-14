import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Settings() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userProfile = await fetchUserProfile(user.uid);
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
      <div className=" w-100 justify-content-center container">
        <div className="row rounded-5 bg-light position-relative me-4 p-5">
          <div className="col-md-4">
            <img src="/images/icon.png"  alt="profile" />
          </div>
          <div className="col-md-8">
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <h1 className='pb-2'>{profile ? profile.displayName : "No display name"}</h1>
          </div>
          <div className='px-5'>           
            <div className='mt-5'>
              <h5 className='mb-3'>Edit Profile</h5>
              <div className="row">
                <div className="col-md-6">
                  <div>
                    <h6>User Name</h6>
                    <input type="text" className="form-control" defaultValue={profile ? profile.displayName : ""} />
                  </div>
                  <div>
                    <h6>Phone Number</h6>
                    <input type="text" className="form-control" defaultValue={profile ? profile.phoneNumber : ""} />
                  </div>
                  <div>
                    <h6>Date of Birth</h6>
                    <input type="date" className="form-control" defaultValue={profile ? profile.dob : ""} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <h6>Email</h6>
                    <input type="email" className="form-control" defaultValue={user.email} />
                  </div>
                  <div>
                    <h6>Password</h6>
                    <input type="password" className="form-control" />
                  </div>
                  <div>
                    <h6>Confirm Password</h6>
                    <input type="password" className="form-control" />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                   <button type="submit" className="btn btn-warning mt-3 fw-bold">Update</button>
              </div>
              </div>
              <div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
