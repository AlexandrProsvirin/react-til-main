import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Profile.css';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { AuthContext } from '../Components/AuthContext';

const Profile = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state) {
            setAuth({
                isAuthenticated: true,
                user: location.state
            });
        } else {
            const storedUser = JSON.parse(localStorage.getItem("fio"));
            if (storedUser) {
                setAuth({
                    isAuthenticated: true,
                    user: storedUser
                });
            }
        }
    }, [location.state, setAuth]);

    const username = auth.user ? auth.user.fio : 'John Doe';

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

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            setAuth({ isAuthenticated: false, user: null }); 
            localStorage.removeItem("fio"); 
            navigate("/sign-in"); 
        }
    };



    return (
        <div className="profile-page">
            <header className="headerpr">
                <div className="leftSection">
                    <div className="tilh">
                        <Link to="/" className="til-link">
                            <IconButton onClick={goBack} className="back-button">
                                <ArrowBackIosIcon style={{ color: "white" }} />
                            </IconButton>
                            TIL
                        </Link>
                    </div>
                </div>
                <div className="centerSection2">
                    <div className="linkmenu2" onClick={onHomePageClick}>Home</div>
                    <div className="linkmenu2" onClick={onFAQClick}>FAQ</div>
                    <div className="linkmenu2" onClick={onAboutClickHandler}>ABOUT</div>
                </div>
                <div className="user-menu">
                    <div className="user-info">
                        <Link to="/library" className="linkus">{username}</Link>
                        <IconButton onClick={handleMenuClick}>
                            <MoreVertIcon style={{ color: "white" }} />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </div>
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
