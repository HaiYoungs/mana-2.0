import { getRemoteList } from '../../services/senior';

const seniorModel = {
    namespace: 'senior',
    state: {
        name: '',
    },
    reducers: {
        getDataList(state, { payload }) {
            return payload;
        }
    },
    effects: {
        *getRemote(action, { put, call }) {
            const data = yield call(getRemoteList);
            yield put({
                type: 'getDataList',
                payload: { data }
            })
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/senior') {
                    dispatch({
                        type: 'getRemote',
                    })
                }
            })
        }
    }
}

export default seniorModel;