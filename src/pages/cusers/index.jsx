import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'umi';

import { Button, Space, Drawer, Descriptions , message, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';


// 引入 service
import { deleteRemote, } from '@/services/cusers';

const index = ({ cusers, dispatch }) => {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({});
    

    const columns = [
        {
            title: '头像',
            dataIndex: 'pic',
            key: 'pic',
            render: (t) => (
                <img style={{
                    width: '40%',
                    position: 'absolute',
                    top: '10px',
                    left: '20px',
                }} src={t}></img>
            )
        },
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id'
        },
        
        {
          title: '昵称',
          dataIndex: 'name',
          key: 'name'
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex'
        },
        {
            title: '学校',
            dataIndex: 'schoolName',
            key: 'schoolName'
        },
        {
          title: '入学年份',
          dataIndex: 'year',
          key: 'year'
        },
        {
            title: '期待行业',
            dataIndex: 'trade',
            key: 'trade'
        },
        {
            title: '期待职业',
            dataIndex: 'job',
            key: 'job'
        },
        
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <Button type="primary" onClick={() => {handleEdit(record)}}>查看</Button>
                <Popconfirm
                    title="确认删除此纪录?"
                    onConfirm={() => {confirm(record.id)}}
                    onCancel={cancel}
                    okText="是"
                    cancelText="否"
                >
                    <Button type="danger">删除</Button>
                </Popconfirm>
              </Space>
            ),
        },
    ];
    let { data } = cusers;
    // console.log(data)
    if (data) {
        data = data.map(item => {
            return {...item, key: item.id}
        });
    }

    const handleEdit = (record) => {
        console.log(record)
        setFormData(record);
        // console.log(formData)
        
        setVisible(true);
    };
    const confirm = (id) => {
        // 发请求
        deleteRemote(id)
        .then(res => {
            if (res) {
                message.success('删除成功');
                dispatch({
                    type: 'cusers/getRemote'
                });
            }
        })
        .catch(err => {
            console.log(err);
            message.error('删除失败');
        })
    };
    const cancel = () => {
        message.info('已取消');
    };

    const handleCancel = () => {
      setVisible(false);
    };
    return (
        <PageHeaderWrapper>
            <ProTable
                columns={columns}
                headerTitle="用户管理"
                dataSource={data}
                
            />
            <Drawer
                title="查看用户信息"
                width={720}
                onClose={handleCancel}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
              <Descriptions title={formData.name}>
                <Descriptions.Item label="昵称">{formData.name}</Descriptions.Item>
                <Descriptions.Item label="生日">{formData.birthday}</Descriptions.Item>
                <Descriptions.Item label="性别">{formData.sex}</Descriptions.Item>
                <Descriptions.Item label="学校">{formData.schoolName}</Descriptions.Item>
                <Descriptions.Item label="入学年份">{formData.year}</Descriptions.Item>
                <Descriptions.Item label="院系">{formData.departmentName}</Descriptions.Item>
                <Descriptions.Item label="专业">{formData.majorName}</Descriptions.Item>
                <Descriptions.Item label="班级">{formData.className}</Descriptions.Item>
                <Descriptions.Item label="学号">{formData.studentId}</Descriptions.Item>
                <Descriptions.Item label="期待行业">{formData.trade}</Descriptions.Item>
                <Descriptions.Item label="期待职业">{formData.job}</Descriptions.Item>
                <Descriptions.Item label="就职城市">{formData.city}</Descriptions.Item>
                <Descriptions.Item label="openid">{formData.openid}</Descriptions.Item>
                <Descriptions.Item label="头像">
                    <img style={{ width: '30%' }} src={formData.pic}></img>
                </Descriptions.Item>
              </Descriptions>
            </Drawer>
        </PageHeaderWrapper>
    )
}

const mapStateToProps = ({ cusers }) => {
    return {
      cusers,
    }
}

export default connect(mapStateToProps)(index);