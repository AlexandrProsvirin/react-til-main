import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import "./Video.css"; 
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Video() {
    const location = useLocation();
    const { video } = location.state || {};
    const [isPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate();

    const handlePlayButtonClick = () => {
        setIsPlaying(true);
    };

    const goBack = () => {
        navigate(-1); 
    };

    
    const onSignUpClick = () => {
        
    };

    return (
        <div className="container">
            <div className="embedded-videocontainer">
                <header className="headervid">
                    <Link to="/" className="til-link">
                        <IconButton onClick={goBack} className="back-button">
                            <ArrowBackIosIcon style={{ color: "white" }} />
                        </IconButton>
                        TIL
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
                <Link className="links3" to="/title">
                    Title
                </Link>
                
                <Link className="links3" to="/description">
                    Description
                </Link>
                
                <Link className="links3" to="/subtitles">
                    Subtitles
                </Link>
            </div>
            <div className="uploadlinkcontainer">
                <Link className="uploadlink" to="/library">
                    Upload
                </Link>
            </div>
        </div>
    );
    
}

export default Video;
