import React, { useState } from 'react'
import Side from '../Side/Side'
import Messages from '../Messages/Messages'
export default function All() {
  const [chat, setChat] = useState([]);
  const handleSelectedChat = (id) => {
    setChat(id);
  }
  return (
    <>
        <div className="row w-100" style={{maxHeight:"100vh"}}>
            <div className="col-md-3 p-0">
                <Side onSelectChat={handleSelectedChat}/>
            </div>
            <div className="col-md-9 p-0">
                <Messages chat={chat}/>
        </div>
        </div>
    </>
  )
}
