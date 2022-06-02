import { createSlice } from '@reduxjs/toolkit';

export interface User {
  name: string;
}

export const users = createSlice({
  name: 'users',
  initialState: [
    { name: '강동현 수석님' },
    { name: '정세윤 연구원' },
    { name: '방주현 연구원' },
    { name: '김가형 연구원' },
  ] as User[],
  reducers: {},
});

export default users.reducer;
