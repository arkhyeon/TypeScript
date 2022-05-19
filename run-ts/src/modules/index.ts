import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';
import users from './createSlice';

const rootReducer = combineReducers({
  counter,
  users,
  todos,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
