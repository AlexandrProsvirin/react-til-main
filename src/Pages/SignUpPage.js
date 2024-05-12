import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import axios from 'axios'; 
import axiosInstance from '../Axios/axiosInstance';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [gender, setGender] = useState(""); 
    const [birthdate, setBirthdate] = useState(""); 
    const [passwordError, setPasswordError] = useState(false); 

    const onSignUpButtonClick = async () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (password.length < 6) {
            setPasswordError(true);
            return; 
        }
        try {
            // Отправка POST-запроса на сервер
            const response = await axiosInstance.post('http://26.56.36.119:8000/api/auth/signup', {  //26.56.36.119
                fio: username,
                email: email,
                password: password,
                genderId: gender,
                birthday: birthdate
            });

            navigate("/profile");
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    const goBack = () => {
        navigate(-1); 
    };

    return (
        <div className="page-container">
            <Link to="/" className="til-link">
                <IconButton onClick={goBack} className="back-button">
                    <ArrowBackIosIcon style={{ color: "white" }} />
                </IconButton>
                TIL
            </Link>
            <div className="sign-up-page">
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
                        className="SignIn"
                        disableElevation={true}
                        color="secondary"
                        variant="outlined"
                        onClick={onSignUpButtonClick}
                        sx={{ borderRadius: "15px", width: 183, height: 69, marginTop: "40px" }} 
                    >
                        SIGN UP
                    </Button>
                </form>
                <p>Already have an account? <Link to="/sign-in" className="AccountP">Sign In</Link></p>
            </div>
        </div>
    );
};

export default SignUpPage;
