// UploadPage.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./UploadPage.css";

function UploadPage() {
    const navigate = useNavigate();
    const [selectedVideo, setSelectedVideo] = useState(null);

    const goBack = () => {
        navigate(-1); 
    };

    const handleUploadClick = () => {
        document.getElementById("fileInput").click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("video/")) {
            setSelectedVideo(file);
            navigate("/video", { state: { video: URL.createObjectURL(file) } });
        } else {
            alert("Пожалуйста, выберите видео файл.");
        }
    };

    return (
        <div className="UploadPage">
            <header className="headerupl">
                <Link to="/" className="til-link">
                    <IconButton onClick={goBack} className="back-button">
                        <ArrowBackIosIcon style={{ color: "white" }} />
                    </IconButton>
                    TIL
                </Link>
            </header>
            <main className="mainupl">
                <div className="upload">
                    <h1>UPLOAD YOUR FILES HERE</h1>
                    <img src="./file.svg" alt="File upload"></img>
                    <Button
                        className="uplbtns"
                        disableElevation={true}
                        color="secondary"
                        variant="outlined"
                        onClick={handleUploadClick}
                        sx={{ borderRadius: "15px", width: 183, height: 69, marginTop: "40px" }}
                    >
                        UPLOAD
                    </Button>
                    <input id="fileInput" type="file" style={{ display: "none" }} onChange={handleFileChange} />
                </div>
            </main>
        </div>
    );
}

export default UploadPage;
