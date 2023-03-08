import { createSlice } from '@reduxjs/toolkit'

export const focusSlice=createSlice({
    name:'focus',
    initialState:{focusTime:'00h 00m'},
    reducers:{
        focusTimeChange:(state,{payload})=>{
            state.focusTime=payload
        },
    }
})

export const {focusTimeChange}=focusSlice.actions

export default focusSlice.reducer