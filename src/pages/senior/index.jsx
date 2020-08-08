import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'umi';
import moment from 'moment';

import { Button, Space, Drawer, Input, Select, DatePicker,
 Form, Col, Row, InputNumber, Spin, message, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

// 引入 service
import { updateRemote, deleteRemote, addRemote, getSelectRemote } from '@/services/senior';

const index = ({ senior, dispatch }) => {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [isAdd, setIsAdd] = useState(true); // 区分新增和修改 

    useEffect(() => {
        if (formRef.current != null) { // 利用表单重置实现表单数据更新
          formRef.current.resetFields();
        }
    },[formData])
    

    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '姓名',
            dataIndex: 'userName',
            key: 'userName'
        },
        {
            title: '毕业院校',
            dataIndex: 'schoolTag',
            key: 'schoolTab'
        },
        {
            title: '毕业时间',
            dataIndex: 'graduationTime',
            key: 'graduationTime'
        },
        {
            title: '专业',
            dataIndex: 'major',
            key: 'major'
        },
        {
            title: '就职企业',
            dataIndex: 'company',
            key: 'company'
        },
        {
            title: '职业',
            dataIndex: 'job',
            key: 'job'
        },
        {
            title: '就职时间',
            dataIndex: 'jobTime',
            key: 'jobTime'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <Button type="primary" onClick={() => {handleEdit(record)}}>编辑</Button>
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
    let { data } = senior;
    if (data) {
        data = data.map(item => {
            return {...item, key: item.id}
        });
    }
    const formRef = React.createRef();// 定位表单

    const handleEdit = (record) => {
        // 日期加工
        record.graduationTime = moment(record.graduationTime, 'YYYY-MM-DD');
        record.jobTime = moment(record.jobTime, 'YYYY-MM-DD');
        setIsAdd(false);
        setFormData(record);
        if (formRef.current != null) { // 利用表单重置实现表单数据更新
            formRef.current.resetFields();
        }
        setVisible(true);
    };
    const confirm = (id) => {
        // 发请求
        deleteRemote(id)
        .then(res => {
            if (res) {
                message.success('删除成功');
                dispatch({
                    type: 'senior/getRemote'
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
    const handleAdd = () => {
        setIsAdd(true);
        setFormData({});
        if (formRef.current != null) {
            formRef.current.resetFields();
        }
        setVisible(true);
    };

    const handleSubmit = () => {
        const fieldsValue = formRef.current.getFieldsValue();
        fieldsValue.pic = '';
        fieldsValue.graduationTime = moment(fieldsValue.graduationTime).format('YYYY-MM-DD');
        fieldsValue.jobTime = moment(fieldsValue.jobTime).format('YYYY-MM-DD');
        setLoading(true);
        //发送请求
        if (isAdd) { // 新增
            addRemote(fieldsValue)
            .then(res => {
                // if (status == 201) { // 状态码每次不一样？
                    setLoading(false);
                    setVisible(false);
                    message.success('创建成功');
                    dispatch({
                        type: 'senior/getRemote'
                    });
                // }
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setVisible(false);
                message.error('创建失败')
            })
        }else { // 修改
            console.log(fieldsValue)
            fieldsValue.id = formData.id;
            updateRemote(fieldsValue)
            .then(res => {
                if (res.msg == "修改成功") {
                    setLoading(false);
                    setVisible(false);
                    message.success(res.msg);
                    dispatch({
                        type: 'senior/getRemote'
                    });
                }
            })
            .catch(err => {
                setLoading(false);
                message.error(err);
            });
        }
        
    };

    const handleCancel = () => {
      setVisible(false);
    };
    return (
        <PageHeaderWrapper>
            <ProTable
                columns={columns}
                headerTitle="学长管理"
                dataSource={data}
                toolBarRender={() => [
                    <Button key="3" type="primary" onClick={handleAdd}>
                      <PlusOutlined />
                      新建
                    </Button>,
                ]}
            />
            <Drawer
                title="查看/编辑学长信息"
                width={720}
                onClose={handleCancel}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                    style={{
                        textAlign: 'right',
                    }}
                    >
                    <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                        取消
                    </Button>
                    <Button onClick={handleSubmit} type="primary">
                        提交
                    </Button>
                    </div>
                }
            >
                <Spin spinning={loading}>
                <Form layout="vertical"
                    initialValues={formData}
                    ref={formRef}>
                    <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="userName"
                            label="姓名"
                            rules={[{ required: true, message: '请输入学长姓名' }]}
                        >
                            <Input placeholder="请输入学长姓名" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name="schoolTag"
                        label="毕业院校"
                        rules={[{ required: true, message: '请输入毕业院校' }]}
                        >
                            <Input
                                style={{ width: '100%' }}
                                placeholder="请输入毕业院校"
                            />
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="graduationTime"
                            label="毕业时间"
                            rules={[{ required: true, message: '请选择毕业时间' }]}
                        >
                            <DatePicker ></DatePicker>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name="jobTime"
                        label="就职时间"
                        rules={[{ required: true, message: '请输入就职时间' }]}
                        >
                            <DatePicker ></DatePicker>
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={16}>
                    <Col span={12}>
                        
                        <Form.Item
                            label="就职企业"
                            name="company"
                            rules={[{ required: true, message: '请填写就职企业' }]}
                            >
                            <Input placeholder="请输入就职企业" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        
                        <Form.Item
                            label="职业"
                            name="job"
                            rules={[{ required: true, message: '请填写职业' }]}
                            >
                            <Input placeholder="请输入职业" />
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="major"
                            label="专业"
                            rules={[{ required: true, message: '请填写专业' }]}
                        >
                            <Input placeholder="请输入专业" />
                        </Form.Item>
                    </Col>
                    
                    
                    </Row>
                    
                </Form></Spin>
            </Drawer>
        </PageHeaderWrapper>
    )
}

const mapStateToProps = ({ senior }) => {
    return {
        senior,
    }
}

export default connect(mapStateToProps)(index);