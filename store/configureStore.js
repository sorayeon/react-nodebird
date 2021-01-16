import { createWrapper } from 'next-redux-wrapper';
// import {getDefaultMiddleware} from '@reduxjs/toolkit';
import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import * as process from 'prop-types';
import reducer from '../reducers';
import rootSaga from '../sagas';

const configureStore = () => {
  // saga setting 1
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  // toolkit setting
  // const middlewares = getDefaultMiddleware();

  // redux devtool middleware (composeWithDevTools chrome 플러그인:시간여행 개발만)
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);

  // saga setting 2
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
