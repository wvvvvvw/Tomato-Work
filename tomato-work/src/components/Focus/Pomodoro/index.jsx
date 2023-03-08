import React, { useRef, useState, useEffect } from 'react'
import '../style.scss'
import { Progress,Button,Slider,message } from 'antd';
import { storage } from '../../../storage/storageUtils';
import { useSelector,useDispatch } from 'react-redux'
import {focusTimeChange} from '../../../redux/features/focusSlice'

export default function Pomodoro() {
  // 总的专注时间
  const focusTime=useSelector(store => store.focus.focusTime)
  const dispatch=useDispatch()
  // 是否开始专注标识
  const [beginFocus, setBeginFocus] = useState(false)
  // 按钮文本
  const [buttonText,setButtonText]=useState('开始')
  // 已专注的时间--秒
  const [time,setTime]=useState(0)
  // 选择的专注时间
  const [interval,selectInterval]=useState(45)
  let h=parseInt(focusTime.substring(0,2))
  let m=parseInt(focusTime.substring(4,6))
  

  function selectTime(value){
    selectInterval(value)
  }

  let timer=useRef()
  
  const handleClick=(text)=>{
    if(buttonText==='开始'||(buttonText==='继续专注'&&text==='继续专注')){
      timer.current=setInterval(()=>{
        setTime(time=>{return time+1})
      },1000)
    }else if(buttonText==='暂停'){
      clearInterval(timer.current)
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
  },[focusTime])

  useEffect(()=>{
    if(time===interval*60){
      message.success('番茄计时已完成')
      if(m+interval>=60){
        h=h+1
        m=m+interval-60
      }else{
        m=m+interval
      }
      dispatch(focusTimeChange((h>9?h:'0'+h)+'h '+(m>9?m:'0'+m)+'m'))
      setTime(0)
      setButtonText('开始')
      clearInterval(timer.current)
    }
  },[time])

  return (
    <div className='focus'>
      <div className='focus-left'>
        <Progress 
          type="circle"
          percent={time*100/(interval*60)}
          format={(percent)=>`${Math.trunc(percent)}%`}
          strokeWidth={4}
          width={300}
          className='progress'/>
        <Button
          style={{
            marginTop:'30px',width:'100px',
            backgroundColor:buttonText==='继续专注'||buttonText==='开始'?'#1677ff':'white',
            color:buttonText==='继续专注'||buttonText==='开始'?'white':'#1677ff',
          }}
          onClick={(e)=>handleClick(e.target.innerText)}>
          {buttonText}
        </Button>
        <Button
          style={{
            display:buttonText==='继续专注'?'block':'none',
            marginTop:'30px',width:'100px'
          }}
          onClick={(e)=>handleClick(e.target.innerText)}>
            结束
        </Button>
      </div>
      <div className='focus-right'>
        <div className='focus-right-setTime'>
          <span>选择时间</span>
          <Slider max={60} min={1} defaultValue={45} disabled={buttonText!=='开始'} onChange={(value)=>selectTime(value)}/>
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
