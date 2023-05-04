import React, { useState, useEffect } from 'react';
import { Button, Container, Stack } from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material'
import * as Api from '../../api';
import ShowImage from './ShowImage';

const UploadImage = ({ userId, dataId }) => {
    let formData = new FormData();
    formData.append('dataId', dataId);
    const [ imageKey, setImageKey ] = useState(0);

    const handleFileSelect = async (e) => {
      const image = e.target.files[0];
      if(image.size > 5 * 1024 * 1024){
        alert('업로드 가능한 최대 용량은 5MB입니다. ');
        return;
      }
      formData.append('image', image);
      try{
        await Api.upload('image', formData);
        setImageKey(imageKey + 1);
      }catch(err){
        console.error(err);
        alert('사진 등록에 실패했습니다. 다시 시도해주세요.');
      }
    };

    const handleFileDelete = async (e) => {
      e.preventDefault();
      if(window.confirm('사진을 지우시겠습니까?')){
        try{
          const res = await Api.delete('image',dataId);
          console.log(res.data);
          setImageKey(imageKey + 1);
        }catch(err){
          console.error(err);
          alert('사진이 삭제되지 않았습니다. 다시 시도해주세요.');
        };
      };
    };

    useEffect(() => {
      console.log(imageKey);
    }, [imageKey]);

    return (
      <Container>
        <Stack direction="row" spacing={{ xs: 2, sm: 1 }} useFlexGap flexWrap="wrap">
          <ShowImage userId={userId} dataId={dataId} imageKey={imageKey}/>
          <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
            Upload
            <input hidden accept="image/*" multiple type="file" onChange={handleFileSelect}/>
          </Button>
          <Button variant="contained" component="label" startIcon={<Delete />} onClick={handleFileDelete}>
            Delete
          </Button>
        </Stack>
      </Container>
    )
};

export default UploadImage;