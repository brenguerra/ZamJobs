import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Message from './Message'

function MessageList({ messages}) {
  const scrollRef = useRef();
  const {user} = useSelector((state)=> state.auth);

  useEffect(()=> {
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  }, [messages, ]);

  return (
    <>
    { messages.length > 0 ?
      messages.map((msg) =>
        <div ref={scrollRef} key={msg._id}  >
          <Message key={msg._id} user={user}  msg={msg} own={msg.sender._id === user.id}/>
        </div>)
      : <span> No messages yet. Message to start a conversation</span>
    }
    </>
  )
}

export default MessageList