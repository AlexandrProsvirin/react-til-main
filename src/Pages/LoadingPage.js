import React from 'react';
import './LoadingPage.css'; 

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <video className="background-video" autoPlay loop muted>
        <source src="blurmotion.mp4" type="video/mp4" />
      </video>
      <h1>Loading...</h1>
      <p>Please wait.</p>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingPage;
