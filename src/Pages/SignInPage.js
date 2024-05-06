// SignInPage.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignInPage.css";
import Button from "@mui/material/Button";

const SignInPage = () => {
    const navigate = useNavigate();

  const onSignInButtonClick = () => {
    navigate("/profile");
  };
  return (
    <div className="page-container">
      <Link to="/" className="til-link">
        TIL
      </Link>
      <div className="signIn-page">
        <h2>Sign In</h2>
        <form className="signInForm">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
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
