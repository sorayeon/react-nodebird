import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { logoutLoading, me } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    // toolkit
    // dispatch(userSlice.actions.logOut());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          트윗
          <br />
          {me.Posts.length}
        </div>,
        <div key="followings">
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key="followings">
          팔로워
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout} loading={logoutLoading}>로그아웃</Button>
    </Card>
  );
};
export default UserProfile;
