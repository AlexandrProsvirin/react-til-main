import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import './AboutPage.css';

function AboutPage (){
    return(
        <div className="AboutPage">
            <header className="headerabout">
            <Link to="/" className="tilabout-link">
        TIL
            </Link>
            <Link to="/faq" className="faq-link">
        FAQ
            </Link>
            </header>
            <main className="mainabout">
                <div className="opacityblock">
                <div className="tilgr">TIL</div>
                    <h3> TIL это развлекательно-обучающее приложение для изучения 
языков</h3>
                </div>
            </main>
        </div>
    )
}

export default AboutPage;