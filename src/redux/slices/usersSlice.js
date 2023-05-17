import { createSlice } from "@reduxjs/toolkit";
import { DefaultUsers } from '../../utils/constants';

      
 export const usersSlice=createSlice({
  name:"users",
  initialState:{value:DefaultUsers},
  reducers:{
    addUsers:(state,action)=>{
      const setusers=[...state.value,action.payload];
        state.value=setusers;
      
    },

  }
 })
export const {addUsers}=usersSlice.actions
export default usersSlice.reducer;