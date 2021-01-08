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
          id: post.User.id,
        },
      });
      setButtonType(['primary', <UserAddOutlined />]);
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: {
          id: post.User.id,
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
    id: PropTypes.string.isRequired,
    User: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    createAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
export default FollowButton;
