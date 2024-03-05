
import { createSlice } from "@reduxjs/toolkit";

const persistedToken = localStorage.getItem('token') || null;
const isAuthenticated = persistedToken || false;
const initialState = {isAuthenticated:isAuthenticated,token:persistedToken}
const authSlice = createSlice({
    name:'authentication',
    initialState:initialState,
    reducers:{
        login(state,action){
            state.isAuthenticated = true;
            state.token = action.payload.token;
            localStorage.setItem('token',action.payload.token)
        },
        logout:  (state) => {
            state.isAuthenticated = false;
            localStorage.removeItem('token')
        },
       
    }
})
export const {login,logout} = authSlice.actions
export default  authSlice.reducer;