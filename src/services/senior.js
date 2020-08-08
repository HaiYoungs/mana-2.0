import { request } from 'umi';
const baseUrl = 'http://121.199.62.162:8080'; // 服务器地址

// 获取企业列表
export const getRemoteList = async () => {
    return request(baseUrl + '/senior/pagelist', {
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
    return request(baseUrl + '/senior/update', {
        method: 'POST',
        contentType: 'application/json',
        data,
    });
}

// 删除企业
export const deleteRemote = async (id) => {
    //id = id.toString();
    return request(baseUrl + '/senior/delete', {
        method: 'POST',
        contentType: 'application/json',
        params: {id},
    });
}

// 新增企业
export const addRemote = async (value) => {
    
    return request(baseUrl + '/senior/create', {
        method: 'POST',
        data: value
    });
}
