import React, { useState, useMemo } from 'react';
import * as Api from '../../api';
import './ShowImage.css';

const ShowImage = ({ userId, dataId, imageKey = 0 }) => {
    const [ image, setImage ] = useState({});
    useMemo(() => {
        const fetchData = async () => {
          const param = `${userId}/${dataId}`;
          try{
            const imageData = await Api.get('image', param);
            setImage(imageData.data);
          }catch(e){
            setImage(null)
          }
        };
        fetchData();
      }, [userId, dataId, imageKey]);

      if (image) {
        return (
          <img src={`data:${image.contentType};base64,${image.data}`} />
        );
      }else{
        return (
          <img src='http://placekitten.com/200/200' alt='랜덤 고양이 사진 (http://placekitten.com API 사용)'/> 
        )
      }
};

export default ShowImage;