import { getRemoteList } from '../../services/company/position';

const PositionModel = {
    namespace: 'position',
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
                if (pathname === '/company/position') {
                    dispatch({
                        type: 'getRemote',
                    })
                }
            })
        }
    }
}

export default PositionModel;