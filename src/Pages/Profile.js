import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { AuthContext } from '../Components/AuthContext';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Profile = () => {
    const { auth, setAuth } = useContext(AuthContext);
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

    const [anchorEl, setAnchorEl] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSettingsClick = () => {
        setOpenModal(true);
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            setAuth({ isAuthenticated: false, user: null }); 
            localStorage.removeItem("fio"); 
            navigate("/sign-in"); 
        }
    };
    const handleDeleteAccount = async () => {
        try {
            const response = await axios.delete('http://26.56.36.119:8000/api/users');
    
            if (response.status === 200) {
                alert('Account deleted successfully');
                handleLogout(); 
            } else {
                alert('Error deleting account');
            }
        } catch (error) {
            alert('Error deleting account');
            console.error(error);
        }
    };
    
    

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCloseResetPasswordModal = () => {
        setOpenResetPasswordModal(false);
    };

    const handleResetPasswordClick = () => {
        setOpenResetPasswordModal(true);
        setOpenModal(false);  // Close the settings modal when opening the reset password modal
    };

    const handleChangePassword = async () => {
        try {
            const token = auth.token; // Получаем токен доступа из состояния аутентификации
    
            const response = await axios.put('http://26.56.36.119:8000/api/users', {
                oldPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Включаем токен в заголовок запроса
                }
            });
    
            if (response.status === 200) {
                alert('Password changed successfully');
                handleCloseResetPasswordModal();
            } else {
                alert('Error changing password');
            }
        } catch (error) {
            alert('Error changing password');
            console.error(error);
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
