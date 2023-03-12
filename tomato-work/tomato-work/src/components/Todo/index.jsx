import React, { useState,useEffect } from 'react'
import './style.scss'
import { Input,Modal  } from 'antd'
import { PlusOutlined } from "@ant-design/icons";
import { storage } from '../../storage/storageUtils';
import { useSelector,useDispatch } from 'react-redux'
import {
  todoAdd,
  todoToggled,
  todoDelete,
  todoEdit
} from '../../redux/features/todoSlice'

export default function Todo() {
  const todoList=useSelector(store => store.todo.todoList)
  const dispatch=useDispatch()
  const [mouseInTodo,setTodoMouse]=useState(-1)
  const [mouseInDone,setDoneMouse]=useState(-1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editText,setEditText]=useState()
  const [editId,setEditId]=useState()

  function handleKeyUp(e){
    // 解构赋值获取keyCode,target
    const {target}=e
    if(target.value.trim()!==''){
      dispatch(todoAdd(target.value))
      target.value=''
    }
  }

  function editTodo(id){
    setIsModalOpen(true)
    setEditId(id)
  }

  const handleOk = () => {
    dispatch(todoEdit({
      id:editId,
      title:editText
    }))
    setIsModalOpen(false);
  }

  const handleCancel = (e) => {
    e.target.value=''
    setIsModalOpen(false)
  }

  useEffect(() => {
    storage.setItem('todoList',JSON.stringify(todoList))
  }, [todoList])

  return (
    <div className='todo'>
      <div className='todo-list'>
        <span className='todo-list-title'>今日待办</span>
        <Input
          size="large"
          placeholder="添加今天待办"
          style={{border:'1px solid #f0f0f0'}}
          prefix={<PlusOutlined style={{color:'#8c8c8c'}}/>}
          onPressEnter={(e)=>handleKeyUp(e)}/>
        <div className='todo-list-ul'>
          {todoList.map((item,index)=>{
            if(!item.check)
              return (
                <div className='todo-list-li' key={item.id}
                  onMouseEnter={(e)=>setTodoMouse(index)}
                  onMouseLeave={(e)=>setTodoMouse(-1)}>
                  <label>
                    <input type="checkbox" onChange={()=>dispatch(todoToggled(item.id))}/>
                    <span>{item.title}</span>
                  </label>
                  <div className='todo-list-li-button'
                    style={{display:mouseInTodo===index?'block':'none'}}>
                    <button onClick={()=>editTodo(item.id)}>修改</button>
                      <Modal title="修改" okText='确认' cancelText='取消'
                      open={isModalOpen} onOk={()=>handleOk()} onCancel={(e)=>handleCancel(e)}>
                        <div>
                          <span style={{width:'10%'}}>待办：</span>
                          <Input size='large' onChange={(e)=>setEditText(e.target.value)}/>
                        </div>
                      </Modal>
                    <button onClick={()=>dispatch(todoDelete(item.id))}>删除</button>
                  </div>
                </div>
              )
          })}
        </div>
      </div>
      <div className='todo-list'>
        <span className='todo-list-title'>已完成</span>
          <div className='todo-list-ul-right'>
            {todoList.map((item,index)=>{
              if(item.check)
                return (
                  <div className='todo-list-li' key={item.id}
                    onMouseEnter={(e)=>setDoneMouse(index)}
                    onMouseLeave={(e)=>setDoneMouse(-1)}>
                    <label>
                      <input type="checkbox" checked='checked'/>
                      <span>{item.title}</span>
                    </label>
                    <div className='todo-list-li-button'
                      style={{display:mouseInDone===index?'block':'none'}}>
                      <button onClick={()=>editTodo(item.id)}>修改</button>
                      <button onClick={()=>dispatch(todoDelete(item.id))}>删除</button>
                    </div>
                  </div>
                )
            })}
          </div>
      </div>
    </div>
  )
}
