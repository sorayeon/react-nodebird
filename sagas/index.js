import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import userSaga from './user';
import postSaga from './post';
import { backendUrl } from '../config/config';

axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true; // front, backend 간 쿠키공유

export default function* rootSaga() {
  yield all([
    fork(userSaga), // fork 함수를 실행(비동기), call(동기)
    fork(postSaga),
  ]);
}
