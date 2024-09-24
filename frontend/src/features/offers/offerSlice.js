import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import offerService from './offerService';


const initialState = {
  offer:{},
  offers: [],
  offerError: false,
  offerSuccess: false,
  offerLoading: false,
  offerMessage: ''
};

export const submitOffer  = createAsyncThunk('offers/submitOffer', async (offerData, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().auth.user.token;
    const responseData = await offerService.submitOffer(userToken, offerData);
    return responseData;
  } catch (error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const offerSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers : (builder)=> {
    builder
      // Submit Rating
      .addCase(submitOffer.pending, (state)=> {state.offerLoading=true})
      .addCase(submitOffer.fulfilled, (state, action)=> {
        state.offerLoading=false
        state.offerSuccess=true;
        state.offerError=false

      })
      .addCase(submitOffer.rejected, (state, action)=> {
        state.offerLoading=false;
        state.offerError=true;
        state.offerSuccess=false;
        state.offerMessage = action.payload
      });
  }
})

  export const {reset} = offerSlice.actions
  export default offerSlice.reducer