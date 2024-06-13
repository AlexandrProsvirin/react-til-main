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
import axiosInstance from '../Axios/axiosInstance';
import { AuthContext } from '../Components/AuthContext';

const Profile = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [openUsersModal, setOpenUsersModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
   
    useEffect(() => {
        const fio = localStorage.getItem("fio");
        const id = localStorage.getItem("id");
        
        const parsedFio = fio ? JSON.parse(fio) : null;
        const parsedId = id ? JSON.parse(id) : null;
    
        console.log('Retrieved fio from localStorage:', parsedFio); 
        console.log('Retrieved id from localStorage:', parsedId);
    
        if (parsedFio && parsedId) {
            const storedUser = { fio: parsedFio.fio, id: parsedId.id };
            if (!isNaN(storedUser.id)) { 
                setAuth((prevAuth) => ({
                    isAuthenticated: true,
                    user: { ...prevAuth.user, fio: storedUser.fio, id: storedUser.id }
                }));
            } else {
                console.error('Invalid id:', parsedId.id);
            }
        }
    }, [setAuth]);
    
    useEffect(() => {
        if (location.state) {
            setAuth({
                isAuthenticated: true,
                user: location.state
            });
        }
    }, [location.state, setAuth]);
    
    useEffect(() => {
        console.log('Updated user in auth:', auth.user);
    }, [auth.user]);
    
    
    

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

    const handleChangePassword = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            if (!token) {
                throw new Error('Token not found');
            }
    
            if (!auth || !auth.user || !auth.user.id) {
                throw new Error('User ID not found');
            }
    
            const userId = auth.user.id;
    
            const response = await axiosInstance.put(`http://192.168.193.2:8000/api/user/update_password`, {
                currentPassword,
                newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token.token}`
                }
            });
    
            if (response.data.success) {
                setAuth((prevAuth) => ({
                    ...prevAuth,
                    user: {
                        ...prevAuth.user,
                        password: newPassword
                    }
                }));
    
                setError('');
                handleClosePasswordModal();
            } else {
                setError('Current password is incorrect');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            if (error.response && error.response.data) {
                setError(error.response.data.error || 'An error occurred. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };
    
    
    const handleDeleteUser = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            await axiosInstance.delete(`http://192.168.193.2:8000/api/users`, {
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

    const handleViewUsers = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axiosInstance.get(`http://192.168.193.2:8000/api/users`, {
                headers: {
                    'Authorization': `Bearer ${token.token}`
                }
            });

            const filteredUsers = response.data.filter(user => ![1, 2, 3].includes(user.id));

            setUsers(filteredUsers); 
            setOpenUsersModal(true); 
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleBanUser = async (user) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            await axiosInstance.post(`http://192.168.193.2:8000/users/${user}/banned`, {}, {
                headers: {
                    'Authorization': `Bearer ${token.token}`
                }
            });

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === user ? { ...user, banned: true } : user
                )
            );
        } catch (error) {
            console.error('Error banning user:', error);
        }
    };

    const handleUnbanUser = async (user_id) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            await axiosInstance.post(`http://192.168.193.2:8000/users/${user_id}/unbanned`, {}, {
                headers: {
                    'Authorization': `Bearer ${token.token}`
                }
            });

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === user_id ? { ...user, banned: false } : user
                )
            );
        } catch (error) {
            console.error('Error unbanning user:', error);
        }
    };

    const isAdmin = auth.user && [1, 2, 3].includes(auth.user.id);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleClearFilter = () => {
        setSearchTerm('');
        setSortOrder('');
    };

    const filteredUsers = users
        .filter((user) => user.fio.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.fio.localeCompare(b.fio);
            } else if (sortOrder === 'desc') {
                return b.fio.localeCompare(a.fio);
            }
            return 0;
        });

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
                            <MenuItem onClick={handleOpenPasswordModal}>Change Password</MenuItem>
                            {isAdmin && <MenuItem onClick={handleViewUsers}>View Users</MenuItem>}
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
                    Library
                </Button>
                <div className="tilgr">TIL</div>
                <Button
                    className="profilebtns"
                    disableElevation={true}
                    variant="contained"
                    onClick={onUploadClick}
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
                    Upload
                </Button>
            </div>
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
            <Modal
                open={openUsersModal}
                onClose={() => setOpenUsersModal(false)}
                aria-labelledby="users-modal-title"
                aria-describedby="users-modal-description"
            >
                <Box className="modal-box">
                    <h2 id="users-modal-title">Registered Users</h2>
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <div>
                        <Button variant="contained" onClick={handleSort}>
                            Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
                        </Button>
                        <Button variant="outlined" onClick={handleClearFilter} style={{ marginLeft: '10px' }}>
                            Clear Filter
                        </Button>
                    </div>
                    <ul>
                        {filteredUsers.map((user) => (
                            <li key={user.id}>
                                {user.fio}
                                {user.banned ? (
                                    <>
                                        <span style={{ color: 'gray', marginLeft: '10px' }}>Banned</span>
                                        <Link to="#" onClick={() => handleUnbanUser(user.id)} style={{ marginLeft: '10px' }}>Unban</Link>
                                    </>
                                ) : (
                                    <Link to="#" onClick={() => handleBanUser(user.id)} style={{ marginLeft: '10px' }}>Ban</Link>
                                )}
                            </li>
                        ))}
                    </ul>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenUsersModal(false)}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default Profile;
