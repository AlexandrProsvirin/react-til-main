import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VideoList.css';

const VideoList = ({ user_id }) => { // Добавляем параметр userId
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`http://26.56.36.119:3000/api/video/${user_id}`, { // Используем шаблонную строку для вставки userId
          responseType: 'blob' // Важно для правильной обработки видеофайла
        });
        const videoUrl = URL.createObjectURL(response.data);
        setVideos([videoUrl]);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [user_id]); // Добавляем userId в массив зависимостей useEffect

  return (
    <div className="videolist">
      {videos.map(videoUrl => ( // Рендерим список видео
        <video key={videoUrl} width="320" height="240" controls>
          <source src={`http://26.56.36.119:3000/api/video/${user_id}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}
    </div>
  );
};

export default VideoList;
