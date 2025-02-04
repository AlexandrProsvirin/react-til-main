import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  
  const isAuthenticated = true;

  useEffect(() => {
    
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [navigate, isAuthenticated]);

  const onSignUpButtonClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    }
    if(!isAuthenticated){
    navigate("/choose");
    }
  };

  const onFAQClick = () => {
    navigate("/faq");
  };

  const onAboutClickHandler = () => {
    navigate("/about");
  };

  const onProfileClick = () => {
    
    if (isAuthenticated) {
      navigate("/profile");
    }
  };

  const onUploadClick = () => {
    
    if (isAuthenticated) {
      navigate("/upload");
    }
  };

  return (
    <div>
      <header className="header">
        <div className="leftSection">
          <div className="tilh">TIL</div>
        </div>
        <div className="centerSection">
          <div className="linkmenu" onClick={onProfileClick}>Profile</div>
          <div className="linkmenu" onClick={onUploadClick}>Upload</div>
          <div className="linkmenu" onClick={onSignUpButtonClick}>Sign Up/In</div>
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
            backgroundColor: '#6a0dad',
            color: 'white',
            borderRadius: '15px',
            width: 183,
            height: 69,
            marginTop: '40px',
            '&:hover': {
              backgroundColor: '#5a0dbd',
            }
          }}
        >
          ENTER
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
