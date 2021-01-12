import React, { useState, useCallback } from 'react';
import {
  Avatar, Button, Card, Popconfirm, Popover,
} from 'antd';
import {
  EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import PostCardContent from './PostCardContent';
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { removePostLoading } = useSelector((state) => state.post);
  const onLikePost = useCallback(() => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: {
        postId: post.id,
        like: true,
      },
    });
  }, []);
  const onUnlikePost = useCallback(() => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: {
        postId: post.id,
        like: false,
      },
    });
  }, []);

  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: {
        postId: post.id,
      },
    });
  }, []);

  const liked = post.Likers.find((v) => v.id === id);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlikePost} />
            : <HeartOutlined key="heart" onClick={onLikePost} />,
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {
                (id && post.User.id === id)
                  ? (
                    <>
                      <Button>수정</Button>
                      <Popconfirm
                        title="Are you sure delete this task?"
                        okText="Yes"
                        onConfirm={onRemovePost}
                        cancelText="No"
                      >
                        <Button
                          type="danger"
                          loading={removePostLoading}
                        >
                          삭제
                        </Button>
                      </Popconfirm>
                    </>
                  )
                  : <Button>신고</Button>
              }
              </Button.Group>
          )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={(id && post.User.id !== id) && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <CommentList post={post} />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
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

export default PostCard;
