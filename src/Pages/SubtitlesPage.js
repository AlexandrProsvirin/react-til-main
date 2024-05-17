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
          className="Apply"
          disableElevation={true}
          color="secondary"
          variant="outlined"
          onClick={handleApply}
          sx={{ borderRadius: "15px", width: 183, height: 69, marginTop: "40px" }} 
        >
          Apply
        </Button>
    </div>
  );
};

export default SubtitlesPage;
