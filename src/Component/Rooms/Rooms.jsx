

import React, { useState, useEffect, useRef } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import RoomsSide from './RoomsSide';
import SendMessageInput from '../SendMessageInput/SendMessageInput';
export default function Rooms() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages");
  const messagesEndRef = useRef(null);

  // Listen to changes in the collection
  useEffect(() => {
    const queryMessages = query(messagesRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.docs.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    // Cleanup useEffect to avoid issues
    return () => unsubscribe();
  }, []);

  // Scroll to the bottom of the messages list
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    <div className="row w-100">
      <div className="col-md-3 p-0">
        <RoomsSide />
      </div>
      <div className="col-md-9 p-0">   
    <div className='d-flex flex-column justify-content-between' style={{ height: "85vh" }}>
      <div className="sendTo d-flex align-items-center mb-3 bg-side p-3">
        <img src="/images/user.jpg" className='rounded-circle icon-size' alt="user" />
        <h4>{auth.currentUser.displayName}</h4>
      </div>
      <div className={`messages d-flex flex-column overflow-auto`}>
        {messages.map((message) => (
          <div key={message.id} className={`message m-2 d-flex flex-column ${message.user === (auth.currentUser?.displayName || 'Anonymous') ? 'messageSender' : 'messageReceiver'}`}>             
            <div className={`d-flex flex-column justify-content-between  rounded-5  p-2 ${message.user === (auth.currentUser?.displayName || 'Anonymous') ? 'messageSenderBg' : 'messageReceiverBg'}`}>
              <div className='d-flex'>
                <img src="/images/user.jpg" className="image-size rounded-circle d-flex me-2" alt="" />
                <p className="mb-1 fw-bold">{message.user}</p>
              </div>
              <div className="d-flex justify-content-between align-items-baseline">
                  <p className="mb-1">{message.text}</p>
                  <p className="text-muted messageTime">{new Date(message.createdAt?.seconds * 1000).toLocaleTimeString()}</p>
            </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="d-flex mt-2">
        <SendMessageInput handleInputChange={handleInputChange} newMessage={newMessage} />
      </form>
    </div>
    </div>
    </div>
  );
}
