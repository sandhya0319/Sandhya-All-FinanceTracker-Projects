import { createSlice } from "@reduxjs/toolkit";
import { DefaultJSON } from '../../utils/constants';

      
 export const transactionsSlice=createSlice({
  name:"transaction",
  initialState:{value:DefaultJSON},
  reducers:{
    addTransaction:(state,action)=>{
      const settransactions=[...state.value,action.payload];
      state.value=settransactions;
      
    },
    editTransaction:(state,action)=>{
      console.log("state",state);
      //console.log("action",action);
      const  settransactions= state.value.map((element) => element.id === action.payload.id ? action.payload.val : element);
     // console.log("dee",settransactions);
      state.value = settransactions;
      
    },
    deleteTransaction:(state,action)=>{
      const settransactions = state.value.filter((element) => element.id !== action.payload);
      state.value = settransactions;
    }

  }
 })
export const {addTransaction,editTransaction,deleteTransaction}=transactionsSlice.actions
export default transactionsSlice.reducer;