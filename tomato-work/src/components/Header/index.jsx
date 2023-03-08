import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
// import '../style.scss'
import { Popover,Avatar,Empty } from 'antd';
import {
  GithubFilled,
  BellFilled,
  CompassFilled,
  UserOutlined,
  PoweroffOutlined
} from "@ant-design/icons";

export default function Header() {
  const [messageList,setMessageList]=useState([])
  const popoverList = [
    { name: '个人信息', path: '/userCenter/userInfo' },
    { name: '消息中心', path: '/userCenter/msgCenter' },
    { name: '账号设置', path: '/userCenter/settings' }
  ]
  const messageContent = useMemo (()=>(
    <div className='message-popover'>
      <div className="msg-header">
        <span className="msg-left">站内消息通知</span>
        <Link className="msg-right" to="/userCenter/msgCenter">消息接收管理</Link>
      </div>
      {messageList.length > 0 ? (
        <>
          {messageList.map(item => (
          <div className="item-block ls" key={item.id}>
            <div className="content">{item.content}</div>
            <div className="date">{item.createdAt}</div>
          </div>
        ))}
        <Link className="item-block ls" to="/home/setting/innerMessage">查看更多</Link>
        </>
      ) : (
        <Empty style={{ padding: '20px 0' }} />
      )}
    </div>
  ),[messageList])

  const userContent = (
    <div className="user-popover">
      {popoverList.map(el => (
        <Link to={el.path} key={el.name} className="user-ls">{el.name}</Link>
      ))}
      <div className="user-signOut">
        <PoweroffOutlined style={{ fontSize: '14px', marginRight: '5px' }} />
        退出
      </div>
    </div>
  );

  return (
    <div className='header'>
      <div className='left'>
      </div>
      <ul className='right'>
        <Popover content={messageContent} trigger="hover">
          <li className='header-icon'>
            <BellFilled style={{fontSize:'20px'}}/>
          </li>
        </Popover>
        <li className='header-icon'><CompassFilled style={{fontSize:'20px'}}/></li>
        <li className='header-icon'><GithubFilled style={{fontSize:'20px'}}/></li>
        <Popover placement="topLeft" content={userContent}>
          <li style={{display:'flex',paddingInline:'10px',alignItems:'baseline'}}>
            <Avatar icon={<UserOutlined />}/>
            &nbsp;<span>123</span>
          </li>
        </Popover>
      </ul>
    </div>
  )
}
