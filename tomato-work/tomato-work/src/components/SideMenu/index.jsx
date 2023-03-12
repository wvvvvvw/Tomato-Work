import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import '../style.scss'
import { Layout, Menu } from "antd";
import {
  ProfileFilled,
  HomeFilled,
  ScheduleFilled,
  IdcardFilled,
  ClockCircleFilled,
  ReconciliationFilled,
} from "@ant-design/icons";

export default function SideMenu() {
  const location=useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [openKeys,setOpenKeys]=useState()
  const [selectedKeys,setSelectedKeys]=useState("home")
  const { Sider } = Layout
  const navigate=useNavigate()

  function getItem(label, key, icon, children) {
    return { key, icon, children, label };
  }

  const items = [
    getItem("清单首页", "home", <HomeFilled />),
    getItem("开始专注", "sub1", <ClockCircleFilled />, [
      getItem("番茄计时", "pomodoro"),
      getItem("正计时", "positive"),
    ]),
    getItem("今日待办", "todo", <ScheduleFilled />),
    getItem("活动清单", "activity", <ProfileFilled />),
    getItem("提醒事项", "reminders", <ReconciliationFilled />),
    getItem("个人中心", "userCenter", <IdcardFilled />),
  ];

  function handleOpenChange(openKeys) {
    setOpenKeys(openKeys)
  }

  function handleClick(e) {
    navigate(e.key)
  }

  useEffect(()=>{
    const pathName=location.pathname
    for(let i=0;i<items.length;i++){
      const menu=items[i]
      if(Array.isArray(menu.children)){
        // console.log('menu.child',menu.children)
        const findIdx=menu.children.findIndex(menu=>pathName.includes(menu.key))
        if(findIdx!==-1){
          setOpenKeys([menu.key])
          // console.log('menu.children[findIdx]',menu.children[findIdx])
          setSelectedKeys(menu.children[findIdx].key)
          break
        }
      }
      if(pathName.includes(menu.key)){
        setSelectedKeys(menu.key)
        break
      }
    }
  },[location.pathname])

  return (
    <Sider
      className="sideMenu"
      trigger={null}
      width={190}
      collapsible 
      collapsed={collapsed}>

      <div className="sideMenu-logo">Tomato Work</div>
      <Menu
          onClick={handleClick}
          mode="inline"
          style={{ width: 256 }}
          defaultSelectedKeys={["home"]}
          onOpenChange={handleOpenChange}
          selectedKeys={[selectedKeys]}
          openKeys={openKeys}
          items={items}
      />

    </Sider>
  );
}
