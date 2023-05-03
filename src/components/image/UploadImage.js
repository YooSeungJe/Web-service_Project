import React, { useState } from 'react';
import { Button } from '@mui/material';
import * as Api from '../../api';
import ShowImage from './ShowImage';

const UploadImage = ({ userId, dataId }) => {
    let formData = new FormData();
    formData.append('dataId', dataId);
    const [ imageKey, setImageKey ] = useState(0);

    const handleFileSelect = async (e) => {
      const image = e.target.files[0];
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
        <Button variant="contained" component="label">
          Upload
          <input hidden accept="image/*" multiple type="file" onChange={handleFileSelect}/>
        </Button>
      </>
    )
};

export default UploadImage;