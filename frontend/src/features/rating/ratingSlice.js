import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ratingService from './ratingService';

const initialState = {
  rating:{},
  ratings: [],
  ratingError: false,
  ratingSuccess: false,
  ratingLoading: false,
  ratingMessage: ''
};


export const submitRating  = createAsyncThunk('rating/submitRating', async (contractData, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().auth.user.token;
    const responseData = await ratingService.submitRating(userToken, contractData);
    return responseData;
  } catch (error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const ratingSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers : (builder)=> {
    builder
      // Submit Rating
      .addCase(submitRating.pending, (state)=> {state.ratingLoading=true})
      .addCase(submitRating.fulfilled, (state, action)=> {
        state.ratingLoading=false
        state.ratingSuccess=true;
        state.ratingError=false

      })
      .addCase(submitRating.rejected, (state, action)=> {
        state.ratingLoading=false;
        state.ratingError=true;
        state.ratingSuccess=false;
        state.ratingMessage = action.payload
      })
  }
})

  export const {reset} = ratingSlice.actions
  export default ratingSlice.reducer