import axios from "axios";
const API_URL = '/api/v1/contracts/';

const createContract = async (token, contractData) => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const response = await axios.post(API_URL, contractData, config);
  return response.data;
}

const finishContract = async(token, contractId) => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const response = await axios.put(`${API_URL}${contractId}`, {}, config)
  return response.data
}

const terminateContract = async(token, contractId) => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const response = await axios.put(`${API_URL}terminate/${contractId}`, {}, config)
  return response.data
}

const getUserContracts = async(token, userId) => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const response = await axios.get(`${API_URL}/user/${userId}`, config)
  return response.data
}

const contractService = {
  createContract,
  finishContract,
  terminateContract,
  getUserContracts
}

export default contractService;