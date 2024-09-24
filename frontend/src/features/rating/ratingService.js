import axios from 'axios';

const API_URL = '/api/v1/ratings/'

const submitRating= async(token, ratingData) => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const response = await axios.post(`${API_URL}`, ratingData, config)
  return response.data
}


const ratingService = {
  submitRating
}


export default ratingService;