import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import './conversation.css'

function Conversation({conversation}) {
  const {user}  = useSelector((state)=> state.auth);
  const getSender = (member)=> {
    return member._id !== user.id
  }
  const sender = conversation.members.filter(getSender)[0]
  useEffect(()=> {

  }, [user, conversation]);

  return (
    <>
      <div className="conversation" key={conversation._id}>
        <img
          src={(sender?.photos !== null || sender?.photos !== undefined ) && sender?.photos > 0  ? sender?.photos[sender?.photos?.length-1]?.url : 'square-image.png'}
          alt={sender.firstname + ' '  + sender.lastname}
          className='conversationImage'
        />
        <span className="conversationName">{sender.firstname} {sender.lastname}</span>
      </div>
    </>
  )
}

export default Conversation