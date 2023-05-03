import React from 'react';
import { Button } from '@mui/material';
import * as Api from '../../api';

const UploadImage = ({ userId, dataId }) => {
    let formData = new FormData();
    formData.append('userId', userId);
    formData.append('dataId', dataId);
    const handleFileSelect = async (e) => {
        const image = e.target.files[0];
        formData.append('image', image)
        await Api.upload('image', formData)
      };

    return (
        <Button variant="contained" component="label">
          Upload
          <input hidden accept="image/*" multiple type="file" onChange={handleFileSelect}/>
        </Button>
    )
};

export default UploadImage;