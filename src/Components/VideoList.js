import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VideoList.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from "@mui/material/IconButton";
import Modal from '@mui/material/Modal'; 
import Box from '@mui/material/Box'; 
import Pagination from './Pagination';  // Import Pagination
import usePagination from './usePagination';  // Import usePagination

const VideoList = () => {
  const [videoInfo, setVideoInfo] = useState([]);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 8;

  useEffect(() => {
    const fetchVideoInformation = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("id"));
        const token = JSON.parse(localStorage.getItem("token"));
        
        const response = await axios.get(`http://192.168.193.2:8000/api/video/${userId.id}`, {
          headers: {
            'Authorization': `Bearer ${token.token}`
          }
        });
        
        console.log('Fetched video data:', response.data);
        setVideoInfo(response.data);
      } catch (error) {
        console.error('Error fetching video information:', error);
        setError('Failed to fetch video information.');
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
  };

  const handleDelete = async (video) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.delete(`http://192.168.193.2:8000/api/video/${video.id}`, {
        headers: {
          'Authorization': `Bearer ${token.token}`
        }
      });
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

  const handlePageChange = (pageNumber) => {
    console.log('Page change to:', pageNumber);
    setCurrentPage(pageNumber);
  };

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videoInfo.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(videoInfo.length / videosPerPage);
  const pagesArray = usePagination(totalPages);

  console.log('Current Page:', currentPage);
  console.log('Total Pages:', totalPages);
  console.log('Current Videos:', currentVideos);

  return (
    <div className="videoListWrapper"> 
      <div className="videoListBackground"></div> 
      <div className="videoList">
        {error && <p>{error}</p>}
        {currentVideos.length > 0 ? (
          currentVideos.map((video, index) => {
            const videoUrl = `http://192.168.193.2:3000/${video.identification}/stream`;
            
            return (
              <div key={video.id} className="videoItem">
                <div className="blackBlock"></div> 
                <video width={320} height={240} controls>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
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
      <Pagination className="PaginationUnder"
        pagesArray={pagesArray}
        changePage={handlePageChange}
        currentPage={currentPage}
      />
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
                  <p><strong>Subtitles:</strong> {selectedVideo.subtitle}</p>
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
