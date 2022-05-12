import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo(state, action) {
      const { id: number, text } = action.payload;
      state.push({ id: id, text: text, completed: false });
    },
    toggleTodo(state, action) {
      const todo = state.find((todo) => todo.id === action.packageCache);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});
