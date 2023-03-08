import React from 'react'
import { Table } from 'antd'

export default function MsgCenter() {
    const columns = [
        {
          title: '序号',
          dataIndex: 'no',
          key: 'no',
          width:'60px'
        },
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
            width:'110px'
        }
    ]
  return (
    <div className='userCenter-msgCenter'>
        <Table columns={columns}></Table>
        {/* <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>暂无数据</span>}/> */}
    </div>
  )
}
