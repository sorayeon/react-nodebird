import shortid from 'shortid';
import {
  all, delay, fork, put, takeLatest,
} from 'redux-saga/effects';
import {
  generateDummyPost,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

// function loadPostsAPI(data) {
//   return axios.get('/api/posts', data);
// }

function* loadPosts(action) {
  console.log('loadPosts', action);
  try {
    // const result = yield call(loadPostsAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    console.error('loadPosts err', err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

// function addPostAPI(data) {
//   return axios.post('/api/post', data);
// }

function* addPost(action) {
  console.log('addPost', action);
  try {
    // const result = yield call(addPostAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    yield delay(1000);
    const id = shortid.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        ...action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    console.error('addPost err', err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

// function removePostAPI(data) {
//   return axios.delete('/api/post/:id', data);
// }

function* removePost(action) {
  console.log('removePost', action);
  try {
    // const result = yield call(removePostAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error('removePost err', err);
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

// function addCommentAPI(data) {
//   return axios.post(`/api/post/${data.id}/comment`, data);
// }

function* addComment(action) {
  console.log('addComment', action);
  try {
    // const result = yield call(addCommentAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error('addComment err', err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
