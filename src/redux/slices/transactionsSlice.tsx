import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { DefaultJSON } from '../../utils/constants';
import { TransactionTypes } from "../../model";

// interface TransactionType{
//   username:string;
//   email:string;
//   password:string;
// }
interface Initialvalues{
value:TransactionTypes[];
}

const initialState: Initialvalues = {
  value: DefaultJSON,
}

      
 export const transactionsSlice=createSlice({
  name:"transaction",
  initialState,
  reducers:{
    addTransaction:(state,action:PayloadAction<any>)=>{
      const settransactions=[...state.value,action.payload];
      state.value=settransactions;
      
    },
    editTransaction:(state,action:PayloadAction<any>)=>{
      console.log("state",state);
      //console.log("action",action);
      const  settransactions= state.value.map((element) => element.id === action.payload.id ? action.payload.val : element);
     // console.log("dee",settransactions);
      state.value = settransactions;
      
    },
    deleteTransaction:(state,action:PayloadAction<any>)=>{
      const settransactions = state.value.filter((element) => element.id !== action.payload);
      state.value = settransactions;
    }

  }
 })
export const {addTransaction,editTransaction,deleteTransaction}=transactionsSlice.actions
export default transactionsSlice.reducer;