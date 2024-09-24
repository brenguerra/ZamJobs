import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {getConversations} from '../../features/chat/chatSlice'
import Conversation from '../../components/conversations/Conversation'
function ConversationList({setCurrentChat,setMessages}) {
  const dispatch = useDispatch();
  const {user}= useSelector((state)=>state.auth)
  const {conversations, isError, message} = useSelector((state)=> state.chat)

  useEffect(()=> {
    if(isError){
      toast.error(message)
    }
    dispatch(getConversations(user.id));
  }, [isError, message, dispatch, user]);

  return (
    <>
    {conversations?.map((conversation) =>
      <div 
        onClick={()=> {
          setCurrentChat(conversation);
          setMessages(conversation.messages);
        }}
        key={conversation._id}
      >
        <Conversation conversation={conversation} />
      </div>
    )}
  </>
  )
}

export default ConversationList