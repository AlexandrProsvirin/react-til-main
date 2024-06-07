import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './TitlePage.css';
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const TitlePage = () => {
    const location = useLocation();
    const { video } = location.state || {};
    const navigate = useNavigate();
    const [title, setTitle] = useState('');

    const handleApply = () => {
        console.log('Title:', title);
        navigate("/upload", { state: { video, title } });
    };

    const goBack = () => {
        navigate(-1); 
    };

    return (
        <div className="TitlePage">
            <header className="headervid">
                <Link to="/" className="til-link">
                    <IconButton onClick={goBack} className="back-button">
                        <ArrowBackIosIcon style={{ color: "white" }} />
                    </IconButton>
                    TIL
                </Link>
            </header>
            <main className="iframetitle">
                <iframe
                    src={video}
                    title="Uploaded Video"
                    allowFullScreen
                />
            </main>
            <input
                type="text"
                className="input-field-title"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Button
                className="apply-button-title"
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

export default TitlePage;
