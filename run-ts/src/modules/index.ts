import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import counter from './counter';
import todos from './todos';
import users from './createSlice';
import github from './github';
import githubSaga from './github/saga';

const rootReducer = combineReducers({
  counter,
  users,
  todos,
  github,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([githubSaga()]);
}
