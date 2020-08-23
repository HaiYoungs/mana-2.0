import { getRemoteList, getRemoteListById } from '../../services/company/position';

const PositionModel = {
    namespace: 'position',
    state: {
        name: '',
        pageInfo: {},
    },
    reducers: {
        getDataList(state, { payload }) {
            return {...payload};
        }
    },
    effects: {
        *getRemote({ payload }, { put, call }) {
            const data = yield call(getRemoteList, payload);
            console.log(data)
            yield put({
                type: 'getDataList',
                payload: { data }
            })
        },
        *getRemoteById({ payload, callback }, { put, call }) {
            const data = yield call(getRemoteListById, payload);
            console.log(data)
            yield put({
                type: 'getDataList',
                payload: { data: data.data },
            });
            callback(data.pager)
        }
    },
    subscriptions: {
        // setup({ dispatch, history }) {
        //     return history.listen(({ pathname }) => {
        //         console.log(pathname)
        //         if (pathname === '/company/position/:id/:name') {
        //             dispatch({
        //                 type: 'getRemote',
        //                 payload: {
        //                     everyPage: 10,
        //                     clientPage: 1,
        //                 }
        //             })
        //         }
        //     })
        // }
    }
}

export default PositionModel;