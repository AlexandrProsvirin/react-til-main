import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AuthContext } from "../Components/AuthContext";
import "./Video.css";
import "./UploadPage.css";
import axios from 'axios';

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { auth } = useContext(AuthContext);
  const username = auth.user ? auth.user.fio : "John Doe";
  const navigate = useNavigate();
  const [videoURL, setVideoURL] = useState(null);
  const [uploading, setUploading] = useState(false);

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
      const response = await axios.post('http://26.56.36.119:3000/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        alert("File uploaded successfully!");
        navigate("/library"); // Перенаправление пользователя после успешной загрузки
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    } finally {
      setUploading(false);
    }
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

          <Link to="/library">
            <div className="user-info">
              {username}
              <img src="/vector.svg" alt="Vector" className="vector-image" />
            </div>
          </Link>
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
      <div className="uploadlinkcontainer">
        {videoURL && (
          <Link className="uploadlink" onClick={handleSubmit}>
            Upload
          </Link>
        )}
      </div>
    </div>
  );
}

export default UploadPage;
