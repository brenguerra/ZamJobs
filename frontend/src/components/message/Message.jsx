import React from 'react'
import './message.css'
import {format} from 'timeago.js';
function Message({msg, own, user}) {
  return (
    <div className={own ? 'message own' : 'message'} key={msg._id}>
      <div className="messageHeader">
        <img
          src={ msg?.sender?.photos?.length > 0 ? msg?.sender?.photos[msg?.sender?.photos?.length-1]?.url : 'square-image.png'}
          alt="profilepicture"
          className="messageImage"
        /> 
        <p className="messageTxt">{msg?.text}</p>
      </div>
      <div className="messageFooter">{format(msg.createdAt)}</div>
    </div>
  )
}

export default Message