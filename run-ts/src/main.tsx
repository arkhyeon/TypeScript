import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import App from './App';
import reducer from "./rootReducer";

const middleware = [ ...getDefaultMiddleware(), logger ];
const store = configureStore({
    reducer,
    middleware,
});
type AppDispatch = typeof store.dispatch

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
