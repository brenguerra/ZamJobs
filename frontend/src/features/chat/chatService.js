import axios from "axios";
const API_URL = '/api/v1/chat/';

const getUserConversations = async(token, userId) => {
  const config = {
    headers: {
      authorization: token
    }
  }
  const response = await axios.get(`${API_URL}${userId}`,config);
  return response.data;
}

const sendUserMessage =  async (token, msgData) => {
  const config = {
    headers: {
      authorization: token
    }
  }
  const response = await axios.post(`${API_URL}message`, msgData, config);
  return response.data
}

const findOrCreateChat = async(token, userId) => {
  const config = {
    headers: {
      authorization: token
    }
  }
  const response = await axios.get(`${API_URL}${userId}/message`, config);
  return response.data;
}

const chatService = {
  getUserConversations,
  sendUserMessage,
  findOrCreateChat
}


export default chatService;