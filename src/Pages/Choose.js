import { useCallback } from "react";
import { Link, useNavigate} from "react-router-dom";
import "./Choose.css";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const Choose = () => {
  const onSIGNUpClick = useCallback(() => {
    
  }, []);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); 
};

  return (
    <div className="choose">
      <div className="content">
      <Link to="/" className="til-link">
                    <IconButton onClick={goBack} className="back-button">
                        <ArrowBackIosIcon style={{ color: "white" }} />
                    </IconButton>
                    TIL
                </Link>
        
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
