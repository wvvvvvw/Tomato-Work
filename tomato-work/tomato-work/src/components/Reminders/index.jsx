import React, { useState,useEffect,useRef,useLayoutEffect } from 'react'
import './style.scss'
import { Input,Modal,DatePicker,message } from 'antd'
import {
  PlusOutlined,
} from "@ant-design/icons";
import { storage } from '../../storage/storageUtils';
import moment from 'moment'
import {useSelector,useDispatch} from 'react-redux'
import {
  rmdAdd,
  rmdDelete,
  rmdEdit,
} from '../../redux/features/reminderSlice'

export default function Reminders() {
  const reminders=useSelector(store => store.reminder.reminder)
  const dispatch=useDispatch()
  const [mouseInTodo,setTodoMouse]=useState(-1)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editText,setEditText]=useState()
  const [remindDate,setRemindDate]=useState('')
  const [deleteIndex,setDeleteIndex]=useState()
  const [editId,setEditId]=useState()

  function handleKeyUp(e){
    // 解构赋值获取keyCode,target
    const {target}=e
    if(target.value.trim()!==''){
      dispatch(rmdAdd({
        title:target.value,
        time:remindDate===''?moment().format("YYYY-MM-DD HH:mm:ss"):remindDate
      }))
      target.value=''
      setRemindDate('')
    }
  }

  function editReminder(id){
    setIsModalOpen(true)
    setEditId(id)
  }

  const handleOk = () => {
    dispatch(rmdEdit({
      id:editId,
      title:editText,
      time:remindDate
    }))
    setEditText('')
    setRemindDate('')
    setIsModalOpen(false);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const disabledDate = (current) => {
    return current < moment().startOf('day')
  }

  const pickDate=(value,dateString)=>{
    setRemindDate(dateString)
  }

  useEffect(() => {
    storage.setItem('reminders',JSON.stringify(reminders))
  }, [reminders])


  const [now,setNow]=useState(moment().format("YYYY-MM-DD HH:mm:ss"))
  useEffect(()=>{
    const t = setInterval(() => {
      setNow(moment().format("YYYY-MM-DD HH:mm:ss"))
    }, 1000)

    return () => {  // 每次卸载都执行此函数，清楚定时器
      clearTimeout(t)
    }
  },[])

  useEffect(()=>{
    reminders.map((item,index)=>{
      if(item.time===now){
        message.info('提醒事项：'+item.title)
        setDeleteIndex(item.id)
      }
    })
  },[now])
  
  const firstUpdate=useRef(true)
  useLayoutEffect(()=>{
    if(firstUpdate.current){
      firstUpdate.current=false
      return
    }else{
      dispatch(rmdDelete(deleteIndex))
    }
  },[deleteIndex])

  return (
    <div className='todo'>
      <div className='reminders-list'>
        <span className='todo-list-title'>提醒事项</span>
        <Input.Group compact>
          <Input
            size="large" placeholder="添加提醒事项"
            style={{width: '40%',border:'1px solid #f0f0f0'}}
            prefix={<PlusOutlined style={{color:'#8c8c8c'}}/>}
            onPressEnter={(e)=>handleKeyUp(e)}
          />
          <DatePicker
            showTime size="large" placeholder='请选择日期' allowClear={false}
            format="YYYY-MM-DD HH:mm:ss" disabledDate={disabledDate}
            onChange={(value,dateString)=>pickDate(value,dateString)}
            style={{width:'30%',border:'1px solid #f0f0f0',margin:'15px 0'}}
          />
        </Input.Group>
        <div className='reminders-list-ul'>
          {reminders.map((item,index)=>{
            return (
              <div className='todo-list-li' key={item.id}
                onMouseEnter={(e)=>setTodoMouse(index)}
                onMouseLeave={(e)=>setTodoMouse(-1)}>
                <label>
                  <span>{item.time}</span>
                  <span style={{margin:'0 0 0 70px'}}>{item.title}</span>
                </label>
                <div className='todo-list-li-button'
                  style={{display:mouseInTodo===index?'block':'none'}}>
                  <button onClick={()=>editReminder(item.id)}>修改</button>
                    <Modal className='editModal' title="修改" okText='确认' cancelText='取消'
                    open={isModalOpen} onOk={()=>handleOk()} onCancel={handleCancel}>
                      <div>
                        <span>提醒时间：</span>
                        <DatePicker
                          showTime size="large" placeholder='请选择日期' allowClear={false}
                          format="YYYY-MM-DD HH:mm:ss" disabledDate={disabledDate}
                          onChange={(value,dateString)=>pickDate(value,dateString)}
                          style={{width:'80%',border:'1px solid #f0f0f0',margin:'15px 0'}}
                        />
                      </div>
                      <div>
                        <span>提醒内容：</span>
                        <Input size='large' style={{width:'80%'}}
                        onChange={(e)=>setEditText(e.target.value)}/>
                      </div>
                    </Modal>
                  <button onClick={()=>dispatch(rmdDelete(item.id))}>删除</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
