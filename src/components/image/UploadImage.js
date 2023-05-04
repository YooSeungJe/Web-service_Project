import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material'
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
      }catch(e){
        console.log(`error:${e}`);
      }
    };

    return (
      <>
        <ShowImage userId={userId} dataId={dataId} imageKey={imageKey} />
        <Box>
          <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
            Upload
            <input hidden accept="image/*" multiple type="file" onChange={handleFileSelect}/>
          </Button>
          <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
            Delete
            <input hidden accept="image/*" multiple type="file" onChange={handleFileSelect}/>
          </Button>
        </Box>
      </>
    )
};

export default UploadImage;