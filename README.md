```ts
//index.ts

import './index.css';
import rootReducer, { rootSaga } from './modules';

//Saga Middleware 생성
const sagaMiddleware = createSagaMiddleware();
/**
 * 저장소 설정
 *const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, logger],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    enhancers: [reduxBatch],
  }) 
 */
const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
});

//Saga 실행
sagaMiddleware.run(rootSaga);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
```

1. Generator Function[Saga]
   Saga / function\*은 Generator Function이고 반환 값이 Generator이다.

-   Callee 제너레이터 함수 Caller는 호출하는 함수
-   Caller(호출 함수)는 Callee(제너레이터 함수)가 반환한 제너레이터를 가지고 로직 수행
-   Caller(호출 함수)는 Callee(제너레이터 함수)의 yield(제너레이터 함수 중지, 재개에 사용) 지점에서 다음 진행 여부/시점 제어
-   Caller = sagaMiddleware.run(rootSaga);
-   Callee = export function\* rootSaga() { yield all([reportListSaga()]); }

> Saga는 제너레이터함수이고, 미들웨어는 Saga에게 yield 값을 받아서 또 다른 어떤 동작을 수행할 수 있다. Saga는 명령을 내리는 역할만 하고, 실제 어떤 직접적인 동작은 미들웨어가 처리
> Saga는 명령을 담고 있는, 이펙트라 부르는 순수한 객체를 yield 할 것이고, 미들웨어는 이런 명령들을 해석해 처리하고, 그 결과를 다시 Saga에 돌려준다.

```ts
//modules/index.ts

import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import users from './createSlice';
import reportList from './report/reducer';
import reportListSaga from './report/saga';

/**
 * combineReducers
상태의 독립 서로 다른 리듀서 함수를 단일 리듀서 함수로 변경
리듀서는 모든 자식 리듀서를 호출하고 결과를 단일 상태 객체로 수집
 */
const rootReducer = combineReducers({
    users,
    reportList,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

/**
 *generator function 을 정의하는데, 이 함수는 Generator 객체를 반환
 */
export function* rootSaga() {
    yield all([reportListSaga()]);
}

/**
 * delay(ms, [val])
    설정된 시간 이후에 resolve하는 Promise객체를 리턴한다.
    예시: delay(1000)
    → 1초 기다리기

    put(action)
    특정 액션을 dispatch하도록 한다.
    예시: put({type: 'INCREMENT]})
    →INCREAMENT action을 dispatch한다.

    takeEvery(pattern, saga, ...args)
    들어오는 모든 액션에 대해 특정 작업을 처리해 준다.
    예시: takeEvery(INCREASE_ASYNC, increaseSaga)
    →들어오는 모든 INCREASE_ASYNC액션에 대해 increaseSaga 함수 실행

    takeLatest(pattern, saga, ...args)
    기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행한다.
    예시: takeLatest(DECREASE_ASYNC, decreaseSaga)
    →DECREASE_ASYNC액션에 대해서 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업에 대해서만 decreaseSaga함수를 실행한다.

    call(fn, ...args)
    함수의 첫 번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수이다.
    예시: call(delay, 1000)
    →delay(1000)함수를 call함수를 사용해서 이렇게 쓸 수도 있다.

    call과 put의 다른 점은 put은 스토어에 인자로 들어온 action을 dispatch하고, call인 경우에는 주어진 함수를 실행하게 되는 것이다.

    all([...effects])
    all함수를 사용해서 제너레이터 함수를 배열의 형태로 인자로 넣어주면, 제너레이터 함수들이 병행적으로 동시에 실행되고, 전부 resolve될때까지 기다린다. Promise.all과 비슷하다고 보면된다.
    예시: yield all([testSaga1(), testSaga2()])
    → testSaga1()과 testSaga2()가 동시에 실행되고, 모두 resolve될 때까지 기다린다.
 */
```

```ts
//modules/report/reducer.ts

import { createReducer } from 'typesafe-actions';
import { ReportListAction, ReportListState } from './types';
import { asyncState, createAsyncReducer, transformToArray } from '../../lib/reducerUtils';
import { getReportListAsync } from './actions';

/**
 * typesafe-actions
    안전한 작업, 비동기 작업 쉽게 생성
    리덕스를 사용하는 프로젝트에서 액션 생성 함수와 리듀서를 훨씬 쉽고 깔끔하게 작성
 */

const initialState: ReportListState = {
    reportList: asyncState.initial(),
};
/**
 * createReducer
    리듀서 기능 생성 단순화하는 유틸리티
    내부적으로 immer 사용해 업데이트 논리 대폭 단순화, 특정 작업 유형을 해당 작업이 디스패치될 때 상태를 업데이트하는 케이스 리듀서 함수에 직접 매핑
    일반 redux/toolkit에서는 builder => builder.addCase()문을 사용하는게 좋음.
 * const example = createReducer<state, action>(initialState).handleAction(actionCreator, reducer);
    or
    .handleAction([actionCreator1, actionCreator2, ...actionCreatorN], reducer)
 */
const reportList = createReducer<ReportListState, ReportListAction>(initialState).handleAction(
    //redux transformToArray redux의 값을 action.ts 에서받아옴
    transformToArray(getReportListAsync),
    //createAsyncReducer(AnyAsyncActionCreator, Key)
    createAsyncReducer(getReportListAsync, 'reportList')
);

export default reportList;
```


```ts
//리듀서 리팩토링
//lib/reducerUtils.ts
import { AsyncActionCreatorBuilder, getType } from 'typesafe-actions';
import { AnyAction } from 'redux';

export type AsyncState<T, E = any> = {
    data: T | null;
    loading: boolean;
    error: E | null;
};

export const asyncState = {
    initial: <T, E = any>(initialData?: T): AsyncState<T, E> => ({
        loading: false,
        data: initialData || null,
        error: null,
    }),
    load: <T, E = any>(data?: T): AsyncState<T, E> => ({
        loading: true,
        data: data || null,
        error: null,
    }),
    success: <T, E = any>(data: T): AsyncState<T, E> => ({
        loading: false,
        data,
        error: null,
    }),
    error: <T, E>(error: E): AsyncState<T, E> => ({
        loading: false,
        data: null,
        error,
    }),
};

type AnyAsyncActionCreator = AsyncActionCreatorBuilder<any, any, any>;
export function createAsyncReducer<S, AC extends AnyAsyncActionCreator, K extends keyof S>(asyncActionCreator: AC, key: K) {
    return (state: S, action: AnyAction) => {
        const [request, success, failure] = [asyncActionCreator.request, asyncActionCreator.success, asyncActionCreator.failure].map(getType);
        switch (action.type) {
            case request:
                return {
                    ...state,
                    [key]: asyncState.load(),
                };
            case success:
                return {
                    ...state,
                    [key]: asyncState.success(action.payload),
                };
            case failure:
                return {
                    ...state,
                    [key]: asyncState.error(action.payload),
                };
            default:
                return state;
        }
    };
}

export function transformToArray<AC extends AnyAsyncActionCreator>(asyncActionCreator: AC) {
    const { request, success, failure } = asyncActionCreator;
    return [request, success, failure];
}
```

```ts
//modules/report/reducer.ts
import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { ReportList } from '../../api/reportList';

export const GET_REPORT_LIST = 'report/GET_REPORT_LIST';
export const GET_REPORT_LIST_SUCCESS = 'report/GET_REPORT_LIST_SUCCESS';
export const GET_REPORT_LIST_ERROR = 'report/GET_REPORT_LIST_ERROR';

//비동기 흐름(예: 네트워크 요청 - 요청/성공/실패) 처리를 단순화하기 위해 3개의 향상된 작업 생성기를 포함하는 개체를 만듭니다.
export const getReportListAsync = createAsyncAction(GET_REPORT_LIST, GET_REPORT_LIST_SUCCESS, GET_REPORT_LIST_ERROR)<string, ReportList, AxiosError>();
```

```ts
//modules/report/types.ts

//State, Action Type Setting
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { AsyncState } from '../../lib/reducerUtils';
import { ReportList } from '../../api/reportList';

export type ReportListAction = ActionType<typeof actions>;

//AsyncState 를 사용해서 매번 loading, data, error 의 타입을 직접 입력해줄 필요 없이 한줄로 깔끔하게 작성 할 수 있게 됐습니다.
export type ReportListState = {
    reportList: AsyncState<ReportList, Error>;
};
```

```ts
//modules/report/saga.ts
import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { ReportList } from '../../api/reportList';

export const GET_REPORT_LIST = 'report/GET_REPORT_LIST';
export const GET_REPORT_LIST_SUCCESS = 'report/GET_REPORT_LIST_SUCCESS';
export const GET_REPORT_LIST_ERROR = 'report/GET_REPORT_LIST_ERROR';

export const getReportListAsync = createAsyncAction(GET_REPORT_LIST, GET_REPORT_LIST_SUCCESS, GET_REPORT_LIST_ERROR)<string, ReportList, AxiosError>();
```

```ts
//lib/createAsyncSaga.ts

import { call, put } from 'redux-saga/effects';
import { AsyncActionCreatorBuilder, PayloadAction } from 'typesafe-actions';

type PromiseCreatorFunction<P, T> = ((payload: P) => Promise<T>) | (() => Promise<T>);

function isPayloadAction<P>(action: any): action is PayloadAction<string, P> {
    return action.payload !== undefined;
}

export default function createAsyncSaga<T1, P1, T2, P2, T3, P3>(
    asyncActionCreator: AsyncActionCreatorBuilder<[T1, [P1, undefined]], [T2, [P2, undefined]], [T3, [P3, undefined]]>,
    promiseCreator: PromiseCreatorFunction<P1, P2>
) {
    return function* saga(action: ReturnType<typeof asyncActionCreator.request>): any {
        try {
            const result = isPayloadAction<P1>(action) ? yield call(promiseCreator, action.payload) : yield call(promiseCreator);
            yield put(asyncActionCreator.success(result));
        } catch (e: any) {
            yield put(asyncActionCreator.failure(e));
        }
    };
}
```
