import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignInPage.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from 'axios';

const SignInPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const goBack = () => {
        navigate(-1); // Вернуться на предыдущую страницу
    };

    const onSignInButtonClick = async () => {
        try {
            const response = await axios.post("http://26.56.36.119:8000/api/auth/signin", {
                email,
                password
            });
            console.log("Login successful:", response.data);

            // Перенаправление на страницу профиля после успешного входа
            navigate("/profile");
        } catch (error) {
            console.error("Error during login:", error);
            // Добавьте здесь логику для обработки ошибки, например, отображение сообщения об ошибке пользователю
        }
    };

    return (
        <div className="page-container">
            <Link to="/" className="til-link">
                <IconButton onClick={goBack} className="back-button">
                    <ArrowBackIosIcon style={{ color: "white" }} />
                </IconButton>
                TIL
            </Link>
            <div className="signIn-page">
                <h2>Sign In</h2>
                <form className="signInForm">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        className="SignIn"
                        disableElevation={true}
                        color="secondary"
                        variant="outlined"
                        onClick={onSignInButtonClick}
                        sx={{ borderRadius: "15px", width: 183, height: 69, marginTop: "40px" }} 
                    >
                        SIGN IN
                    </Button>
                </form>
                <p>Don't have an account? <Link to="/sign-up" className="AccountP">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default SignInPage;
