import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
import axiosInstance from '../Axios/axiosInstance';

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
    const [openNameModal, setOpenNameModal] = useState(false);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [newName, setNewName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');

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
            localStorage.removeItem("token"); 
            localStorage.removeItem("id"); 
            navigate("/sign-in"); 
        }
    };

    const handleOpenNameModal = () => {
        setOpenNameModal(true);
    };

    const handleCloseNameModal = () => {
        setOpenNameModal(false);
    };

    const handleOpenPasswordModal = () => {
        setOpenPasswordModal(true);
    };

    const handleClosePasswordModal = () => {
        setOpenPasswordModal(false);
    };

    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    const handleUpdateName = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const userId = auth.user.id;
    
            // Получение данных пользователя
            const userResponse = await axios.get(`http://192.168.193.2:8000/api/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            // Обновление атрибутов пользователя
            userResponse.data.fio = newName;
    
            // Отправка обновленных данных на сервер
            const updateResponse = await axios.put(`http://192.168.193.2:8000/api/users`, {
                id: userId,
                fio: userResponse.data.fio,
                email: userResponse.data.email,
                birthday: userResponse.data.birthday,
                password: userResponse.data.password,
                genderId: userResponse.data.genderId,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            setAuth({
                isAuthenticated: true,
                user: updateResponse.data
            });
            localStorage.setItem("fio", JSON.stringify(updateResponse.data));
            handleCloseNameModal();
        } catch (error) {
            console.error('Error updating name:', error);
        }
    };

    const handleChangePassword = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.put(`http://192.168.193.2:8000/api/users`, {
                current_password: currentPassword,
                new_password: newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.error) {
                setError(response.data.error);
            } else {
                setError('');
                handleClosePasswordModal();
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setError('An error occurred. Please try again.');
        }
    };

    const handleDeleteUser = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            await axios.delete(`http://192.168.193.2:8000/api/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAuth({ isAuthenticated: false, user: null });
            localStorage.removeItem("fio");
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            handleCloseDeleteModal();
            navigate("/sign-in");
        } catch (error) {
            console.error('Error deleting user:', error);
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
                            <MenuItem onClick={handleOpenNameModal}>Change Name</MenuItem>
                            <MenuItem onClick={handleOpenPasswordModal}>Change Password</MenuItem>
                            <MenuItem onClick={handleOpenDeleteModal}>Delete Account</MenuItem>
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
            <Modal
                open={openNameModal}
                onClose={handleCloseNameModal}
                aria-labelledby="name-modal-title"
                aria-describedby="name-modal-description"
            >
                <Box className="modal-box">
                    <h2 id="name-modal-title">Change Name</h2>
                    <TextField
                        label="New Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateName}
                    >
                        Update
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={openPasswordModal}
                onClose={handleClosePasswordModal}
                aria-labelledby="password-modal-title"
                aria-describedby="password-modal-description"
            >
                <Box className="modal-box">
                    <h2 id="password-modal-title">Change Password</h2>
                    <TextField
                        label="Current Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleChangePassword}
                    >
                        Update
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
            >
                <Box className="modal-box">
                    <h2 id="delete-modal-title">Delete Account</h2>
                    <p id="delete-modal-description">Are you sure you want to delete your account? This action cannot be undone.</p>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDeleteUser}
                    >
                        Delete
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default Profile;
