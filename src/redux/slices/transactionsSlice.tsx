import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultJSON } from '../../utils/constants';
import { TransactionTypes } from "../../model";


interface InitialTransaction {
  value: TransactionTypes[];
}

const initialState: InitialTransaction = {
  value: DefaultJSON,
}


export const transactionsSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<TransactionTypes>) => {
      const settransactions = [...state.value, action.payload];
      state.value = settransactions;
      //console.log("valll",settransactions);

    },
    editTransaction: (state, action: PayloadAction<any>) => {
      console.log("state", state);
      console.log("action",action.payload.transactionType);
      const setTransactions = state.value.map((element) =>
        element.id === action.payload.id ? action.payload.val : element
      );
      // console.log("dee",settransactions);
      state.value = setTransactions;

    },
    deleteTransaction: (state, action: PayloadAction<any>) => {
      const setTransactions = state.value.filter(
        (element) => element.id !== action.payload
      );
      state.value = setTransactions;
    }

  }
})
export const { addTransaction, editTransaction, deleteTransaction } = transactionsSlice.actions
//export const { addTransaction } = transactionsSlice.actions

export default transactionsSlice.reducer;