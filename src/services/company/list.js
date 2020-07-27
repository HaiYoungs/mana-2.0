import { request } from 'umi';
const baseUrl = 'http://121.199.62.162:8080'; // 服务器地址
// 获取企业列表
export const getRemoteList = async () => {
    return request(baseUrl + '/company/pagelist', {
        method: 'GET',
        params: {
            everyPage: 10,
            clientPage: 1,
        },
    })
    .then(res => {
        if (res.status == 200) {
            return res.data;
        }
    })
    .catch(err => {
        console.log(err);
    })
}

// 修改企业信息
export const updateRemote = async (data) => {
    return request(baseUrl + '/company/update', {
        method: 'POST',
        contentType: 'application/json',
        data,
    });
}

// 删除企业
export const deleteRemote = async (id) => {
    //id = id.toString();
    return request(baseUrl + '/company/delete', {
        method: 'POST',
        data: {id: id},
    });
}

// 新增企业
export const addRemote = async (value) => {
    value.staffNumMin = value.staffNumMin.toString();
    value.staffNumMax = value.staffNumMax.toString();
    value.avaSalary = value.avaSalary.toString();
    return request(baseUrl + '/company/create', {
        method: 'POST',
        data: value
    });
}