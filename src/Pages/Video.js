import React, { useState, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./Video.css"; 
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AuthContext } from '../Components/AuthContext'; 
import axios from 'axios';

function Video() {
    const location = useLocation();
    const { video } = location.state || {};
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const username = auth.user ? auth.user.fio : 'John Doe';
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

    const uploadVideo = async () => {
        try {
            const formData = new FormData();
            formData.append('video', video);
            await axios.post('http://26.56.36.119:3000/video/upload-video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate("/library");
        } catch (error) {
            console.error('Error uploading video:', error);
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
                </IconButton>TIL
                </Link></div>
        </div>
        <div className="centerSection2">
          <div className="linkmenu2" onClick={onHomePageClick}>Home</div>
          <div className="linkmenu2" onClick={onFAQClick}>FAQ</div>
          <div className="linkmenu2" onClick={onAboutClickHandler}>ABOUT</div>
        </div>
      
            <Link to="/library">
                <div className="user-info">{username}
                    <img src="/vector.svg" alt="Vector" className="vector-image" />
                </div>
            </Link>
            </header>
                <main className="iframe">
                    <iframe
                        src={video}
                        title="Uploaded Video"
                        allowFullScreen
                    />
                </main>
            </div>
            <div className="linksall">
                <Link className="links3" to="/title" state={{ video }}>
                    Title
                </Link>
                
                <Link className="links3" to="/description" state={{ video }}>
                    Description
                </Link>
                
                <Link className="links3" to="/subtitles" state={{ video }}>
                    Subtitles
                </Link>
            </div>
            <div className="uploadlinkcontainer">
            <Link className="uploadlink" onClick={uploadVideo}>
                    Upload
                </Link>
            </div>
        </div>
    );
}

export default Video;
