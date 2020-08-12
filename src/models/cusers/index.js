import { getRemoteList } from '../../services/cusers';

const cusersModel = {
    namespace: 'cusers',
    state: {
        name: '',
    },
    reducers: {
        getDataList(state, { payload }) {
            return payload;
        }
    },
    effects: {
        *getRemote(_, { put, call }) {
            const data = yield call(getRemoteList);
            console.log(data);
            yield put({
                type: 'getDataList',
                payload: { data }
            })
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/cusers') {
                    dispatch({
                        type: 'getRemote',
                    })
                }
            })
        }
    }
}

export default cusersModel;