import React, { useEffect, useState } from 'react';
import axiosInstance from 'axios';
import './VideoList.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from "@mui/material/IconButton";
import Modal from '@mui/material/Modal'; 
import Box from '@mui/material/Box'; 

const VideoList = () => {
  const [videoInfo, setVideoInfo] = useState([]);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchVideoInformation = async () => {
      try {
        console.log(localStorage.getItem('id'));
        const response = await axiosInstance.get(`http://192.168.193.2:8000/video`);
        console.log('Fetched video data:', response.data);
        setVideoInfo(response.data);
      } catch (error) {
        console.error('Error fetching video information:', error);
      
      }
    };

    fetchVideoInformation();
  }, []);

  const handleMenuOpen = (event, index) => {
    setAnchorEl({ index, anchorEl: event.currentTarget });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePropertiesClick = (video) => {
    setSelectedVideo(video);
    setOpenModal(true);
    handleMenuClose();
    console.log('Video properties:', video);
  };

  const handleDelete = async (video) => {
    try {
      const response = await axiosInstance.delete(`http://192.168.193.2:8000/api/video/${video.id}`);
      console.log(response.data.status);
      alert("Video removed");
      window.location.reload(); 
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedVideo(null);
  };

  return (
    <div className="videoListWrapper"> 
      <div className="videoListBackground"></div> 
      <div className="videoList">
        {error && <p>{error}</p>}
        {videoInfo.length > 0 ? (
          videoInfo.map((video, index) => {
            const videoUrl = `http://192.168.193.2:3000/${video.identification}/stream`;
            console.log('Video URL:', videoUrl);
            return (
              <div key={video.id} className="videoItem">
                <div className="blackBlock"></div> 
                <video width={320} height={240} controls>
                  <source src={videoUrl} type="video/mp4" />
                  Ваш браузер не поддерживает видео тег.
                </video>
                <div className="videoInfo">
                  <div className="titleRow">
                    <p className="videoTitle">{video.videoname}</p>
                    <IconButton onClick={(event) => handleMenuOpen(event, index)}>
                      <MoreVertIcon style={{ color: "white" }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl && anchorEl.index === index ? anchorEl.anchorEl : null}
                      open={Boolean(anchorEl && anchorEl.index === index)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handlePropertiesClick(video)}>Properties</MenuItem>
                      <MenuItem onClick={() => handleDelete(video)}>Delete</MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No videos available</p>
        )}
      </div>
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>Video Properties</h2>
              {selectedVideo && (
                <div>
                  <p><strong>Name:</strong> {selectedVideo.videoname}</p>
                  <p><strong>Subtitles:</strong> {selectedVideo.NOTNAME}</p>
                  <p><strong>Description:</strong> {selectedVideo.discription || "No description available"}</p>
                  <p><strong>Created At:</strong> {selectedVideo.created_at || "No information"}</p>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default VideoList;
