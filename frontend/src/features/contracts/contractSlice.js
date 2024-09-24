import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import contractService from './contractService';

const initialState = {
  contract:{},
  contracts: [],
  contractError: false,
  contractSuccess: false,
  contractLoading: false,
  contractMessage: ''
};

export const createContract = createAsyncThunk('contract/createContract', async (contractData, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().auth.user.token;
    const responseData = await contractService.createContract(userToken, contractData);
    return responseData;
  } catch (error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const finishContract = createAsyncThunk('contract/finishContract', async (contractId, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().auth.user.token;
    const responseData = await contractService.finishContract(userToken, contractId);
    return responseData;
  } catch (error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const terminateContract = createAsyncThunk('contract/terminateContract', async (contractId, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().auth.user.token;
    const responseData = await contractService.terminateContract(userToken, contractId);
    return responseData;
  } catch (error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUserContracts = createAsyncThunk('contract/getUserContracts', async (userId, thunkAPI) => {
  try {
    const userToken = thunkAPI.getState().auth.user.token;
    const responseData = await contractService.getUserContracts(userToken, userId);
    return responseData;
  } catch (error){
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const contractSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers : (builder)=> {
    builder
      // Create
      .addCase(createContract.pending, (state)=> {state.contractLoading=true})
      .addCase(createContract.fulfilled, (state, action)=> {
        state.contractLoading=false
        state.contractSuccess=true;
        state.contractError=false
        state.contracts.push(action.payload);
      })
      .addCase(createContract.rejected, (state, action)=> {
        state.contractLoading=false;
        state.contractError=true;
        state.contractSuccess=false;
        state.contractMessage = action.payload
      })
      // Toggle/Finish Contract
      .addCase(finishContract.pending, (state)=> {state.contractLoading=true})
      .addCase(finishContract.fulfilled, (state, action)=> {
        state.contractLoading=false
        state.contractSuccess=true;
        state.contractError=false
      })
      .addCase(finishContract.rejected, (state, action)=> {
        state.contractLoading=false;
        state.contractError=true;
        state.contractSuccess=false;
        state.contractMessage = action.payload
      })
      // Terminate Contract
      .addCase(terminateContract.pending, (state)=> {state.contractLoading=true})
      .addCase(terminateContract.fulfilled, (state, action)=> {
        state.contractLoading=false
        state.contractSuccess=true;
        state.contractError=false
      })
      .addCase(terminateContract.rejected, (state, action)=> {
        state.contractLoading=false;
        state.contractError=true;
        state.contractSuccess=false;
        state.contractMessage = action.payload
      })
      // Get user contracts
      .addCase(getUserContracts.pending, (state)=> {state.contractLoading=true})
      .addCase(getUserContracts.fulfilled, (state, action)=> {
        state.contractLoading=false
        state.contractSuccess=true;
        state.contractError=false
        state.contracts=action.payload;
      })
      .addCase(getUserContracts.rejected, (state, action)=> {
        state.contractLoading=false;
        state.contractError=true;
        state.contractSuccess=false;
        state.contractMessage = action.payload
      })
  }
});

export const {reset} = contractSlice.actions
export default contractSlice.reducer