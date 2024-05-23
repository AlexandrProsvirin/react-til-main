import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./HomePage.css";


function HomePage() {
  const navigate = useNavigate();

  const onSignUpButtonClick = () => {
    navigate("/choose");
  };

  const onFAQClick = () => {
    navigate("/faq");
  };

  const onAboutClickHandler = () => {
    navigate("/about");
  };

  return (
    <div>
      <header className="header">
      <div className="leftSection">
        <div className="tilh">TIL</div>
      </div>
      <div className="rightSection">
        <div className="linkh" onClick={onFAQClick}>FAQ</div>
        <div className="linkh" onClick={onAboutClickHandler}>ABOUT</div>
      </div>
    </header>
      <div className="main">
        <div className="til">TIL</div>
        <div className="todayILearned">Today I Learned</div>
        <div className="toStartUploading">To start uploading videos sign in</div>
        <Button
          className="SignIn"
            disableElevation={true}
            variant="contained"
            onClick={onSignUpButtonClick}
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
  SIGN UP/IN
</Button>
      </div>
    </div>
  );
}

export default HomePage;
