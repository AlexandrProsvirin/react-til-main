// SignUpPage.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import Button from "@mui/material/Button";

const SignUpPage = () => {
    const navigate = useNavigate();

  const onSignUpButtonClick = () => {
    navigate("/profile");
  };
  return (
    <div className="page-container">
      <Link to="/" className="til-link">
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
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" />
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
