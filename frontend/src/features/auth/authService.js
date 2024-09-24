import axios from 'axios';

const API_URL = '/api/v1/auth/'

const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}register`, userData, {'Content-Type':'application/json'});
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  }
}

const loginUser = async(userCredentials) => {
  const response = await axios.post(`${API_URL}login`, userCredentials, {'Content-Type':'application/json'});
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
}

const logoutUser = async () => {
  localStorage.removeItem('user');
}

const authService = {
  registerUser,
  loginUser,
  logoutUser
};

export default authService;