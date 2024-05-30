import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VideoList.css';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://26.56.36.119:3000/5/stream', {
          responseType: 'blob'  // Важно для правильной обработки видеофайла
        });
        const videoUrl = URL.createObjectURL(response.data);
        setVideos([videoUrl]);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="videolist">
      <video width="320" height="240" controls>
              <source src={'http://26.56.36.119:3000/5/stream'} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
  );
};
export default VideoList;
