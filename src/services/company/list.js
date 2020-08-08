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
    return request(baseUrl + '/company/delete', {
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        params: {id},
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

// 获取下拉列表数据
export const getSelectRemote = () => {
    let placeList = request(baseUrl + '/company/searchArea', {
        method: 'GET'
    });
    let propertyList = request(baseUrl + '/company/searchProperty', {
        method: 'GET'
    });
    return {
        placeList, propertyList
    }
}