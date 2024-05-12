import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./LibraryPage.css";

function LibraryPage() {
    const username = 'John Doe';
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Вернуться на предыдущую страницу
    };

    return (
        <div className="LibraryPage">
            <header className="headerlib">
                <Link to="/" className="til-link">
                    <IconButton onClick={goBack} className="back-button">
                        <ArrowBackIosIcon style={{ color: "white" }} />
                    </IconButton>
                    TIL
                </Link>
                <Link to="/Library">
                    <div className="user-info">{username}
                        <img src="/vector.svg" alt="Vector" className="vector-image" />
                    </div>
                </Link>
            </header>
            <main className="library">
                <div className="videolist">
                    text
                </div>
            </main>
        </div>
    );
}

export default LibraryPage;
