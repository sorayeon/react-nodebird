import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
  const [buttonType, setButtonType] = useState(['primary', <UserAddOutlined />]);
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: {
          userId: post.User.id,
        },
      });
      setButtonType(['primary', <UserAddOutlined />]);
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: {
          userId: post.User.id,
        },
      });
      setButtonType(['', <UserDeleteOutlined />]);
    }
  }, [isFollowing]);

  return (
    <Button
      size="small"
      type={buttonType[0]}
      icon={buttonType[1]}
      onClick={onClickButton}
      loading={followLoading || unfollowLoading}
    >
      {isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired,
    }),
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    Comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
    })),
    Images: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
    })),
    Likers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })),
  }).isRequired,
};
export default FollowButton;
