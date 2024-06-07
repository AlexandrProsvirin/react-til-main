import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignInPage.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axiosInstance from '../Axios/axiosInstance';
import { AuthContext } from "../Components/AuthContext";

const SignInPage = () => {
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState(false); 
    const { setAuth } = useContext(AuthContext);
    
    const goBack = () => {
        navigate(-1);
    };
    const onFAQClick = () => {
        navigate("/faq");
      };
    
      const onAboutClickHandler = () => {
        navigate("/about");
      };
    
      const onProfileClick = () => {
        // Переход на страницу профиля только если пользователь авторизован
        
          navigate("/profile");
        
      };
    
      const onUploadClick = () => {
        // Переход на страницу загрузки только если пользователь авторизован
          navigate("/upload");
      };
      const onHomePageClick = () => {
        // Переход на страницу загрузки только если пользователь авторизован
          navigate("/");
      };


    
      const onSignInButtonClick = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        const username = e.target.username.value;
        const password = e.target.password.value;
        
        if (password.length < 6) {
            setPasswordError(true);
            return; 
        }
    
        try {
            const response = await axiosInstance.post("http://192.168.193.2:8000/api/auth/signin", {
                fio: username,
                password: password,
            });
    
            console.log("Login successful:", response.data);
    
            const userData = {
                fio: response.data.fio,
                token: response.data.token,
                id: response.data.id
            };
    
            setAuth({
                isAuthenticated: true,
                user: userData
            });
    
            localStorage.setItem("fio", JSON.stringify({ fio: response.data.fio }));
            localStorage.setItem("token", JSON.stringify({ token: response.data.token }));
            localStorage.setItem("id", JSON.stringify({ id: response.data.id }));
    
            navigate("/profile", { state: userData }); 
        } catch (error) {
            console.error('Error during login:', error);
            if (error.response && error.response.data) {
                console.error('Server response:', error.response.data);
            }
        }
    };
    

    return (
        
    <div className="signIn-page">
            <header className="headerpr">
        <div className="leftSection">
            <div className="tilh">
          <Link to="/" className="til-link">
          <IconButton onClick={goBack} className="back-button">
                    <ArrowBackIosIcon style={{ color: "white" }} />
                </IconButton>TIL
                </Link></div>
        </div>
        <div className="centerSection">
          <div className="linkmenu" onClick={onHomePageClick}>Home</div>
          <div className="linkmenu" onClick={onProfileClick}>Profile</div>
          <div className="linkmenu" onClick={onUploadClick}>Upload</div>
        </div>
        <div className="rightSection">
          <div className="linkh" onClick={onFAQClick}>FAQ</div>
          <div className="linkh" onClick={onAboutClickHandler}>ABOUT</div>
        </div>
      </header>
      <div className="page-container">
      
                <h2>Sign In</h2>
                <form className="signInForm" onSubmit={onSignInButtonClick}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" />
                        {passwordError && <p className="error-message">Password should be at least 6 characters long</p>}
                    </div>
                    <Button
                        className="SignIn"
                        disableElevation={true}
                        variant="contained"
                        type="submit" // Change button type to "submit"
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
                        SIGN IN
                    </Button>
                    <p className="parag">Don't have an account? <Link to="/sign-up" className="AccountP">Sign Up</Link></p>
                </form>
                
                
            </div>
            </div>
    );
};

export default SignInPage;
