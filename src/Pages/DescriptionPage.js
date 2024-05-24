import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './DescriptionPage.css';
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const DescriptionPage = () => {
    const location = useLocation();
    const { video } = location.state || {};
    const navigate = useNavigate();
    const [description, setDescription] = useState('');

    const handleApply = () => {
        navigate("/video", { state: { video } });
        console.log('Description:', description);
    };

    const goBack = () => {
        navigate(-1); 
    };

    return (
        <div className="Description">
            <header className="headervid">
                <Link to="/" className="til-link">
                    <IconButton onClick={goBack} className="back-button">
                        <ArrowBackIosIcon style={{ color: "white" }} />
                    </IconButton>
                    TIL
                </Link>
            </header>
            <main className="iframedescription">
                <iframe
                    src={video}
                    title="Uploaded Video"
                    allowFullScreen
                />
            </main>
            <input
                type="text"
                className="input-field-description"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button
                className="apply-button-description"
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

export default DescriptionPage;
