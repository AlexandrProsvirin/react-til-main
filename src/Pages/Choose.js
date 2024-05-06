import { useCallback } from "react";
import { Link } from "react-router-dom";
import "./Choose.css";

const Choose = () => {
  const onSIGNUpClick = useCallback(() => {
    // Please sync "Loading page" to the project
  }, []);

  return (
    <div className="choose">
      <div className="content">
        <img className="upload1Icon" alt="" src="/upload1.svg" />
        
      </div>
      <div className="links">
        <Link className="signIn" to="/sign-in">
          Sign In
        </Link>
        <b>OR</b>
        <Link className="signUp" to="/sign-up" onClick={onSIGNUpClick}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Choose;
