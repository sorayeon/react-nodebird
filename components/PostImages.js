import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './imagesZoom';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          src={images[0].src}
          alt={images[0].src}
          role="presentation"
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  } if (images.length === 2) {
    return (
      <>
        <img
          src={images[0].src}
          alt={images[0].src}
          style={{ width: '50%', display: 'inline-block' }}
          role="presentation"
          onClick={onZoom}
        />
        <img
          src={images[1].src}
          alt={images[1].src}
          style={{ width: '50%', display: 'inline-block' }}
          role="presentation"
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <img
        src={images[0].src}
        alt={images[0].src}
        style={{ width: '50%', display: 'inline-block' }}
        role="presentation"
        onClick={onZoom}
      />
      <div
        role="presentation"
        style={{
          width: '50%', display: 'inline-block', textAlign: 'center', verticalAlign: 'middle',
        }}
        onClick={onZoom}
      >
        <PlusOutlined />
        <br />
        {images.length - 1}
        {' '}
        개의 사진 더보기
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
