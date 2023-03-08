export var storage=window.localStorage

const todoList = [
    { id: "01", title: "react课设", check: false },
    { id: "02", title: "阅读一小时", check: false },
    { id: "03", title: "做算法题", check: false },
]

const activity = [
    { id: "01", title: "班会", text:"主题：拒绝毒品" },
    { id: "02", title: "操作系统考点", text:"第一章 第二章" }
]

const reminders = [
    { id: "01", title: "react课设", time: "2023-02-24 15:00:00" },
    { id: "02", title: "软件质量考试", time: "2023-02-25 09:50:00" },
]

const focusTime='00h 00m'

const time='0'
const buttonText='开始'
const interval='45'

storage.setItem('todoList',JSON.stringify(todoList))
storage.setItem('activity',JSON.stringify(activity))
storage.setItem('reminders',JSON.stringify(reminders))
storage.setItem('focusTime',focusTime)
storage.setItem('time',time)
storage.setItem('buttonText',buttonText)
storage.setItem('interval',interval)