import { request } from 'umi';
const baseUrl = 'http://121.199.62.162:8080'; // 服务器地址

// 获取用户列表
export const getRemoteList = async () => {
    return request(baseUrl + '/user/pagelist', {
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



// 删除用户
export const deleteRemote = async (id) => {
    //id = id.toString();
    return request(baseUrl + '/senior/delete', {
        method: 'POST',
        params: {id},
    });
}

