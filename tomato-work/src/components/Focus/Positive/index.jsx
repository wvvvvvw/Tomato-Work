import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import '../style.scss'
import { Progress,Button,Slider,message } from 'antd';
import { storage } from '../../../storage/storageUtils';
import {useSelector,useDispatch} from 'react-redux'
import {focusTimeChange,focusRecordAdd,focusHourAdd} from '../../../redux/features/focusSlice'
import moment from 'moment'

export default function Positive() {
  // 总的专注时间
  const focusTime=useSelector(store => store.focus.focusTime)
  const focusRecord=useSelector(store => store.focus.focusRecord)
  const dispatch=useDispatch()
  // 是否开始专注标识
  const [beginFocus, setBeginFocus] = useState(false)
  // 按钮文本
  const [buttonText,setButtonText]=useState('开始')
  // 已专注的时间--秒
  const [time,setTime]=useState(0)
  // 开始专注时间
  const [startTime,setStartTime]=useState()
  let h=parseInt(focusTime.substring(0,2))
  let m=parseInt(focusTime.substring(4,6))

  let timer=useRef()

  // var orignalSetItem = storage.setItem;
  // storage.setItem = function (key, newValue) {
  //   var setItemEvent = new Event("setItemEvent");
  //   setItemEvent.newValue = newValue;
  //   window.dispatchEvent(setItemEvent);
  //   orignalSetItem.apply(this, arguments);
  // }
  
  const handleClick=(text)=>{
    // console.log(text)
    if(buttonText==='开始'||(buttonText==='继续专注'&&text==='继续专注')){
      setStartTime(moment().format("HH:mm"))
      timer.current=setInterval(()=>{
        setTime(time=>{return time+1})
      },1000)
    }else if(buttonText==='暂停'){
      clearInterval(timer.current)
      dispatch(focusRecordAdd({startTime:startTime,endTime:moment().format("HH:mm")}))
      dispatch(focusHourAdd({hour:startTime.substring(0,2)*1,time:moment().format("mm")-startTime.substring(3)}))
      setStartTime('')
    }else if(text==='结 束'){
      clearInterval(timer.current)
      if(time>=60){
        let add=Math.trunc(time/60)
        if(m+add>=60){
          h=h+1
          m=m+add-60
        }else{
          m=m+add
        }
        dispatch(focusTimeChange((h>9?h:'0'+h)+'h '+(m>9?m:'0'+m)+'m'))
        if(startTime!==''){
          dispatch(focusRecordAdd({startTime:startTime,endTime:moment().format("HH:mm")}))
          dispatch(focusHourAdd({hour:startTime.substring(0,2)*1,time:moment().format("mm")-startTime.substring(3)}))
        }
        // setFocusTime((h>9?h:'0'+h)+'h '+(m>9?m:'0'+m)+'m')
      }
      setTime(0)
    }
    setBeginFocus(!beginFocus)
    if(buttonText==='开始'||(buttonText==='继续专注'&&text==='继续专注'))setButtonText('暂停')
    else if(buttonText==='暂停')setButtonText('继续专注')
    else if(text==='结 束')setButtonText('开始')
  }

  useEffect(()=>{
    storage.setItem('focusTime',focusTime)
    console.log('focusRecord',focusRecord)
  },[focusTime])

  const firstUpdate=useRef(true)
  useLayoutEffect(()=>{
    if(firstUpdate.current){
        firstUpdate.current=false
        return
    }else{
        message.success('正计时已完成')
    }
  },[focusTime])

  return (
    <div className='focus'>
      <div className='focus-left'>
        <Progress 
          type="circle"
          percent={(time%60)*100/60}
          format={(percent)=>`${Math.trunc(percent*60/100)}`}
          strokeWidth={4}
          width={300}
          className='progress'/>
        <Button style={{
          marginTop:'30px',width:'100px',
          backgroundColor:buttonText==='继续专注'||buttonText==='开始'?'#1677ff':'white',
            color:buttonText==='继续专注'||buttonText==='开始'?'white':'#1677ff',
        }} onClick={(e)=>handleClick(e.target.innerText)}>
          {buttonText}
        </Button>
        <Button
          style={{display:buttonText==='继续专注'?'block':'none',marginTop:'30px',width:'100px'}}
          onClick={(e)=>handleClick(e.target.innerText)}>
            结束
        </Button>
      </div>
      <div className='focus-right'>
        <div className='focus-right-setTime'>
          <span>选择时间</span>
          <Slider max={60} defaultValue={45} disabled={true}/>
        </div>
        <div>
          <div className='focus-right-text-title'>今日专注</div>
          <div className='focus-right-text-content'>
              <span>{focusTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
