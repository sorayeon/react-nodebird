import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
// toolkit
// import userSlice from './user';
import user from './user';
import post from './post';

// * (이전상태, 액션) => 다음상태를 만들어 내는 함수
// const rootReducer = combineReducers({
//   index: (state = {}, action) => {
//     switch (action.type) {
//       case HYDRATE:
//         return {
//           ...state, ...action.payload,
//         };
//       default:
//         return state;
//     }
//   },
//   // toolkit
//   // user: userSlice.reducer,
//   user,
//   post,
// });
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
