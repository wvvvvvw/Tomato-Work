import React from 'react'
import {Input,Switch} from 'antd'

export default function Settings() {
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
      };
  return (
    <div className='userCenter-settings'>
        <div className='account'>
            <div  className='account-title'>账号设置</div>
            <hr/>
            <div className='account-content'>
                <span>用户名</span>
                <Input placeholder='test' disabled />
                <span>旧密码</span>
                <Input style={{backgroundColor:'white'}}/>
                <span>新密码</span>
                <Input style={{backgroundColor:'white'}}/>
            </div>
        </div>
        <div className='userCenter-settings-message'>
            <div  className='message-title'>消息设置</div>
            <hr/>
            <div className='message-content'>
                <div className='message-content-item'>
                    <div>
                        <p style={{color:'#595959'}}>待办任务</p>
                        <p>开通后将以站内信的形式通知并且通知到邮箱， 否则只会站内信通知</p>
                    </div>
                    <Switch defaultChecked onChange={onChange} />
                </div>
                <hr/>
                <div className='message-content-item'>
                    <div>
                        <p style={{color:'#595959'}}>提醒事项</p>
                        <p>开通后将以站内信的形式通知并且通知到邮箱， 否则只会站内信通知</p>
                    </div>
                    <Switch defaultChecked onChange={onChange} />
                </div>
                <hr/>
            </div>
        </div>
    </div>
  )
}
