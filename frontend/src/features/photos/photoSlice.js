import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import photoService from './photoService';


const initialState = {
  photos: [],
  photoError: false,
  photoSuccess: false,
  photoLoading: false,
  photoMessage: ''
};


export const getJobPhotos  = createAsyncThunk('photos/getJobPhotos', async (jobId, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().auth.user.token;
    const responseData = await photoService.getJobPhotos(userToken, jobId);
    return responseData;
  } catch (error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const getJobPrimaryPhoto  = createAsyncThunk('photos/getJobPrimaryPhoto', async (jobId, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().auth.user.token;
    const responseData = await photoService.getJobPhoto(userToken, jobId);
    return responseData;
  } catch (error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUserPhotos  = createAsyncThunk('photos/getUserPhotos', async (userId, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().auth.user.token;
    const responseData = await photoService.getUserPhotos(userToken, userId);
    return responseData;
  } catch (error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const photoSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers : (builder)=> {
    builder
      // Get job photos
      .addCase(getJobPhotos.pending, (state)=> {state.photoLoading=true})
      .addCase(getJobPhotos.fulfilled, (state, action)=> {
        state.photoError=false
        state.photoSuccess=true;
        state.photoError=false;
        state.photos=action.payload;
      })
      .addCase(getJobPhotos.rejected, (state, action)=> {
        state.photoLoading=false;
        state.photoError=true;
        state.photoSuccess=false;
        state.photoMessage = action.payload
      })
      // Get User photos
      .addCase(getUserPhotos.pending, (state)=> {state.photoLoading=true})
      .addCase(getUserPhotos.fulfilled, (state, action)=> {
        state.photoError=false
        state.photoSuccess=true;
        state.photoError=false;
        state.photos=action.payload;
      })
      .addCase(getUserPhotos.rejected, (state, action)=> {
        state.photoLoading=false;
        state.photoError=true;
        state.photoSuccess=false;
        state.photoMessage = action.payload
      })
      // Get job photos
      .addCase(getJobPrimaryPhoto.pending, (state)=> {state.photoLoading=true})
      .addCase(getJobPrimaryPhoto.fulfilled, (state, action)=> {
        state.photoError=false
        state.photoSuccess=true;
        state.photoError=false;
        state.photos=action.payload;
      })
      .addCase(getJobPrimaryPhoto.rejected, (state, action)=> {
        state.photoLoading=false;
        state.photoError=true;
        state.photoSuccess=false;
        state.photoMessage = action.payload
      })
  }
})

export const {reset} = photoSlice.actions
export default photoSlice.reducer