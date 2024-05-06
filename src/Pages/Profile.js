// ProfilePage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import Button from "@mui/material/Button";

const Profile = () => {
  // Предположим, что имя пользователя получено из контекста или хранилища
  const username = 'John Doe';
  const navigate = useNavigate();

  const onLibraryClick = () => {
    navigate("/Library");
  };

  const onUploadClick = () => {
    navigate("/Library");
  };

  return (
    <div className="profile-page">
      <Link to="/" className="til-link">
        TIL
      </Link>
      <div className="user-info">{username}
      <img src="/vector.svg" alt="Vector" className="vector-image" />
      </div>
      <div className="button-container">
        <Button
          className="profilebtns"
          disableElevation={true}
          color="secondary"
          variant="outlined"
          onClick={onLibraryClick}
          sx={{ borderRadius: "15px", width: 183, height: 69, marginTop: "40px" }} 
        >
          Library
        </Button>
        <div className="tilgr">TIL</div>
        <Button
          className="profilebtns"
          disableElevation={true}
          color="secondary"
          variant="outlined"
          onClick={onUploadClick}
          sx={{ borderRadius: "15px", width: 183, height: 69, marginTop: "40px" }} 
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Profile;
