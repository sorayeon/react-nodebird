import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, message, Tag,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from 'formik-antd';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentSchema = Yup.object().shape({
  content: Yup.string()
    .min(5, '답글은 5자 이상 입력하여 주십시오.')
    .required('답글은 필수 입력 항목 입니다.'),
});

const CommentForm = ({ post }) => {
  const [action, setAction] = useState(null);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentLoading, addCommentDone } = useSelector((state) => state.post);

  useEffect(() => {
    if (addCommentDone && action) {
      action.setSubmitting(false);
      action.resetForm();
    }
  }, [addCommentDone]);

  return (
    <Formik
      initialValues={{
        content: '',
      }}
      validationSchema={CommentSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        message.info(JSON.stringify(values, null, 4)).then();
        dispatch({
          type: ADD_COMMENT_REQUEST,
          data: {
            postId: post.id,
            userId: id,
            ...values,
          },
        });
        setAction({ setSubmitting, resetForm });
      }}
    >
      <Form>
        <Input.TextArea
          name="content"
          maxLength={50}
          autoSize={{ minRows: 2, maxRows: 4 }}
          placeholder="어떤 신기한 일이 있었나요?"
        />
        <div style={{ position: 'relative', margin: 0 }}>
          <ErrorMessage component={Tag} name="content" />
          <Button
            style={{ position: 'absolute', right: 0, top: 0, zIndex: 1 }}
            type="primary"
            htmlType="submit"
            loading={addCommentLoading}
          >
            댓글달기
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    User: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    createAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
export default CommentForm;
