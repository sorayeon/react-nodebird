import {
  all, delay, fork, put, takeLatest,
} from 'redux-saga/effects';
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from '../reducers/user';

// function loginAPI(data) {
//   return axios.post('/api/login', data);
// }
function* login(action) {
  try {
    // const result = yield call(loginAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    yield delay(1000);
    yield put({
      type: LOGIN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

// function logoutAPI() {
//   return axios.post('/api/logout');
// }
function* logout() {
  try {
    // const result = yield call(logoutAPI); // call 동기함수를 호출하여 결과값을 받아온다
    yield delay(1000);
    yield put({
      type: LOGOUT_SUCCESS,
      // data: result.data
    });
  } catch (err) {
    yield put({
      type: LOGOUT_FAILURE,
      error: err.response.data,
    });
  }
}

// function signupAPI() {
//   return axios.post('/api/logout');
// }
function* signup() {
  try {
    // const result = yield call(signupAPI); // call 동기함수를 호출하여 결과값을 받아온다
    yield delay(1000);
    yield put({
      type: SIGNUP_SUCCESS,
      // data: result.data
    });
  } catch (err) {
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

// function followAPI() {
//   return axios.post('/api/follow');
// }
function* follow(action) {
  try {
    // const result = yield call(followAPI); // call 동기함수를 호출하여 결과값을 받아온다
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

// function unfollowAPI() {
//   return axios.post('/api/unfollow');
// }
function* unfollow(action) {
  try {
    // const result = yield call(unfollowAPI); // call 동기함수를 호출하여 결과값을 받아온다
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

// take 한번만 수행
// takeEvery while(true) 대체
// takeLatest 실수로 두번 클릭했을때 마지막것만 실행
//    (요청은 그대로 두번, 응답만 취소한다 백엔드 서버에서 같은 요청에 대해 처리해야함)
// throttle (스크롤링 구현)설정한 시간만큼 요청을 받아준다.
// debounce (ajax 검색)
function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin), // fork 함수를 실행(비동기), call(동기)
    fork(watchLogout),
    fork(watchSignup),
    fork(watchFollow),
    fork(watchUnfollow),
  ]);
}
