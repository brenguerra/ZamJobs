import axios from "axios";
const API_URL = '/api/v1/offers/';


const submitOffer= async(token, offerData) => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const response = await axios.post(`${API_URL}`, offerData, config)
  return response.data;
}

const offerService = {
  submitOffer
}

export default offerService;