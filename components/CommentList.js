import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Comment, List } from 'antd';

const CommentList = ({ post }) => (
  <List
    header={`${post.Comments.length}개의 댓글`}
    itemLayout="horizontal"
    dataSource={post.Comments}
    renderItem={(item) => (
      <li>
        <Comment
          author={item.User.nickname}
          avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
          content={item.content}
        />
      </li>
    )}
  />
);

CommentList.propTypes = {
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

export default CommentList;
