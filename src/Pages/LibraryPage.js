// src/Pages/LibraryPage.js
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import VideoList from '../Components/VideoList'; // Импорт компонента VideoList
import './LibraryPage.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../Components/AuthContext';

function LibraryPage() {
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

    const goBack = () => {
        navigate(-1); // Вернуться на предыдущую страницу
    };

    const onHomePageClick = () => {
        navigate("/");
    };

    const onFAQClick = () => {
      navigate("/faq");
    };
    
    const onProfileClickHandler = () => {
        navigate("/profile");
      };

    const onAboutClickHandler = () => {
      navigate("/about");
    };
    const onUploadClick = () => {
          navigate("/upload");
      };

    return (
        <div className="LibraryPage">
            <header className="headerlib">
            <div className="leftSection">
            <div className="tilh">
          <Link to="/" className="til-link">
          <IconButton onClick={goBack} className="back-button">
                    <ArrowBackIosIcon style={{ color: "white" }} />
                </IconButton>TIL
                </Link></div>
        </div>
        <div className="centerSection3">
          <div className="linkmenu2" onClick={onHomePageClick}>Home</div>
          <div className="linkmenu2" onClick={onUploadClick}>Upload</div>
          <div className="linkmenu2" onClick={onProfileClickHandler}>Profile</div>
          <div className="linkmenu2" onClick={onFAQClick}>FAQ</div>
          <div className="linkmenu2" onClick={onAboutClickHandler}>ABOUT</div>
        </div>
        <div className="user-menu">
                    <div className="user-info">
                        <Link to="/profile" className="linkus">{username}</Link>
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
            <main className="library">
                <VideoList /> 
            </main>
        </div>
    );
}

export default LibraryPage;
