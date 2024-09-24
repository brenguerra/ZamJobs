import axios from "axios";
const API_URL = '/api/v1/applications/';


const rejectApplication  = async (token, applicationId) => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const response = await axios.put(`${API_URL}/terminate/${applicationId}`, {}, config);
  return response.data;
}


const sendApplication = async(token, applicationData ) => {
  const config = {
    headers: {
      Authorization:token
    }
  };

  const response = await axios.post(`${API_URL}`, {jobId:applicationData.jobId, message:applicationData.applicationMessage}, config)
  return response.data
}


const getApplications = async(token, userId ) => {
  const config = {
    headers: {
      Authorization:token
    }
  };

  const response = await axios.get(`${API_URL}users/${userId}`, config)
  return response.data
}

const applicationService = {
  rejectApplication,
  sendApplication,
  getApplications
}


export default applicationService;