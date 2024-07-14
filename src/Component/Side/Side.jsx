import React, { useState, useEffect } from 'react';
import { collection, getDocs, query as firestoreQuery, where } from 'firebase/firestore';
import { db } from '../../firebase-config';

export default function Side({ onSelectChat }) {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'profiles');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = async () => {
    const userQuery = firestoreQuery(collection(db, 'profiles'), where('displayName', '==', username));
    try {
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        const usersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSearchedUsers(usersList);
        setError(false);
      } else {
        setSearchedUsers([]);
        setError(true);
      }
    } catch (error) {
      console.error('Error fetching user: ', error);
      setError(true);
    }
  };

  // search
  const handleKey = (e) => {
    if (e.code === 'Enter') {
      handleSearchChange();
    }
  };

  return (
    <div className='bg-light'>
      <div className='p-3' style={{ backgroundColor: "#DCDCDC" }}>
        <h4>My Chats</h4>
        <input type="text" name="search" id="search" className="form-control" placeholder='Find a user' onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)}/>
      </div>
      {error && <div className='error'>User not found</div>}
      {searchedUsers.map(user => (
        <div key={user.id} onClick={() => onSelectChat(user.id)}>
          <div className='d-flex align-items-center'>
            <img src="/images/user.jpg" className="image-size rounded-circle pe-2" alt="User" />
            <div className="d-flex flex-column">
              <h6>{user.displayName}</h6>
            </div>
          </div>
        </div>
      ))}
      <div>
        <div>
          {users.map(user => (
            <div key={user.id} onClick={() => onSelectChat(user.id)} className='d-flex align-items-center p-4'>
              <img src="/images/user.jpg" className="image-size rounded-circle pe-2" alt="User" />
              <div className="d-flex flex-column">
                <h6>{user.displayName}</h6>
                <p className='text-muted'>Last Msg</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
