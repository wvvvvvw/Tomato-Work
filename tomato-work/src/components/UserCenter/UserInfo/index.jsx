import React from 'react'
import {Avatar,Descriptions} from 'antd'
import {
    UserOutlined,
  } from "@ant-design/icons";

export default function UserInfo() {
  return (
    <div className='userCenter-userInfo'>
        <div  className='userCenter-userInfo-title'>个人信息</div>
        <hr/>
        <div className='userCenter-userInfo-content'>
            <Avatar size={64} icon={<UserOutlined />} />
            <Descriptions>
              <Descriptions.Item label="UID">020420</Descriptions.Item>
              <Descriptions.Item label="用户名">test</Descriptions.Item>
              <Descriptions.Item label="手机号">11111111111</Descriptions.Item>
              <Descriptions.Item label="邮箱">111111@163.com</Descriptions.Item>
            </Descriptions>
        </div>
    </div>
  )
}
