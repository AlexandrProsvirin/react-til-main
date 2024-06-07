import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axiosInstance from '../Axios/axiosInstance';
import { AuthContext } from "../Components/AuthContext";

const SignUpPage = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const [gender, setGender] = useState(""); 
    const [birthdate, setBirthdate] = useState(""); 
    const [passwordError, setPasswordError] = useState(false); 


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


      const onSignUpButtonClick = async () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        if (password.length < 6) {
            setPasswordError(true);
            return; 
        }
        try {
            const response = await axiosInstance.post('http://192.168.193.2:8000/api/auth/signup', {
                fio: username,
                email: email,
                password: password,
                genderId: gender,
                birthday: birthdate
            });
    
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
            console.error('Error during signup:', error);
        }
    };
    
    const goBack = () => {
        navigate(-1); 
    };

    return (
 <div className="sign-up-page">
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
            <main>
                <h2>Sign Up</h2>
                <form className="signUpForm">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" />
                        {passwordError && <p className="error-message">Password should be at least 6 characters long</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <select id="gender" name="gender" onChange={(e) => setGender(e.target.value)}>
                            <option value="">Select</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthdate">Birthdate:</label>
                        <input type="date" id="birthdate" name="birthdate" onChange={(e) => setBirthdate(e.target.value)} />
                    </div>
                    <Button
                        className="SignUp"
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
                        SIGN UP
                    </Button>
                    <p>Already have an account? <Link to="/sign-in" className="AccountP">Sign In</Link></p>
                </form>
                </main>
            </div>
        </div>
    
    );
};

export default SignUpPage;
