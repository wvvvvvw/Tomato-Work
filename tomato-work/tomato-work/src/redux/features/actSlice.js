import { nanoid } from "nanoid"
import { createSlice } from "@reduxjs/toolkit"

export const actSlice=createSlice({
    name:'activity',
    initialState:{
        activity:[
            { id: "01", title: "班会", text:"主题：拒绝毒品" },
            { id: "02", title: "操作系统考点", text:"第一章 第二章" }
        ]
    },
    reducers:{
        actAdd:(state,{payload})=>{
            state.activity.push({
                id:nanoid(),
                title:payload,
                text:''
            })
        },
        actDelete:(state,{payload})=>{
            state.activity.map((item,index)=>{
                if (item.id===payload)state.activity.splice(index,1)
            })
        },
        actEdit:(state,{payload})=>{
            state.activity.map(item=>{
                if(item.id===payload.id)item.title=payload.title
            })
        },
        detailEdit:(state,{payload})=>{
            state.activity.map(item=>{
                if(item.id===payload.id)item.text=payload.text
            })
        },
    }
})

export const {actAdd,actDelete,actEdit,detailEdit}=actSlice.actions

export default actSlice.reducer