import React from "react";
import { Link, useNavigate } from "react-router-dom";


import './FaqPage.css';

function FaqPage() {
    return(
        <div className="FaqPage">
             <header className="headerfaq">
            <Link to="/" className="tilfaq-link">
        TIL
            </Link>
            <Link to="/about" className="faq-link">
        ABOUT
            </Link>
            </header>
            <main className="mainfaq">
                <div className="opacityfaqblock">
                    
                    <h1>FAQ</h1>

<h5>1. What is your app about?</h5>

<p>Our app is an entertaining and educational platform designed for learning various languages. We offer dictionaries, study materials, and tools for effective language learning.</p>

<h5>2. Which languages are available in the app?</h5>

<p>We provide access to a wide range of languages, including popular and rare ones. Our library includes English, Spanish, French, German, Chinese, Japanese, and many others.</p>

<h5>3. What features does your app offer for language learning?</h5>

<p>We offer dictionaries with translations and explanations, knowledge tests, audio and video materials, games for reinforcement, and educational exercises specifically designed to improve language skills.</p>

<h5>4. What is the monetization model for your app?</h5>

<p>Our app is free for users. We generate revenue through advertising and subscription services.</p>

<h5>5. What information is required for registration/authentication in the app?</h5>

<p>We offer the option of registration through social networks for user convenience. There's also the possibility to use the app without registration.</p>

<h5>6. How long does it take to learn a language using your app?</h5>

<p>The time required to learn a language is individual for each user and depends on the starting level of knowledge, the regularity of study sessions, and the utilization of different app features.</p>

<h5>7. Which platforms support your app?</h5>

<p>Our app is available for iOS and Android devices, and it also has a web version with additional learning tools.</p>

<h5>8. How does your app differ from other language learning apps in the market?</h5>

<p>We aim to provide a variety of educational materials, emphasizing a combination of educational games, tests, dictionaries, and interactive exercises, making the learning process more engaging and efficient.</p>

                </div>
            </main>
        </div>
    )
}
export default FaqPage;