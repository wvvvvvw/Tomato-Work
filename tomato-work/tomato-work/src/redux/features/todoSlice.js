import {nanoid} from 'nanoid'
import { createSlice } from '@reduxjs/toolkit'

export const todoSlice=createSlice({
    name:'todo',
    initialState:{
        todoList:[
            { id: "01", title: "react课设", check: false },
            { id: "02", title: "阅读一小时", check: false },
            { id: "03", title: "做算法题", check: false },
    ]},
    reducers:{
        todoAdd:(state,{payload})=>{
            state.todoList.push({
                id:nanoid(),
                title:payload,
                check:false
            })
        },
        todoToggled:(state,{payload})=>{
            const todo=state.todoList.find(todo=>todo.id===payload)
            todo.check=!todo.check
        },
        todoDelete:(state,{payload})=>{
            state.todoList.map((todo,index)=>{
                if (todo.id===payload)state.todoList.splice(index,1)
            })
        },
        todoEdit:(state,{payload})=>{
            state.todoList.map(todo=>{
                if(todo.id===payload.id)todo.title=payload.title
            })
        }
    }
})

export const {todoAdd,todoToggled,todoDelete,todoEdit}=todoSlice.actions

export default todoSlice.reducer