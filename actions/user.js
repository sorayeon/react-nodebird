// toolkit
/*
import {createAsyncThunk} from '@reduxjs/toolkit';

const delay = (time, value) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(value);
  }, time);
});

// createAsyncThunk를 사용할 때는 try catch를 사용하지 않는것이 좋다. 에러가 발생해야 rejected 상태가 되기 때문
export const logInAction = createAsyncThunk('user/logIn', async (data, thunkAPI) => {
  console.log(data);
  //pending, fulfilled, rejected
  //loading, success, failure
  const result = await delay(500, {
    userId: 1,
    nickname: 'solu'
  });
  return result;
});
*/
