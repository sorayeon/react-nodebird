import shortid from 'shortid';
import produce from 'immer';
// toolkit use
// import {createSlice} from '@reduxjs/toolkit';
// import {logInAction} from '../actions/user';

// 기본 state
export const initialState = {
  loginLoading: false, // 로그인 시도중
  loginDone: false,
  loginError: null,
  logoutLoading: false, // 로그아웃 시도중
  logoutDone: false,
  logoutError: null,
  signupLoading: false, // 회원가입 시도중
  signupDone: false,
  signupError: null,
  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  followLoading: false, // 팔로우
  followDone: false,
  followError: null,
  unfollowLoading: false, // 언팔로우
  unfollowDone: false,
  unfollowError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

// dummy user
const dummyUser = (data) => ({
  ...data,
  nickname: '소라연',
  id: shortid.generate(),
  Posts: [],
  Followings: [],
  Followers: [],
});

// action creator
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      draft.loginLoading = true;
      draft.loginDone = false;
      draft.loginError = null;
      break;
    case LOGIN_SUCCESS:
      draft.loginLoading = false;
      draft.loginDone = true;
      draft.me = dummyUser(action.data);
      break;
    case LOGIN_FAILURE:
      draft.loginLoading = false;
      draft.loginError = action.error;
      break;
    case LOGOUT_REQUEST:
      draft.logoutLoading = true;
      draft.logoutDone = false;
      draft.logoutError = null;
      break;
    case LOGOUT_SUCCESS:
      draft.logoutLoading = false;
      draft.logoutDone = true;
      draft.me = null;
      break;
    case LOGOUT_FAILURE:
      draft.logoutLoading = false;
      draft.logoutError = action.error;
      break;
    case SIGNUP_REQUEST:
      draft.signupLoading = true;
      draft.signupDone = false;
      draft.signupError = null;
      break;
    case SIGNUP_SUCCESS:
      draft.signupLoading = false;
      draft.signupDone = true;
      break;
    case SIGNUP_FAILURE:
      draft.signupLoading = false;
      draft.signupError = action.error;
      break;
    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameLoading = true;
      draft.changeNicknameDone = false;
      draft.changeNicknameError = null;
      break;
    case CHANGE_NICKNAME_SUCCESS:
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = true;
      break;
    case CHANGE_NICKNAME_FAILURE:
      draft.changeNicknameLoading = false;
      draft.changeNicknameError = action.error;
      break;
    case FOLLOW_REQUEST:
      draft.followLoading = true;
      draft.followDone = false;
      draft.followError = null;
      break;
    case FOLLOW_SUCCESS:
      draft.followLoading = false;
      draft.followDone = true;
      draft.me.Followings.push({ id: action.data.id });
      break;
    case FOLLOW_FAILURE:
      draft.followLoading = false;
      draft.followError = action.error;
      break;
    case UNFOLLOW_REQUEST:
      draft.unfollowLoading = true;
      draft.unfollowDone = false;
      draft.unfollowError = null;
      break;
    case UNFOLLOW_SUCCESS:
      draft.unfollowLoading = false;
      draft.unfollowDone = true;
      draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.id);
      break;
    case UNFOLLOW_FAILURE:
      draft.unfollowLoading = false;
      draft.unfollowError = action.error;
      break;
    case ADD_POST_TO_ME:
      draft.me.Posts.unshift({ id: action.data });
      break;
    case REMOVE_POST_OF_ME:
      draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data.id);
      break;
    default:
      break;
  }
});

export default reducer;
/* redux-thunk ex
export const loginAction = (data) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(loginRequestAction());
    axios.post('/api/login')
      .then(res => {
        dispatch(loginSuccessAction(res.data))
      })
      .catch(err => {
        dispatch(loginFailureAction(err))
      })
  }
}
export const loginRequestAction = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
    data
  }
}
export const loginSuccessAction = (data) => {
  return {
    type: 'LOG_IN_SUCCESS',
    data
  }
}
export const loginFailureAction = (data) => {
  return {
    type: 'LOG_IN_FAILURE',
    data
  }
} */

/* toolkit 사용방법
  const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { // 동기적인 리듀서
    logOut(state) {
      state.isLoggingIn = false, // 로그인 시도중
      state.isLoggedIn = false,
      state.me = null
    }
  },
  // extraReducers: { // 비동기적인 리듀서
  //   [logInAction.pending](state) { // user/logIn/pending
  //     state.isLoggingIn = true;
  //   },
  //   [logInAction.fulfilled](state, action) { // user/logIn/fulfilled
  //     state.isLoggingIn = false;
  //     state.isLoggedIn = true;
  //     state.me = action.payload;
  //   },
  //   [logInAction.rejected](state) { // user/logIn/rejected
  //     state.isLoggingIn = false;
  //     state.isLoggedIn = false;
  //     state.me = null;
  //   }
  // },
  extraReducers: (builder) => // 비동기적인 리듀서
    builder.addCase(logInAction.pending, (state) => { // user/logIn/pending
      state.isLoggingIn = true;
    }).addCase(logInAction.fulfilled, (state, action) => { // user/logIn/fulfilled
      state.isLoggingIn = false;
      state.isLoggedIn = true;
      state.me = action.payload;
    }).addCase(logInAction.rejected, (state) => { // user/logIn/rejected
      state.isLoggingIn = false;
      state.isLoggedIn = false;
      state.me = null;
    }).addMatcher(action => { // 공통적인 상황 처리
      return action.type.includes('/pending');
    }, state => {
      state.isLoading = true;
    }).addDefaultCase(((state, action) => {
      // default
    }))
  })
*/
