import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  Avatar, Button, Card, Divider, List, message, Popconfirm, Popover, Tooltip,
} from 'antd';
import {
  EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import PostCardContent from './PostCardContent';
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, RETWEET_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { removePostLoading, retweetError } = useSelector((state) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  useEffect(() => {
    if (retweetError) {
      message.error(JSON.stringify(retweetError, null, 4)).then();
    }
  }, [retweetError]);

  const onLikePost = useCallback(() => {
    if (!id) {
      message.warn('로그인이 필요합니다.').then();
      return;
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: {
        postId: post.id,
        like: true,
      },
    });
  }, [id]);
  const onUnlikePost = useCallback(() => {
    if (!id) {
      message.warn('로그인이 필요합니다.').then();
      return;
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: {
        postId: post.id,
        like: false,
      },
    });
  }, [id]);

  const onRemovePost = useCallback(() => {
    if (!id) {
      message.warn('로그인이 필요합니다.').then();
      return;
    }
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: {
        postId: post.id,
      },
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      message.warn('로그인이 필요합니다.').then();
      return;
    }
    dispatch({
      type: RETWEET_REQUEST,
      data: {
        postId: post.id,
      },
    });
  }, [id]);

  const liked = post.Likers.find((v) => v.id === id);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages id={post.User.id} images={post.Images} />}
        hoverable
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
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
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗 하셨습니다.` : null}
        extra={(id && post.User.id !== id) && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
          >
            <Card.Meta
              avatar={(
                <Link href={`/user/${post.Retweet.User.id}`}>
                  <a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a>
                </Link>
              )}
              title={(
                <div>
                  {post.Retweet.User.nickname}
                  <Tooltip title={moment(post.Retweet.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                    <span style={{ color: '#ccc', marginLeft: '10px', fontSize: '14px' }}>{moment(post.Retweet.createdAt).fromNow()}</span>
                  </Tooltip>
                </div>
              )}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={(
              <Link href={`/user/${post.User.id}`}>
                <a><Avatar>{post.User.nickname[0]}</Avatar></a>
              </Link>
            )}
            title={(
              <div>
                {post.User.nickname}
                <Tooltip title={moment(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                  <span style={{ color: '#ccc', marginLeft: '10px', fontSize: '14px' }}>{moment(post.createdAt).fromNow()}</span>
                </Tooltip>
              </div>
            )}
            description={<PostCardContent postData={post.content} />}
          />
        )}
        {commentFormOpened && (
          <div>
            <Divider plain>{`${post.Comments.length}개의 댓글`}</Divider>
            <CommentList post={post} />
            {id && <CommentForm post={post} />}
          </div>
        )}
      </Card>
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
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
