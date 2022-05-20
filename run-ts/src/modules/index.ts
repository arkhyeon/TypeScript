import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';
import users from './createSlice';
import github from './github';

const rootReducer = combineReducers({
  counter,
  users,
  todos,
  github,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
