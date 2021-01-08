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
    id: PropTypes.string.isRequired,
    User: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    createAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
export default CommentList;
