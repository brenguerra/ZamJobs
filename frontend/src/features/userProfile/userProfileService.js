import axios from 'axios'
const API_URL = `/api/v1/users/`

const getUser = async (token, userId) => {
  const config = {
    headers: {
      Authorization: token
    },
  };
  const response = await axios.get(`${API_URL}${userId}`, config);
  return response.data;
}

const updateUserAbout = async (token, userId, aboutData) => {
  const config = {
    headers: {
      Authorization: token
    },
  };
  const response = await axios.put(`${API_URL}${userId}/about`,{aboutText:aboutData}, config);
  return response.data;
}

const addEducation = async (token, userId, educationData) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(`${API_URL}${userId}/education`,{educationData}, config);
  return response.data;
}

const addSkills = async (token, userId, skills) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(`${API_URL}${userId}/skills`,{skills:skills}, config);
  return response.data;
}

const getUsersByCategory = async (token, category) => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const response = await axios.get(`${API_URL}sort/?category=${category}`, config);
  return response.data;
}

const uploadProfilePicture = async(token, data, userId) => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const response = await axios.put(`${API_URL}${userId}/photos`, data.uploadPhoto, config);
  return response.data;
}



const userProfileService = {
  getUser,
  updateUserAbout,
  addEducation,
  addSkills,
  getUsersByCategory,
  uploadProfilePicture
}

export default userProfileService