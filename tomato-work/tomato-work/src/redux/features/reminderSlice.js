import {nanoid} from 'nanoid'
import { createSlice } from '@reduxjs/toolkit'

export const reminderSlice=createSlice({
    name:'reminder',
    initialState:{reminder:[]},
    reducers:{
        rmdAdd:(state,{payload})=>{
            state.reminder.push({
                id:nanoid(),
                title:payload.title,
                time:payload.time
            })
        },
        rmdDelete:(state,{payload})=>{
            state.reminder.map((item,index)=>{
                if (item.id===payload)state.reminder.splice(index,1)
            })
        },
        rmdEdit:(state,{payload})=>{
            state.reminder.map(item=>{
                if(item.id===payload.id){
                    item.title=payload.title!==''?payload.title:item.title
                    item.time=payload.time!==''?payload.time:item.time
                }
            })
        }
    }
})

export const {rmdAdd,rmdDelete,rmdEdit}=reminderSlice.actions

export default reminderSlice.reducer