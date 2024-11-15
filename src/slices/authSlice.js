import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    signUpData:localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null,
    taskData:localStorage.getItem("taskData") ? JSON.parse(localStorage.getItem("taskData")) : null,
    loading:false,
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignupData(state,value){
            state.signUpData=value.payload;
        },
        setTaskData(state,value){
            state.taskData=value.payload;
        },
        setLoading(state,value){
            state.loading=value.payload;
        },
        setToken(state,value){
            state.token=value.payload;
        },
    },
});

export const {setSignupData,setTaskData,setLoading,setToken} = authSlice.actions;
export default authSlice.reducer;
