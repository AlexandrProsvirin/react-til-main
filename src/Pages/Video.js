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
import LoadingPage from './LoadingPage'; // Импортируем компонент LoadingPage

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showLoadingPage, setShowLoadingPage] = useState(false); // Добавляем состояние для отображения LoadingPage

  const { auth, setAuth } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

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

  const [anchorEl, setAnchorEl] = useState(null);

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

  function sendDataToAlravel(identCode, videoname, descript, subtitre) {
    axiosInstance.post('http://26.56.36.119:8000/api/video', {
      'identification': identCode,
      'videoname': videoname,
      'discription': descript,
      'NOTNAME': subtitre
    }).then(response => {
      if (response.status === 201) {
        navigate("/library"); // Перенаправление пользователя после успешной загрузки
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
      await axiosInstance.post('http://26.56.36.119:3000/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        const identCode = response.data;

        if (response.status === 200) {
          sendDataToAlravel(identCode, 'name', 'disc', 'sub');
        } else {
          alert("Failed to upload file.");
        }
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    } finally {
      setUploading(false);
      setShowLoadingPage(true); // Показать страницу загрузки после загрузки файла
    }
  };

  // Сразу отображаем LoadingPage если пользователь нажал на ссылку "Upload"
  useEffect(() => {
    if (uploading) {
      setShowLoadingPage(true);
    }
  }, [uploading]);

  if (showLoadingPage) {
    return <LoadingPage />;
  }

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
          <Link className="links3" to="/title" state={{ selectedFile }}>
            Title
          </Link>

          <Link className="links3" to="/description" state={{ selectedFile }}>
            Description
          </Link>

          <Link className="links3" to="/subtitles" state={{ selectedFile }}>
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
    </div>
  );
}

export default UploadPage;
