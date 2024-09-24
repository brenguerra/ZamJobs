import React from 'react'
import "./messenger.css"

import Online from '../../components/online/Online'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {sendUserMessage,reset} from '../../features/chat/chatSlice';
import { useRef } from 'react'
import {io} from 'socket.io-client';
import ConversationList from '../../components/conversations/ConversationList'
import MessageList from '../../components/message/MessageList'
import ChatInput from '../../components/ChatInput'

function Messenger() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {user} = useSelector((state)=> state.auth);

  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('')
  const [incomingMessage, setIncomingMessage] = useState(null)
  const socket = useRef();


  useEffect(()=> {
    socket.current= io("ws://localhost:8900")
    socket.current.on("getMessage", (data) => {
      setIncomingMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  },[]);

  useEffect(() => {
    const isMember = currentChat?.members.filter((user)=>user._id===incomingMessage?.sender).length > 0
    incomingMessage &&
      isMember &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, currentChat]);

  useEffect(()=> {
    if(!user){
      navigate('/login')
    }
    socket.current.emit('addUser', user.id);
    socket.current.on('getUsers', users => {
    });
    return () => {
      dispatch(reset())
    }
  },[navigate, dispatch, user]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const msgData = {
      text: newMessage,
      conversationId:currentChat._id,
      sender:{_id:user.id}
    }

    const receiver= currentChat.members.find(member=> member._id !== user.id)
    setNewMessage('');

    dispatch(sendUserMessage(msgData));
    socket.current?.emit('sendMessage', {
      senderId:user.id,
      receiverId:receiver._id,
      text:newMessage
    });
    setMessages([...messages, msgData]);
  };

  return (
    <div className='messenger'>
      <div className="chatMenu">
          <div className="chatMenuWrapper">
            {/* <input placeholder='Search conversation' className='chatMenuInput' /> */}
            <ConversationList setMessages={setMessages} setCurrentChat={setCurrentChat}/>
          </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {
            currentChat ?
            <>
            <div className="chatBoxTop">
              <MessageList messages={messages} />

            </div>
            <div className="chatBoxBottom">
                <ChatInput handleSubmit={handleSubmit} newMessage={newMessage} setNewMessage={setNewMessage} />
            </div>
            </> :
            <span className='noConvoText'> Open a Conversation to view messages</span>
            }
        </div>
      </div>
      {/* <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <Online />
        </div>
      </div> */}
    </div>
  )
}

export default Messenger