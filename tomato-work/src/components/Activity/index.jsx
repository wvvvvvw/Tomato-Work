import React, { useState,useEffect } from 'react'
import './style.scss'
import {nanoid} from 'nanoid'
import { Input,Modal } from 'antd'
import {
  PlusOutlined,
} from "@ant-design/icons";
import { storage } from '../../storage/storageUtils';
import {useSelector,useDispatch} from 'react-redux'
import {
  actAdd,
  actDelete,
  actEdit,
  detailEdit
} from '../../redux/features/actSlice'

export default function Activity() {
  const activity=useSelector(store=>store.activity.activity)
  const dispatch=useDispatch()
  const [mouseIn,setMouse]=useState(-1)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editText,setEditText]=useState()
  const [detailBlock,setDetailBlock]=useState(false)
  const [detailItem,setDetailItem]=useState()
  const [editId,setEditId]=useState()
  const { TextArea } = Input;

  function handleKeyUp(e){
    // 解构赋值获取keyCode,target
    const {target}=e
    if(target.value.trim()!==''){
      dispatch(actAdd(target.value))
      // 清空输入框
      target.value=''
    }
  }

  function editTodo(id){
    setIsModalOpen(true)
    setEditId(id)
  }

  const handleOk = () => {
    dispatch(actEdit({
      id:editId,
      title:editText
    }))
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const viewDetails=(id)=>{
    setDetailBlock(true)
    setDetailItem(id)
  }

  useEffect(() => {
    storage.setItem('activity',JSON.stringify(activity))
  }, [activity])

  return (
    <div className='todo'>
      <div className='todo-list'>
        <span className='todo-list-title'>活动清单</span>
        <Input
          size="large"
          placeholder="添加活动"
          style={{border:'1px solid #f0f0f0'}}
          prefix={<PlusOutlined style={{color:'#8c8c8c'}}/>}
          onPressEnter={(e)=>handleKeyUp(e)}/>
        <ul className='todo-list-ul'>
          {activity.map((item,index)=>(
            <div className='todo-list-li' key={item.id}
              onMouseEnter={(e)=>setMouse(index)}
              onMouseLeave={(e)=>setMouse(-1)}
              onClick={()=>viewDetails(item.id)}>
              <label>
                <span>{item.title}</span>
              </label>
              <div className='todo-list-li-button'
                style={{display:mouseIn===index?'block':'none'}}>
                <button onClick={()=>editTodo(item.id)}>修改</button>
                <Modal title="修改" okText='确认' cancelText='取消'
                open={isModalOpen} onOk={()=>handleOk()} onCancel={handleCancel}>
                  <div>
                    <span style={{width:'10%'}}>活动：</span>
                    <Input size='large' onChange={(e)=>setEditText(e.target.value)}/>
                  </div>
                </Modal>
                <button onClick={()=>dispatch(actDelete(item.id))}>删除</button>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div style={{display:detailBlock?'block':'none'}} className='detailPage'>
        {activity.map((item,index)=>{
          if(item.id===detailItem)
            return (
              <div key={item.id}>
                <span className='todo-list-title'>{item.title}</span>
                <TextArea placeholder='描述' defaultValue={item.text} bordered={false}
                  onPressEnter={(e)=>dispatch(detailEdit({
                    text:e.target.value,
                    id:item.id
                  }))}
                />
              </div>
          )})}
      </div>
    </div>
  )
}
