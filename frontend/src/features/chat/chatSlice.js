import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
import chatService from "./chatService";


const initialState = {
  conversations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getConversations = createAsyncThunk('chat/getConversations', async(userId,thunkAPI)=> {
  try {
    const userToken = thunkAPI.getState().auth.user.token;
    return await chatService.getUserConversations(userToken, userId);
  } catch (error) {
    const message = (
      error.response && error.response.data &&error.response.data.message) ||
      error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const sendUserMessage = createAsyncThunk('chat/sendUserMessage', async (msgData, thunkAPI)=> {
  try {
    const userToken = thunkAPI.getState().auth.user.token;
    return await chatService.sendUserMessage(userToken, msgData);
  } catch (error) {
    const message = (
      error.response && error.response.data && error.response.data.message) ||
      error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const findOrCreateChat = createAsyncThunk('chat/findOrCreateChat', async (receiverId, thunkAPI)=> {
  try {
    const userToken = thunkAPI.getState().auth.user.token;
    return await chatService.findOrCreateChat(userToken,receiverId );
  } catch (error) {
    const message = (
      error.response && error.response.data && error.response.data.message) ||
      error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const chatSlice = createSlice({
  name:'chat',
  initialState,
  reducers: {
    reset: (state)=> initialState
  },
  extraReducers: (builder)=> {
    builder
      // Get jobs
      .addCase(getConversations.pending, (state) => {state.isLoading=true})
      .addCase(getConversations.fulfilled, (state, action) => {
        state.isLoading=false;
        state.isError = false;
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.isLoading=false;
        state.isError = true;
        state.message = action.payload;
      })
      // sendMessage
      .addCase(sendUserMessage.pending, (state)=> {state.isLoading=true})
      .addCase(sendUserMessage.fulfilled, (state, action)=> {
        state.isLoading=false;
        state.isSuccess=true;
      })
      .addCase(sendUserMessage.rejected, (state, action)=> {
        state.isLoading=false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get find or new chat
      .addCase(findOrCreateChat.pending, (state)=> {state.isLoading=true})
      .addCase(findOrCreateChat.fulfilled, (state, action)=> {
        state.isLoading=false;
        state.isError = false;
        state.conversations.push(action.payload);
        state.isSuccess=true;
      })
      .addCase(findOrCreateChat.rejected, (state, action)=> {
        state.isLoading=false;
        state.isError = true;
        state.message = action.payload;
      })
  }
})

export const {reset} = chatSlice.actions
export default chatSlice.reducer