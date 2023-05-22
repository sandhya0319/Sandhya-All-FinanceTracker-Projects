import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { DefaultUsers } from '../../utils/constants';
// import { RootState } from "../store";

//import type { PayloadAction } from '@reduxjs/toolkit'

// interface RootState {
//   isOn: boolean
// }
//console.log(RootState,"rrr")

interface userstype{
  username:string;
  email:string;
  password:string;
}
interface Initial{
 value:userstype[];
} 

const initialState: Initial = {
  value: DefaultUsers,
}
 export const usersSlice=createSlice({
  name:"users",
  initialState,
  reducers:{
    addUsers:(state,action:PayloadAction<userstype>)=>{
      const setusers=[...state.value,action.payload];
        state.value=setusers;
        console.log("sett",setusers);
      
    },

  }
 })
export const {addUsers}=usersSlice.actions
//export const selectUsers = (state: RootState) => state.users.value
export default usersSlice.reducer;