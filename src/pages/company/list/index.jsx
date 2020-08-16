  import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, history } from 'umi';

import { Button, Space, Drawer, Input, Select, Form, Col, Row, InputNumber, Spin, message, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

// 引入 service
import { updateRemote, deleteRemote, addRemote, getSelectRemote } from '@/services/company/list';

const index = ({ list, dispatch }) => {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [isAdd, setIsAdd] = useState(true); // 区分新增和修改
    const [selPlaceList, setSelPlaceList] = useState(['1', '2', '3']); // 下拉列表数据
    const [selPropertyList, setSelPropertyList] = useState([]);

    useEffect(() => {
        if (formRef.current != null) { // 利用表单重置实现表单数据更新
          formRef.current.resetFields();
        }
    },[formData])
    useEffect(() => {
        if (visible) {
            getSelectData();
        }
    },[visible])

    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '公司名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '所在地',
            dataIndex: 'place',
            key: 'place'
        },
        {
            title: '公司性质',
            dataIndex: 'property',
            key: 'property'
        },
        {
            title: '公司规模',
            dataIndex: 'size',
            key: 'size'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <Button size="small" type="primary" onClick={() => {handleEdit(record)}}>编辑</Button>
                <Popconfirm
                    title="确认删除此纪录?"
                    onConfirm={() => {confirm(record.id)}}
                    onCancel={cancel}
                    okText="是"
                    cancelText="否"
                >
                    <Button size="small" type="danger">删除</Button>
                </Popconfirm>
                <Button size="small" type="default" onClick={() => handlePosition(record.id, record.name)}>查看职位</Button>
              </Space>
            ),
          },
    ];
    let { data } = list;
    if (data) {
        data = data.map(item => {
            return {...item, key: item.id}
        });
    }
    const formRef = React.createRef();// 定位表单

    const handleEdit = (record) => {
        setIsAdd(false);
        setFormData(record);
        console.log(record);
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
                    type: 'list/getRemote'
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
        setFormData({staffNumMin: 0, staffNumMax: 100});
        if (formRef.current != null) {
            formRef.current.resetFields();
        }
        setVisible(true);
    };
    const handlePosition = (id, name) => {
        history.push(`/company/position/${id}/${name}`);
    };

    const handleSubmit = () => {
        const fieldsValue = formRef.current.getFieldsValue();
        setLoading(true);
        // 发送请求
        if (isAdd) { // 新增
            addRemote(fieldsValue)
            .then(res => {
                // if (status == 201) { // 状态码每次不一样？
                    setLoading(false);
                    setVisible(false);
                    message.success('创建成功');
                    dispatch({
                        type: 'list/getRemote'
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
            fieldsValue.id = formData.id;
            updateRemote(fieldsValue)
            .then(res => {
                if (res.msg == "修改成功") {
                    setLoading(false);
                    setVisible(false);
                    message.success(res.msg);
                    dispatch({
                        type: 'list/getRemote'
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

    const getSelectData = () => { // 获取下拉框数据
        const  { placeList, propertyList } = getSelectRemote();
        // console.log(placeList, propertyList)
        placeList.then(res => {
            setSelPlaceList(res);
        }).catch(err => {
            console.log(err);
        });

        propertyList.then(res => {
            setSelPropertyList(res);
        }).catch(err => {
            console.log(err);
        })
    };

    return (
        <PageHeaderWrapper>
            <ProTable
                columns={columns}
                headerTitle="所有企业"
                dataSource={data}
                toolBarRender={() => [
                    <Button key="3" type="primary" onClick={handleAdd}>
                      <PlusOutlined />
                      新建企业
                    </Button>,
                ]}
            />
            <Drawer
                title="查看/编辑企业信息"
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
                            name="name"
                            label="企业名称"
                            rules={[{ required: true, message: '请输入企业名称' }]}
                        >
                            <Input placeholder="请输入企业名称" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name="position"
                        label="地址"
                        rules={[{ required: true, message: '请输入详细地址' }]}
                        >
                            <Input
                                style={{ width: '100%' }}
                                placeholder="请输入详细地址"
                            />
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="property"
                            label="所在行业"
                            rules={[{ required: true, message: '请选择行业' }]}
                        >
                            <Select placeholder="请选择行业"> 
                                {selPropertyList.map((item, index) =>
                                    <Option value={item} key={index}>{item}</Option>
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="size"
                            label="企业规模"
                            rules={[{ required: true, message: '请选择企业规模' }]}
                        >
                            <Select placeholder="请选择企业规模">
                                <Option value="未融资">未融资</Option>
                                <Option value="天使轮">天使轮</Option>
                                <Option value="A 轮">A 轮</Option>
                                <Option value="B 轮">B 轮</Option>
                                <Option value="C 轮">C 轮</Option>
                                <Option value="D 轮">D 轮及以上</Option>
                                <Option value="已上市">已上市</Option>
                                <Option value="不需要融资">不需要融资</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={16}>
                    <Col span={12}>
                        
                        <Form.Item
                            label="员工数量（起）"
                            name="staffNumMin"
                            >
                            <InputNumber defaultValue={0} min={0}></InputNumber>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        
                        <Form.Item
                            label="员工数量（止）"
                            name="staffNumMax"
                            >
                            <InputNumber defaultValue={100} min={0}></InputNumber>
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                        name="avaSalary"
                        label="平均薪资（月薪）"
                        rules={[{ required: true, message: '请输入平均薪资' }]}
                        >
                            <InputNumber defaultValue={10000} min={0}></InputNumber>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="place"
                            label="所在城市"
                            rules={[{ required: true, message: '请输入所在城市' }]}>
                            <Select placeholder="请选择所在城市">
                                {selPlaceList.map((item, index) =>
                                    <Option value={item} key={index}>{item}</Option>
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                        name="workTime"
                        label="工作时间"
                        >
                            <Input placeholder="请输入工作时间描述" />
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="desc"
                            label="企业简介"
                            >
                            <Input.TextArea rows={8} placeholder="在此输入内容" />
                        </Form.Item>
                    </Col>
                    </Row>
                </Form></Spin>
            </Drawer>
        </PageHeaderWrapper>
    )
}

const mapStateToProps = ({ list }) => {
    return {
        list,
    }
}

export default connect(mapStateToProps)(index);