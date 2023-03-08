import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { Row, Col } from "antd";
import {
  ClockCircleTwoTone,
  ScheduleTwoTone,
  ProfileTwoTone,
  ReconciliationTwoTone,
  ScheduleOutlined,
  ProfileOutlined,
  ReconciliationOutlined
} from "@ant-design/icons";
import { storage } from '../../storage/storageUtils';
import {useSelector} from 'react-redux'

export default function Home() {
  const todoList=useSelector(store => store.todo.todoList)
  const activity=useSelector(store => store.activity.activity)
  const reminders=useSelector(store => store.reminder.reminder)
  const focusTime=useSelector(store => store.focus.focusTime)

  const [panel, setPanel] = useState([
    {
      title: "今日专注",
      total: focusTime,
      icon: <ClockCircleTwoTone className="icon" />,
      path: "/pomodoro",
    },
    {
      title: "今日待办",
      total: todoList.length,
      icon: <ScheduleTwoTone className="icon" />,
      path: "/todo",
    },
    {
      title: "活动清单",
      total: activity.length,
      icon: <ProfileTwoTone className="icon" />,
      path: "/activity",
    },
    {
      title: "提醒事项",
      total: reminders.length,
      icon: <ReconciliationTwoTone className="icon" />,
      path: "/reminders",
    },
  ]);

  return (
    <div className="content">
      <Row gutter={[24, 16]}>
        {panel.map((item) => (
          <Col xs={24} sm={24} md={12} lg={6} xl={6} key={item.title}>
            <Link to={item.path} className="module">
              {item.icon}
              <span className="text">
                <div className="module-text-title">{item.title}</div>
                <div className="module-text-content">
                  <span>{item.title==='今日专注'?item.total.substring(0,2):item.total}</span>
                  <span style={{display:item.title==='今日专注'?'block':'none',fontSize: "16px"}}>h</span>
                  &nbsp;<span>{item.title==='今日专注'?item.total.substring(4,6):''}</span>
                  <span style={{display:item.title==='今日专注'?'block':'none',fontSize: "16px"}}>m</span>
                </div>
              </span>
            </Link>
          </Col>
        ))}
      </Row>
      <Row gutter={[24, 16]} style={{ marginTop: "20px" }}>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <div className="content-todoList">
            <span className="content-todoList-title">今日待办</span>
            <div className="content-todoList-ul">
              {todoList.map(item => {
                if(!item.check)
                  return (
                    <div className="content-todoList-li" key={item.id}>
                      <ScheduleOutlined />
                      <label>
                        <span>{item.title}</span>
                      </label>
                    </div>
              )})}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <div>
            <div className="content-todoList">
              <span className="content-todoList-title">活动清单</span>
              <div className="content-todoList-ul">
                {activity.map(item => (
                  <div className="content-todoList-li" key={item.id}>
                    <ProfileOutlined />
                    <label>
                      <span>{item.title}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <div className="content-todoList">
            <span className="content-todoList-title">提醒事项</span>
            <div className="content-todoList-ul">
              {reminders.map(item => (
                <div className="content-todoList-li" key={item.id}>
                  <ReconciliationOutlined />
                  <label>
                    <span>{item.time}</span>
                    <span style={{marginLeft:'40px'}}>{item.title}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
