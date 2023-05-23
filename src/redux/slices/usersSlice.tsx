import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { DefaultUsers } from '../../utils/constants';
import { UsersInterface } from "../../model";

// interface userType{
//   username:string;
//   email:string;
//   password:string;
// }
interface Initialvalues{
value:UsersInterface[];
}

const initialState: Initialvalues = {
  value: DefaultUsers,
}
 export const usersSlice=createSlice({
  name:"users",
  initialState,
  reducers:{
    addUsers:(state,action:PayloadAction<UsersInterface>)=>{
      const setusers=[...state.value,action.payload];
        state.value=setusers;
        //console.log("sett",setusers);
      
    },

  }
 })
export const {addUsers}=usersSlice.actions
export default usersSlice.reducer;