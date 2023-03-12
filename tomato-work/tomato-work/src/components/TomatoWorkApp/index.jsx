import React from 'react'
import { useRoutes } from 'react-router-dom'
import { Layout } from 'antd'
import SideMenu from '../SideMenu'
import Header from '../Header'
import './style.scss'
import Router from '../Router'
import Float from '../Float'

export default function TomatoWorkApp() {
  const element=useRoutes(Router)

  return (
    <Layout className='layout'>
      <SideMenu/>
      <Layout className="site-layout">
        <Header/>
        {element}
        <Float/>
      </Layout>
    </Layout>
  )
}
