import {
  all, call, fork, put, takeLatest,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  CHANGE_NICKNAME_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS, REMOVE_FOLLOW_FAILURE, REMOVE_FOLLOW_REQUEST, REMOVE_FOLLOW_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from '../reducers/user';

function loadMyInfoAPI() {
  return axios.get('/user');
}
function* loadMyInfo() {
  console.log('loadMyInfo call');
  try {
    const result = yield call(loadMyInfoAPI); // call 동기함수를 호출하여 결과값을 받아온다
    console.log('loadMyInfo api call', result.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('loadMyInfo api error', err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function loginAPI(data) {
  return axios.post('/user/login', data);
}
function* login(action) {
  console.log('login call', action);
  try {
    const result = yield call(loginAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    console.log('login api call', result.data);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('login api error', err);
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

function logoutAPI() {
  return axios.post('/user/logout');
}
function* logout() {
  console.log('logout call');
  try {
    yield call(logoutAPI); // call 동기함수를 호출하여 결과값을 받아온다
    console.log('logout api call');
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    console.log('logout api error', err);
    yield put({
      type: LOGOUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signupAPI(data) {
  return axios.post('/user', data);
}
function* signup(action) {
  console.log('signup call', action);
  try {
    const result = yield call(signupAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    console.log('signup api call', result.data);
    yield put({
      type: SIGNUP_SUCCESS,
      // data: result.data
    });
  } catch (err) {
    console.log('signup api error', err);
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', data);
}
function* changeNickname(action) {
  console.log('changeNickname call', action);
  try {
    const result = yield call(changeNicknameAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    console.log('changeNickname api call', result.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('changeNickname api error', err);
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}

function followAPI(data) {
  return axios.patch(`/user/${data.userId}/following`);
}
function* follow(action) {
  console.log('follow call', action);
  try {
    const result = yield call(followAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    console.log('follow api call', result.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('follow api error', err);
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function unfollowAPI(data) {
  return axios.delete(`/user/${data.userId}/following`);
}
function* unfollow(action) {
  console.log('unfollow call', action);
  try {
    const result = yield call(unfollowAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    console.log('unfollow api call', result.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('unfollow api error', err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function removeFollowAPI(data) {
  return axios.delete(`/user/${data.userId}/follower`);
}
function* removeFollow(action) {
  console.log('removeFollow call', action);
  try {
    const result = yield call(removeFollowAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    console.log('removeFollow api call', result.data);
    yield put({
      type: REMOVE_FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('removeFollow api error', err);
    yield put({
      type: REMOVE_FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function loadFollowersAPI(data) {
  return axios.get('/user/followers', data);
}
function* loadFollowers(action) {
  console.log('loadFollowers call', action);
  try {
    const result = yield call(loadFollowersAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    console.log('loadFollowers api call', result.data);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('loadFollowers api error', err);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadFollowingsAPI(data) {
  return axios.get('/user/followings', data);
}
function* loadFollowings(action) {
  console.log('loadFollowings call', action);
  try {
    const result = yield call(loadFollowingsAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    console.log('loadFollowings api call', result.data);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log('loadFollowings api error', err);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
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
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchRemoveFollow() {
  yield takeLatest(REMOVE_FOLLOW_REQUEST, removeFollow);
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo), // fork 함수를 실행(비동기), call(동기)
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchChangeNickname),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchRemoveFollow),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
  ]);
}
