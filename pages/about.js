import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';

import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import { LOAD_USER_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const About = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>ZeroCho | NodeBird</title>
      </Head>
      {userInfo
        ? (
          <Card
            actions={[
              <div key="twit">
                짹짹
                <br />
                {userInfo.Posts}
              </div>,
              <div key="following">
                팔로잉
                <br />
                {userInfo.Followings}
              </div>,
              <div key="follower">
                팔로워
                <br />
                {userInfo.Followers}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
              description={userInfo.nickname}
            />
          </Card>
        )
        : null}
    </AppLayout>
  );
};

// 빌드 할 때 html 로 만들어 준다
export const getStaticProps = wrapper.getStaticProps(async (context) => {
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: {
      userId: 1,
    },
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default About;
