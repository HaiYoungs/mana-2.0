import { request } from 'umi';
const baseUrl = 'http://121.199.62.162:8080'; // 服务器地址

// 获取职位列表
export const getRemoteList = async () => {
    return request(baseUrl + '/job/pagelist', {
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
// 根据公司 id 获取职位列表
export const getRemoteListById = async params => {
    return request(baseUrl + '/job/search', {
        method: 'POST',
        params: {
            everyPage: 10,
            clientPage: 1,
            id: params.id,
        }
    })
    .then(res => {
        console.log(res);
        return res;
    })
    .catch(err => {
        console.log(err);
    })
}

// 修改职位信息
export const updateRemote = async (data) => {
    return request(baseUrl + '/job/update', {
        method: 'POST',
        contentType: 'application/json',
        data,
    });
}

// 删除职位
export const deleteRemote = async (id) => {
    //id = id.toString();
    return request(baseUrl + '/job/delete', {
        method: 'POST',
        contentType: 'application/json',
        params: {id},
    });
}

// 新增职位
export const addRemote = async (value) => {
    return request(baseUrl + '/job/create', {
        method: 'POST',
        data: value
    });
}

// 获取下拉列表数据
export const getSelectRemote = () => {
    let typeList = request(baseUrl + '/job/search', {
        method: 'GET',
        contentType: 'application/json',
    });
    let propertyList = request(baseUrl + '/company/searchProperty', {
        method: 'GET'
    });
    return {
        typeList, propertyList
    }
}