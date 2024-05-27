import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AuthContext } from '../Components/AuthContext'; 

const Profile = () => {
    const { auth } = useContext(AuthContext);
    const username = auth.user ? auth.user.fio : 'John Doe';
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const onHomePageClick = () => {
        navigate("/");
    };

    const onFAQClick = () => {
      navigate("/faq");
    };
  
    const onAboutClickHandler = () => {
      navigate("/about");
    };

    const onLibraryClick = () => {
        navigate("/library");
    };

    const onUploadClick = () => {
        navigate("/upload");
    };

    console.log('AuthContext in Profile:', auth);

    return (
        <div className="profile-page">
            <header className="headerpr">
            <div className="leftSection">
            <div className="tilh">
          <Link to="/" className="til-link">
          <IconButton onClick={goBack} className="back-button">
                    <ArrowBackIosIcon style={{ color: "white" }} />
                </IconButton>TIL
                </Link></div>
        </div>
        <div className="centerSection2">
          <div className="linkmenu2" onClick={onHomePageClick}>Home</div>
          <div className="linkmenu2" onClick={onFAQClick}>FAQ</div>
          <div className="linkmenu2" onClick={onAboutClickHandler}>ABOUT</div>
        </div>
      
            <Link to="/Library">
                <div className="user-info">{username}
                    <img src="/vector.svg" alt="Vector" className="vector-image" />
                </div>
            </Link>
            </header>
            <div className="button-container">
                <Button
                    className="profilebtns"
                    disableElevation={true}
                    variant="contained"
                    onClick={onLibraryClick}
                    sx={{
                        backgroundColor: '#6a0dad', // Purple color
                        color: 'white', // White text
                        borderRadius: '15px',
                        width: 183,
                        height: 69,
                        marginTop: '40px',
                        '&:hover': {
                            backgroundColor: '#5a0dbd', // Darker purple on hover,
                        }
                    }}
                >
                    Library
                </Button>
                <div className="tilgr">TIL</div>
                <Button
                    className="profilebtns"
                    disableElevation={true}
                    variant="contained"
                    onClick={onUploadClick}
                    sx={{
                        backgroundColor: '#6a0dad', // Purple color
                        color: 'white', // White text
                        borderRadius: '15px',
                        width: 183,
                        height: 69,
                        marginTop: '40px',
                        '&:hover': {
                            backgroundColor: '#5a0dbd', // Darker purple on hover,
                        }
                    }}
                >
                    Upload
                </Button>
            </div>
        </div>
    );
};

export default Profile;
