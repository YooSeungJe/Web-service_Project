import React, { useEffect, useState } from 'react';
import * as Api from '../../api';
import './ShowImage.css';
import ProgressiveImage from "react-progressive-graceful-image";
//https://www.npmjs.com/package/react-progressive-graceful-image 참조
import loading from '../../image/loading.gif';
import turtle from '../../image/turtle.png';

const ShowImage = ({ userId, dataId, imageKey}) => {
  const [ image, setImage ] = useState(null);
  useEffect(() => {
      const fetchData = async () => {
        const param = `${userId}/${dataId}`;
        const imageData = await Api.get('image', param);
        setImage(imageData.data);
      };
      fetchData();
    }, [userId, dataId, imageKey]);
  return (
    image ?
      <ProgressiveImage
        src={`data:${image.contentType};base64,${image.data}`}
        placeholder={loading}
      >
        {(src) => <img src={src} alt="profile" />}
      </ProgressiveImage>
    : <img src={turtle} alt='profile'/>
  )
};

export default ShowImage;