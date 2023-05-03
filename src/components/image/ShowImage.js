import React, { useState, useEffect } from 'react';
import * as Api from '../../api';

const ShowImage = ({ userId, dataId }) => {
    const [ image, setImage ] = useState({});
    useEffect(() => {
        const fetchData = async () => {
          const param = `${userId}/${dataId}`;
          const imageData = await Api.get('image', param);
          setImage(imageData.data);
          console.log(image);
        };
        fetchData();
    
      }, [userId, dataId]);
      if (!image) {
        return (
            <img src='http://placekitten.com/200/200' alt='랜덤 고양이 사진 (http://placekitten.com API 사용)'/> 
        )
      }
      return (
        <>
          <img src={`data:${image.contentType};base64,${image.data}`} />
        </>
      );
};

export default ShowImage;