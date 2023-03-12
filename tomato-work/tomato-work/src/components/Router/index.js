import React from 'react'
import Pomodoro from '../Focus/Pomodoro'
import Home from '../Home'
import Todo from '../Todo'
import Activity from '../Activity'
import Reminders from '../Reminders'
import UserCenter from '../UserCenter'
import UserInfo from '../UserCenter/UserInfo'
import MsgCenter from '../UserCenter/MsgCenter'
import Settings from '../UserCenter/Settings'
import Positive from '../Focus/Positive'

const route=[
    {
        path:'/home',
        element:<Home/>
    },
    {
        path:'/pomodoro',
        element:<Pomodoro/>
    },
    {
        path:'/positive',
        element:<Positive/>
    },
    {
        path:'/todo',
        element:<Todo/>
    },
    {
        path:'/activity',
        element:<Activity/>
    },
    {
        path:'/reminders',
        element:<Reminders/>
    },
    {
        path:'/userCenter',
        element:<UserCenter/>,
        children:[
            {
                path:'userInfo',
                element:<UserInfo/>
            },
            {
                path:'msgCenter',
                element:<MsgCenter/>
            },
            {
                path:'settings',
                element:<Settings/>
            },
            // {
            //     path:'*',
            //     element:<UserInfo/>
            // }
        ]
    },
    {
        path:'/',
        element:<Home/>
    }
]

export default route