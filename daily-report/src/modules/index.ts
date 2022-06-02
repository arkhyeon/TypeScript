import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import users from './createSlice';
import reportList from './report/reducer';
import reportListSaga from './report/saga';

const rootReducer = combineReducers({
  users,
  reportList,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

export function* rootSaga() {
  yield all([reportListSaga()]);
}
