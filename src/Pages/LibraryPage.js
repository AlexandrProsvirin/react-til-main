// src/Pages/LibraryPage.js
import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import VideoList from '../Components/VideoList'; // Импорт компонента VideoList
import './LibraryPage.css';
import { AuthContext } from '../Components/AuthContext';

function LibraryPage() {
    const { auth } = useContext(AuthContext);
    const username = auth.user ? auth.user.fio : 'John Doe';
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Вернуться на предыдущую страницу
    };

    const onHomePageClick = () => {
        navigate("/");
    };

    const onFAQClick = () => {
      navigate("/faq");
    };
    
    const onProfileClickHandler = () => {
        navigate("/profile");
      };

    const onAboutClickHandler = () => {
      navigate("/about");
    };
    const onUploadClick = () => {
          navigate("/upload");
      };

    return (
        <div className="LibraryPage">
            <header className="headerlib">
            <div className="leftSection">
            <div className="tilh">
          <Link to="/" className="til-link">
          <IconButton onClick={goBack} className="back-button">
                    <ArrowBackIosIcon style={{ color: "white" }} />
                </IconButton>TIL
                </Link></div>
        </div>
        <div className="centerSection3">
          <div className="linkmenu2" onClick={onHomePageClick}>Home</div>
          <div className="linkmenu2" onClick={onUploadClick}>Upload</div>
          <div className="linkmenu2" onClick={onProfileClickHandler}>Profile</div>
          <div className="linkmenu2" onClick={onFAQClick}>FAQ</div>
          <div className="linkmenu2" onClick={onAboutClickHandler}>ABOUT</div>
        </div>
                <div className="user-info">{username}
                    <img src="/vector.svg" alt="Vector" className="vector-image" />
                </div>
            </header>
            <main className="library">
                <VideoList /> 
            </main>
        </div>
    );
}

export default LibraryPage;
