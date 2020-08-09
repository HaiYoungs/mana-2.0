import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, useParams } from 'umi';

import { Button, Space, Drawer, Input, Select, Form, Col, Row, InputNumber, Spin, message, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

// 引入 service
import { updateRemote, deleteRemote, addRemote, getSelectRemote } from '@/services/company/position';

const index = ({ position, dispatch }) => {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    // const [isAdd, setIsAdd] = useState(true); // 区分新增和修改
    const [selTypeList, setSelTypeList] = useState([]); // 下拉列表数据
    const [selPropertyList, setSelPropertyList] = useState([]);

    const params = useParams();
    useEffect(() => {
        if (formRef.current != null) { // 利用表单重置实现表单数据更新
          formRef.current.resetFields();
        }
    },[formData]);
    useEffect(() => {
        if (params.id == ':id') { // 所有职位
            dispatch({
                type: 'position/getRemote',
            });
        } else { // 按公司查看
            dispatch({
                type: 'position/getRemoteById',
                payload: params,
            });
        }
    }, []);

    const columns = [
        {
            title: '编号',
            dataIndex: 'jobId',
            key: 'jobId'
        },
        {
            title: '职位名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '薪资',
            dataIndex: 'salary',
            key: 'salary'
        },
        {
            title: '行业',
            dataIndex: 'property',
            key: 'property'
        },
        {
            title: '职位类型',
            dataIndex: 'type',
            key: 'type'
        },
        {
          title: '经验',
          dataIndex: 'experience',
          key: 'experience'
        },
        {
          title: '学历',
          dataIndex: 'education',
          key: 'education'
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
    let { data, pager } = position; // 表格数组

    const formRef = React.createRef();// 定位表单

    const handleEdit = (record) => {
        getSelectData();
        // record.workMonthMin = Number(record.workMonthMin);
        // record.workMonthMax = Number(record.workMonthMax);
        console.log(record)
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
    

    const handleSubmit = () => {
        const fieldsValue = formRef.current.getFieldsValue();
        setLoading(true);
        // 发送请求
        
            fieldsValue.jobId = formData.jobId;
            console.log(fieldsValue)
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
        
    };

    const handleCancel = () => {
      setVisible(false);
    };

    const getSelectData = () => { // 获取下拉框数据
        const  { typeList, propertyList } = getSelectRemote();
        typeList.then(res => {
            setSelTypeList(res);
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
                headerTitle="职位管理"
                dataSource={data}
            />
            <Drawer
                title="查看/编辑职位信息"
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
                            label="职位名称"
                            rules={[{ required: true, message: '请输入职位名称' }]}
                        >
                            <Input placeholder="请输入职位名称" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name="salary"
                        label="岗位薪资"
                        rules={[{ required: true, message: '请输入岗位薪资' }]}
                        >
                            <Input
                                style={{ width: '100%' }}
                                placeholder="请输入岗位薪资"
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
                            name="type"
                            label="岗位类型"
                            rules={[{ required: true, message: '请选择企业规模' }]}
                        >
                            <Select placeholder="请选择职位类型">
                                {selTypeList.map((item, index) =>
                                    <Option value={item} key={index}>{item}</Option>
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={16}>
                    <Col span={12}>
                        
                        <Form.Item
                            name="workMonthMin"
                            label="实习时长（起）"
                        >
                            <InputNumber defaultValue={3} min={0} max={12}></InputNumber> 个月
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        
                        <Form.Item
                            name="workMonthMax"
                            label="实习时长（止）"
                        >
                            <InputNumber defaultValue={6} min={0} max={12}></InputNumber> 个月
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                        name="experience"
                        label="工作经验要求"
                        rules={[{ required: true, message: '请输入工作经验要求' }]}
                        >
                            <Select placeholder="请选择工作经验要求">
                                <Option value="无经验要求" key={1}>无经验要求</Option>
                                <Option value="1年以内" key={2}>1年以内</Option>
                                <Option value="1-3年" key={3}>1-3年</Option>
                                <Option value="3-5年" key={4}>3-5年</Option>
                                <Option value="5年以上" key={5}>5年以上</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="education"
                            label="学历要求"
                            rules={[{ required: true, message: '请输入学历要求' }]}>
                            <Select placeholder="请选择学历要求">
                                <Option value="不限" key={1}>不限</Option>
                                <Option value="初中及以下" key={2}>初中及以下</Option>
                                <Option value="中专" key={3}>中专</Option>
                                <Option value="高中" key={4}>高中</Option>
                                <Option value="大专" key={5}>大专</Option>
                                <Option value="本科" key={5}>本科</Option>
                                <Option value="硕士" key={5}>硕士</Option>
                                <Option value="博士" key={5}>博士</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                        name="workDay"
                        label="每周工作天数"
                        >
                            <Input placeholder="请输入每周工作天数" />
                        </Form.Item>
                    </Col>
                    </Row>
                    <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="detail"
                            label="岗位详情"
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

const mapStateToProps = ({ position }) => {
    return {
        position,
    }
}

export default connect(mapStateToProps)(index);