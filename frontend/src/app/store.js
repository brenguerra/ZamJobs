import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import jobReducer from '../features/jobs/jobSlice';
import chatReducer from '../features/chat/chatSlice';
import contractReducer from '../features/contracts/contractSlice';
import ratingReducer from '../features/rating/ratingSlice';
import applicationReducer from '../features/application/applicationSlice';
import offerReducear from '../features/offers/offerSlice';
import userProfileReducer from '../features/userProfile/userProfileSlice'
import photoReducer from '../features/photos/photoSlice'
export const store = configureStore({
  reducer: {
    auth:authReducer,
    jobs:jobReducer,
    chat: chatReducer,
    contract: contractReducer,
    rating: ratingReducer,
    application: applicationReducer,
    offer: offerReducear,
    userProfile:userProfileReducer,
    photos: photoReducer
  },
});