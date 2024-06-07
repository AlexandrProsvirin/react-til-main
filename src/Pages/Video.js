import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AuthContext } from "../Components/AuthContext";
import "./Video.css";
import "./UploadPage.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axiosInstance from 'axios';
import LoadingPage from './LoadingPage'; 
import Modal from '@mui/material/Modal'; 
import Box from '@mui/material/Box'; 
import TextField from '@mui/material/TextField';

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataForVideo, setDataForVideo] = useState({ title: '', description: '', subtitles: '' });
  const [videoURL, setVideoURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showLoadingPage, setShowLoadingPage] = useState(false); 

  const { auth, setAuth } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openTitleModal, setOpenTitleModal] = useState(false);
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const [openSubtitlesModal, setOpenSubtitlesModal] = useState(false);

  useEffect(() => {
    if (location.state) {
      setAuth({
        isAuthenticated: true,
        user: location.state
      });
    } else {
      const storedUser = JSON.parse(localStorage.getItem("fio"));
      if (storedUser) {
        setAuth({
          isAuthenticated: true,
          user: storedUser
        });
      }
    }
  }, [location.state, setAuth]);

  const username = auth.user ? auth.user.fio : 'John Doe';

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setAuth({ isAuthenticated: false, user: null }); 
      localStorage.removeItem("fio"); 
      navigate("/sign-in"); 
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const onHomePageClick = () => {
    navigate("/");
  };

  const onFAQClick = () => {
    navigate("/faq");
  };

  const onAboutClickHandler = () => {
    navigate("/about");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setVideoURL(URL.createObjectURL(file));
    }
  };

  const sendDataToAlravel = (identCode, videoname, descript, subtitre) => {
    axiosInstance.post('http://192.168.193.2:8000/api/video', {
      'identification': identCode,
      'videoname': videoname,
      'discription': descript,
      'subtitle': subtitre
    }).then(response => {
      if (response.status === 201) {
        alert("File uploaded.");
        navigate("/library"); 
      } else {
        alert("Failed to upload file.");
      }
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('filedata', selectedFile);

    try {
      await axiosInstance.post('http://192.168.193.2:3000/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        const identCode = response.data;

        if (response.status === 200) {
          sendDataToAlravel(identCode, dataForVideo.title, dataForVideo.description, dataForVideo.subtitles);
        } else {
          alert("Failed to upload file.");
        }
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    } finally {
      setUploading(false);
      setShowLoadingPage(true);
    }
  };

  useEffect(() => {
    if (uploading) {
      setShowLoadingPage(true);
    }
  }, [uploading]);

  if (showLoadingPage) {
    return <LoadingPage />;
  }

  const handleInputChange = (field) => (event) => {
    setDataForVideo({
      ...dataForVideo,
      [field]: event.target.value,
    });
  };

  const handleApply = (modalType) => {
    setOpenTitleModal(false);
    setOpenDescriptionModal(false);
    setOpenSubtitlesModal(false);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="container">
      <div className="embedded-videocontainer">
        <header className="headerpr">
          <div className="leftSection">
            <div className="tilh">
              <Link to="/" className="til-link">
                <IconButton onClick={goBack} className="back-button">
                  <ArrowBackIosIcon style={{ color: "white" }} />
                </IconButton>
                TIL
              </Link>
            </div>
          </div>
          <div className="centerSection2">
            <div className="linkmenu2" onClick={onHomePageClick}>
              Home
            </div>
            <div className="linkmenu2" onClick={onFAQClick}>
              FAQ
            </div>
            <div className="linkmenu2" onClick={onAboutClickHandler}>
              ABOUT
            </div>
          </div>

          <div className="user-menu">
            <div className="user-info">
              <Link to="/profile" className="linkus">{username}</Link>
              <IconButton onClick={handleMenuClick}>
                <MoreVertIcon style={{ color: "white" }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </header>
        <main className="iframe">
          {!videoURL && (
            <div className="upload">
              <h1>UPLOAD YOUR FILES HERE</h1>
              <img src="./file.svg" alt="File upload" />
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Button
                className="uplbtns"
                disableElevation={true}
                variant="contained"
                component="span"
                onClick={() => document.getElementById('fileInput').click()}
                disabled={uploading}
                sx={{
                  backgroundColor: "#6a0dad",
                  color: "white",
                  borderRadius: "15px",
                  width: 183,
                  height: 69,
                  marginTop: "40px",
                  "&:hover": {
                    backgroundColor: "#5a0dbd",
                  },
                }}
              >
                Upload
              </Button>
            </div>
          )}
          {videoURL && (
            <iframe src={videoURL} title="Uploaded Video" allowFullScreen />
          )}
        </main>
      </div>

      {videoURL && (
        <div className="linksall">
          <Link className="links3" onClick={() => setOpenTitleModal(true)}>
            Title
          </Link>

          <Link className="links3" onClick={() => setOpenDescriptionModal(true)}>
            Description
          </Link>

          <Link className="links3" onClick={() => setOpenSubtitlesModal(true)}>
            Subtitles
          </Link>
        </div>
      )}
      
      {videoURL && (
        <div className="uploadlinkcontainer">
          <Link className="uploadlink" onClick={handleSubmit}>
            Upload
          </Link>
        </div>
      )}

      <Modal
        open={openTitleModal}
        onClose={() => setOpenTitleModal(false)}
        aria-labelledby="title-modal-title"
        aria-describedby="title-modal-description"
      >
        <Box sx={modalStyle}>
          <h2 id="title-modal-title">Title</h2>
          <TextField
            label="Title"
            fullWidth
            value={dataForVideo.title}
            onChange={handleInputChange('title')}
          />
          <Button
            className="apply-button-title"
            disableElevation={true}
            variant="contained"
            onClick={() => handleApply('title')}
            sx={{
              backgroundColor: '#6a0dad',
              color: 'white',
              borderRadius: '15px',
              width: 183,
              height: 69,
              '&:hover': {
                backgroundColor: '#5a0dbd',
              }
            }}
          >
            Apply
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openDescriptionModal}
        onClose={() => setOpenDescriptionModal(false)}
        aria-labelledby="description-modal-description"
        aria-describedby="description-modal-description"
      >
        <Box sx={modalStyle}>
          <h2 id="description-modal-description">Description</h2>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={dataForVideo.description}
            onChange={handleInputChange('description')}
          />
          <Button
            className="apply-button-description"
            disableElevation={true}
            variant="contained"
            onClick={() => handleApply('description')}
            sx={{
              backgroundColor: '#6a0dad',
              color: 'white',
              borderRadius: '15px',
              width: 183,
              height: 69,
              '&:hover': {
                backgroundColor: '#5a0dbd',
              }
            }}
          >
            Apply
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openSubtitlesModal}
        onClose={() => setOpenSubtitlesModal(false)}
        aria-labelledby="subtitles-modal-subtitles"
        aria-describedby="subtitles-modal-description"
      >
        <Box sx={modalStyle}>
          <h2 id="subtitles-modal-subtitles">Subtitles</h2>
          <TextField
            label="Subtitles"
            fullWidth
            multiline
            rows={4}
            value={dataForVideo.subtitles}
            onChange={handleInputChange('subtitles')}
          />
          <Button
            className="apply-button-title"
            disableElevation={true}
            variant="contained"
            onClick={() => handleApply('subtitles')}
            sx={{
              backgroundColor: '#6a0dad',
              color: 'white',
              borderRadius: '15px',
              width: 183,
              height: 69,
              '&:hover': {
                backgroundColor: '#5a0dbd',
              }
            }}
          >
            Apply
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default UploadPage;
