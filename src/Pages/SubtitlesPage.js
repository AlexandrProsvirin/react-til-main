import React, { useState } from 'react';
import './SubtitlesPage.css';
import { Button } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const SubtitlesPage = () => {
    const goBack = () => {
        navigate(-1); 
    };
    const navigate = useNavigate();
  const [title, setTitle] = useState('');

  const handleApply = () => {
    navigate("/video");
    console.log('Title:', title);
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
      <input
        type="text"
        className="input-field"
        placeholder="Enter Subtitles"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
          className="Applysub"
            disableElevation={true}
            variant="contained"
            onClick={handleApply}
          sx={{
            backgroundColor: '#6a0dad', // Purple color
            color: 'white', // White text
            borderRadius: '15px',
            width: 183,
            height: 69,
            marginTop: '40px',
            '&:hover': {
           backgroundColor: '#5a0dbd', // Darker purple on hover
        }
    }}
>
  Apply
</Button>

    </div>
  );
};

export default SubtitlesPage;
