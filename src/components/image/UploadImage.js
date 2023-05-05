import React, { useState } from 'react';
import { Button, Container, Stack } from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';
import * as Api from '../../api';
import ShowImage from './ShowImage';

const UploadImage = ({ userId, dataId }) => {
  let formData = new FormData();
  formData.append('dataId', dataId);
  const [imageKey, setImageKey] = useState(0);
  const isDeleted = imageKey === -1;
  const isUploaded = imageKey > 0;

  const handleFileSelect = async (e) => {
    const image = e.target.files[0];

    if (image.size > 5 * 1024 * 1024) {
      alert('업로드 가능한 최대 용량은 5MB입니다. ');
      return;
    }
    formData.append('image', image);
    try {
      await Api.upload('image', formData);
      setImageKey(imageKey + 1);
    } catch (error) {
      // console.log(error.response);
      alert('사진 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleFileDelete = async (e) => {
    e.preventDefault();
    setImageKey(0);
    if (window.confirm('사진을 지우시겠습니까?')) {
      try {
        const res = await Api.delete('image', dataId);
        setImageKey(-1);
      } catch (error) {
        // console.log(error.response);
        if (error.response.data === 'Not found') {
          alert('사진이 등록되어 있지 않습니다.');
        } else {
          alert('사진이 삭제되지 않았습니다. 다시 시도해주세요.');
        }
      }
    }
  };

  return (
    <Container disableGutters>
      <ShowImage userId={userId} dataId={dataId} imageKey={imageKey} />
      {isUploaded && (
        <p className='small text-danger text-center'>사진이 등록되었습니다.</p>
      )}
      {isDeleted && (
        <p className='small text-danger text-center'>사진이 삭제되었습니다.</p>
      )}
      <Stack
        maxWidth='md'
        mb={1}
        justifyContent='space-evenly'
        direction='row'
        flexWrap='wrap'
        useFlexGap
      >
        <Button
          variant='contained'
          component='label'
          startIcon={<PhotoCamera />}
          onClick={() => setImageKey(0)}
        >
          업로드
          <input
            hidden
            accept='image/*'
            multiple
            type='file'
            onChange={handleFileSelect}
          />
        </Button>
        <Button
          variant='contained'
          component='label'
          startIcon={<Delete />}
          onClick={handleFileDelete}
        >
          삭제
        </Button>
      </Stack>
    </Container>
  );
};

export default UploadImage;
