import { createSlice } from '@reduxjs/toolkit'

export const focusSlice=createSlice({
    name:'focus',
    initialState:{
        focusTime:'00h 00m',
        focusRecord:[],
        focusHour:new Array(24).fill(0),
    },
    reducers:{
        focusTimeChange:(state,{payload})=>{
            state.focusTime=payload
        },
        focusRecordAdd:(state,{payload})=>{
            state.focusRecord.push({...payload})
        },
        focusHourAdd:(state,{payload})=>{
            state.focusHour[payload.hour]+=payload.time
        }
    }
})

export const {focusTimeChange,focusRecordAdd,focusHourAdd}=focusSlice.actions

export default focusSlice.reducer