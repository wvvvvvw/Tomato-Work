import React, { useState,useRef,useEffect } from "react";
import { Progress, Button,Slider,message,Select } from "antd"
import { ClockCircleFilled } from "@ant-design/icons"
import { storage } from "../../storage/storageUtils"
import "./style.scss"
import { useSelector,useDispatch } from 'react-redux'
import {focusTimeChange,focusRecordAdd,focusHourAdd} from '../../redux/features/focusSlice'
import moment from 'moment'

export default function Float() {
  const focusTime=useSelector(store => store.focus.focusTime)
  const focusRecord=useSelector(store => store.focus.focusRecord)
  const dispatch=useDispatch()
  const [clickBtn, setClickBtn] = useState(false)
  const [focusType,setFocusType] = useState('番茄计时')
  const [beginFocus, setBeginFocus] = useState(false)
  // 按钮文本
  const [buttonText, setButtonText] = useState("开始")
  // 已专注的时间--秒
  const [time, setTime] = useState(0);
  // 开始专注时间
  const [startTime,setStartTime]=useState()
  const [interval, selectInterval] = useState(45);
  let h = parseInt(focusTime.substring(0, 2));
  let m = parseInt(focusTime.substring(4, 6));

  const handleClick = () => {
    setClickBtn(!clickBtn);
  };

  let timer=useRef()

  const handleClickFocus=(text)=>{
    console.log(text)
    if(buttonText==='开始'||(buttonText==='继续'&&text==='继 续')){
      setStartTime(moment().format("HH:mm"))
      timer.current=setInterval(()=>{
        setTime(time=>time+1)
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
      }
      setTime(0)
    }
    setBeginFocus(!beginFocus)
    if(buttonText==='开始'||(buttonText==='继续'&&text==='继 续'))setButtonText('暂停')
    else if(buttonText==='暂停')setButtonText('继续')
    else if(text==='结 束')setButtonText('开始')
  }

  function selectTime(value){
    selectInterval(value)
  }

  function handleSelect(value,option){
    setFocusType(value)
  }

  useEffect(()=>{
    storage.setItem("focusTime", focusTime)
    console.log('focusRecord',focusRecord)
  },[focusTime])

  useEffect(()=>{
    if(focusType==='番茄计时'&&time===interval*60){
        message.success('番茄计时已完成')
        if(m+interval>=60){
            h=h+1
            m=m+interval-60
        }else{
            m=m+interval
        }
        dispatch(focusTimeChange((h>9?h:'0'+h)+'h '+(m>9?m:'0'+m)+'m'))
        dispatch(focusRecordAdd({startTime:startTime,endTime:moment().format("HH:mm")}))
        dispatch(focusHourAdd({hour:startTime.substring(0,2)*1,time:moment().format("mm")-startTime.substring(3)}))
        setTime(0)
        setButtonText('开始')
        clearInterval(timer.current)
    }
  },[time])

  return (
    <div>
      <div
        className="float-content"
        style={{ display: clickBtn ? "block" : "none" }}
      >
        <div className="float-content-top">
          <Progress
            type="circle"
            percent={
                focusType==='番茄计时'?((time*100)/(interval*60)):((time%60)*100/60)
            }
            format={(percent) => 
                focusType==='番茄计时'?`${Math.trunc(percent)}%`:`${Math.trunc(percent*60/100)}`
            }
            strokeWidth={4}
            width={60}
            className="progress"
          />
          <div style={{width:'90px'}}>
            <div className='float-content-top-setTime'>
                <span style={{fontSize:'10px',color:'#8c8c8c'}}>选择时间</span>
                <Slider max={60} min={1} defaultValue={45} style={{width:'70px'}}
                    disabled={buttonText!=='开始'||focusType==='正计时'} 
                    onChange={(value)=>selectTime(value)}
                />
            </div>
            <div className='float-content-top-btns'>
                <Button
                    style={{
                    backgroundColor:
                        buttonText === "继续" || buttonText === "开始"
                        ? "#1677ff"
                        : "white",
                    color:
                        buttonText === "继续" || buttonText === "开始"
                        ? "white"
                        : "#1677ff",
                    }}
                    onClick={(e) => handleClickFocus(e.target.innerText)}
                >
                    {buttonText}
                </Button>
                <Button
                    style={{
                        display: buttonText === "继续" ? "block" : "none",
                    }}
                    onClick={(e) => handleClickFocus(e.target.innerText)}
                >
                    结束
                </Button>
            </div>
          </div>
        </div>
        <div className="float-content-bottom">
            <Select
                defaultValue="番茄计时"
                style={{width: '100px'}}
                onChange={handleSelect}
                bordered={false}
                options={[
                    {
                    value: '番茄计时',
                    label: '番茄计时',
                    },
                    {
                    value: '正计时',
                    label: '正计时',
                    },
                ]}
            />
            <div className="float-content-bottom-text">
                <span style={{color:'#595959'}}>今日专注</span>
                <span style={{color:'#8c8c8c'}}>{focusTime}</span>
            </div>
            
        </div>
      </div>
      <div className="float" onClick={() => handleClick()}>
        <ClockCircleFilled />
      </div>
    </div>
  );
}
