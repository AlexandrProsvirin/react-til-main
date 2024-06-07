import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './SubtitlesPage.css';
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const SubtitlesPage = () => {
    const location = useLocation();
    const { video } = location.state || {};
    const navigate = useNavigate();
    const [subtitles, setSubtitles] = useState('');

    const handleApply = () => {
        navigate("/upload", { state: { video } });
        console.log('Subtitles:', subtitles);
    };

    const goBack = () => {
        navigate(-1); 
    };

    return (
        <div className="Subtitles">
            <header className="headervid">
                <Link to="/" className="til-link">
                    <IconButton onClick={goBack} className="back-button">
                        <ArrowBackIosIcon style={{ color: "white" }} />
                    </IconButton>
                    TIL
                </Link>
            </header>
            <main className="iframesubtitles">
                <iframe
                    src={video}
                    title="Uploaded Video"
                    allowFullScreen
                />
            </main>
            <input
                type="text"
                className="input-field-subtitles"
                placeholder="Enter Subtitles"
                value={subtitles}
                onChange={(e) => setSubtitles(e.target.value)}
            />
            <Button
                className="apply-button-subtitles"
                disableElevation={true}
                variant="contained"
                onClick={handleApply}
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
        </div>
    );
};

export default SubtitlesPage;
