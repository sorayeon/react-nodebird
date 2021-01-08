import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
// toolkit
// import userSlice from './user';
import user from './user';
import post from './post';

// * (이전상태, 액션) => 다음상태를 만들어 내는 함수
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return {
          ...state, ...action.payload,
        };
      default:
        return state;
    }
  },
  // toolkit
  // user: userSlice.reducer,
  user,
  post,
});

export default rootReducer;
