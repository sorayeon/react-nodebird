import { all, fork } from 'redux-saga/effects';
import userSaga from './user';
import postSaga from './post';

export default function* rootSaga() {
  yield all([
    fork(userSaga), // fork 함수를 실행(비동기), call(동기)
    fork(postSaga),
  ]);
}
