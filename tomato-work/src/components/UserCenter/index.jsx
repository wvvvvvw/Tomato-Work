import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './style.scss'
import {Menu} from 'antd'
import UserInfo from './UserInfo';

export default function UserCenter() {
    const navigate=useNavigate()
    const location=useLocation()
    const [selectedKeys,setSelectedKeys]=useState("userInfo")
    function getItem(label, key, icon, children) {
        return { key, icon, children, label }
    }

    function handleClick(e) {
        navigate(e.key)
    }
    
    const items = [
        getItem("个人信息", "userInfo"),
        getItem("消息中心", "msgCenter"),
        getItem("账号设置", "settings"),
    ]

    const pathName=location.pathname
    useEffect(()=>{
        // console.log('pathName',pathName)
        for(let i=0;i<items.length;i++){
            const menu=items[i]
            if(pathName.includes(menu.key)){
                setSelectedKeys(menu.key)
                break
            }
        }
    },[location.pathname])

  return (
    <div className='userCenter'>
        <Menu
            className="userCenter-nav"
            mode="inline"
            defaultSelectedKeys={['userInfo']}
            onClick={handleClick}
            selectedKeys={[selectedKeys]}
            items={items}
        />
        <div className='userCenter-content'>
            {pathName==='/userCenter'?<UserInfo/>:<Outlet/>}
        </div>
    </div>
  )
}
