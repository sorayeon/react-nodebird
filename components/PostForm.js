import React, {
  useCallback, useState, useEffect, useRef,
} from 'react';
import { Form, Input } from 'formik-antd';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Formik } from 'formik';
import {Button, message, Space, Tag} from 'antd';
import * as Yup from 'yup';
import { ADD_POST_REQUEST } from '../reducers/post';
import {UploadOutlined} from "@ant-design/icons";

const PostSchema = Yup.object().shape({
  content: Yup.string()
    .min(5, '게시글은 5자 이상 입력하여 주십시오.')
    .required('게시글은 필수 입력 항목 입니다.'),
});

const PostForm = () => {
  const [action, setAction] = useState(null);
  const { imagePaths, addPostLoading, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const imageInput = useRef();

  useEffect(() => {
    if (addPostDone && action) {
      action.setSubmitting(false);
      action.resetForm();
    }
  }, [addPostDone]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Formik
      initialValues={{ content: '' }}
      validationSchema={PostSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        message.info(JSON.stringify(values, null, 4)).then(console.log);
        dispatch({
          type: ADD_POST_REQUEST,
          data: values,
        });
        setAction({ setSubmitting, resetForm });
      }}
    >
      <Form
        style={{ marginBottom: '20px' }}
        encType="multipart/form-data"
      >
        <Input.TextArea
          id="content"
          name="content"
          maxLength={140}
          autoSize={{ minRows: 3, maxRows: 5 }}
          placeholder="어떤 신기한 일이 있었나요?"
        />
        <ErrorMessage component={Tag} name="content" />
        <div>
          <input type="file" multiple hidden ref={imageInput} />
        </div>
        <div style={{ marginTop: '5px', overflow: 'hidden' }}>
          <Button
            onClick={onClickImageUpload}
            style={{ float: 'left' }}
          >
            <UploadOutlined /> Click to Upload
          </Button>
          <Button
            type="primary"
            style={{ float: 'right' }}
            htmlType="submit"
            loading={addPostLoading}
          >
            올리기
          </Button>
        </div>
        <div>
          {imagePaths.map((v) => (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={v} alt={v} style={{ width: '200px' }} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          ))}
        </div>
      </Form>
    </Formik>
  );
};

export default PostForm;
