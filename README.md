# TypeScript
redux TS

1. configureStore 더 나은 개발 경험 선사

const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, logger],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    enhancers: [reduxBatch],
  })

리듀서 설정
const rootReducer = combineReducers({
  counter,
  users,
  todos,
  github,
});

combineReducers
상태의 독립 서로 다른 리듀서 함수를 단일 리듀서 함수로 변경
리듀서는 모든 자식 리듀서를 호출하고 결과를 단일 상태 객체로 수집

createReducer
리듀서 기능 생성 단순화하는 유틸리티
내부적으로 immer 사용해 업데이트 논리 대폭 단순화, 특정 작업 유형을 해당 작업이 디스패치될 때 상태를 업데이트하는 케이스 리듀서 함수에 직접 매핑
일반 redux/toolkit에서는 builder => builder.addCase()문을 사용하는게 좋음.
const github = createReducer<GithubState, GithubAction>(initialState).handleAction(
  transformToArray(getUserProfileAsync),
  createAsyncReducer(getUserProfileAsync, 'userProfile'),
);

typesafe-actions
안전한 작업, 비동기 작업 쉽게 생성
리덕스를 사용하는 프로젝트에서 액션 생성 함수와 리듀서를 훨씬 쉽고 깔끔하게 작성
const example = createReducer<state, action>(initialState).handleAction(actionCreator, reducer);
or
.handleAction([actionCreator1, actionCreator2, ...actionCreatorN], reducer)

export function transformToArray<AC extends AnyAsyncActionCreator>(asyncActionCreator: AC) {
  const { request, success, failure } = asyncActionCreator;
  return [request, success, failure];
}

미들웨어 기능의 선택적 배열
saga or logger

리듀서 기본 값 설정
const preloadedState = {
    todos: [
      {
        text: 'Eat food',
        completed: true,
      },
      {
        text: 'Exercise',
        completed: false,
      },
    ],
    visibilityFilter: 'SHOW_COMPLETED',
  }

  devTools 기본 true
  Redux DevTools browser extension 사용 여부

