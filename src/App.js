import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Choose from "./Pages/Choose";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
// import LibraryPage from './Pages/LibraryPage';
// import UploadPage from './Pages/UploadPage';
import Profile from './Pages/Profile';

function App() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Home Page Title";
        metaDescription = "Description for the home page.";
        break;
      case "/choose":
        title = "Choose Page Title";
        metaDescription = "Description for the choose page.";
        break;
      case "/sign-in":
        title = "Sign In Page Title";
        metaDescription = "Description for the sign in page.";
        break;
      case "/sign-up":
        title = "Sign Up Page Title";
        metaDescription = "Description for the sign up page.";
        break;
        case "/profile":
        title = "profile Page Title";
        metaDescription = "Description for the profile page.";
        break;
      default:
        break;
    }
    

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <div className="App">
      <video autoPlay loop muted>
        <source src="blurmotion.mp4" type="video/mp4" />
      </video>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/choose" element={<Choose />} />
        
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        {/* <Route path="/library" component={LibraryPage} />
        <Route path="/upload" component={UploadPage} /> */}
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </div>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
