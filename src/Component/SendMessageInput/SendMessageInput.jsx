import React, { useState } from 'react'
import Styles from './SendMessageInput.module.css';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';

export default function SendMessageInput() {
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;
    
        // Use ref to get the value of the specified collection(db table)
        await addDoc(messagesRef, {
          text: newMessage,
          createdAt: serverTimestamp(),
          user: auth.currentUser?.displayName || 'Anonymous',
        });
        setNewMessage("");
      };
  return (
    <div className="position-relative d-flex align-items-center w-100">
    <input type="text" name="message" className="form-control p-2 rounded-5" id="message" placeholder="Type Something..." onChange={handleInputChange} value={newMessage} />
    <div className = {`position-absolute ${Styles.attachmentIcon}`}>
      <i class="fa-solid fa-microphone main-color"></i>
      <i className={`fa-solid fa-paperclip ms-3 main-color`}></i>
    </div>
    <button type="submit" className="btn btn-warning ms-2 rounded-5" onClick={handleSubmit}>
         <i className="fa-solid fa-paper-plane "></i>
   </button>
</div>
  )
}
