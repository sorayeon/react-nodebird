import axios from 'axios';
import {
  all, fork, put, takeLatest, call,
} from 'redux-saga/effects';
import {
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
  LIKE_POST_REQUEST,
  LIKE_POST_FAILURE,
  LIKE_POST_SUCCESS,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

function loadPostsAPI(data) {
  return axios.get('/posts', data);
}

function* loadPosts() {
  console.log('loadPosts call');
  try {
    const result = yield call(loadPostsAPI); // call 동기함수를 호출하여 결과값을 받아온다
    console.log('loadPosts api call', result.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error('loadPosts api error', err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/post', data);
}

function* addPost(action) {
  console.log('addPost call', action);
  try {
    const result = yield call(addPostAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    console.log('addPost api call', result.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    console.log('addPost api error', err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data.postId}`);
}

function* removePost(action) {
  console.log('removePost call', action);
  try {
    const result = yield call(removePostAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    console.log('removePost api call', result.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data.PostId,
    });
  } catch (err) {
    console.error('removePost api error', err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data); // POST /post/1/comment
}

function* addComment(action) {
  console.log('addComment call', action);
  try {
    const result = yield call(addCommentAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    console.log('addComment api call', result.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error('addComment api error', err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function likePostAPI(data) {
  if (data.like) {
    return axios.patch(`/post/${data.postId}/like`); // PATCH /post/1/like
  }
  return axios.delete(`/post/${data.postId}/like`); // DELETE /post/1/like
}

function* likePost(action) {
  console.log('likePost call', action);
  try {
    const result = yield call(likePostAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    console.log('likePost api call', result.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: {
        ...result.data,
        like: action.data.like,
      },
    });
  } catch (err) {
    console.error('likePost api error', err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadImagesAPI(data) {
  return axios.post('/post/images', data); // POST /post/images
}

function* uploadImages(action) {
  console.log('uploadImages call', action);
  try {
    const result = yield call(uploadImagesAPI, action.data); // call 동기함수를 호출하여 결과값을 받아온다
    console.log('uploadImages api call', result.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error('uploadImages api error', err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
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
function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUploadImages),
  ]);
}
