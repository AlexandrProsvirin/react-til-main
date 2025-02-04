import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Choose from "./Pages/Choose";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import AboutPage from "./Pages/AboutPage";
import FaqPage from "./Pages/FaqPage";
import LoadingPage from "./Pages/LoadingPage";
import LibraryPage from './Pages/LibraryPage';
import UploadPage from './Pages/Video';
import Profile from './Pages/Profile';
import { AuthProvider } from './Components/AuthContext';
import ProtectedRoute from './Components/ProtectedRoutes';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "TIL";
        metaDescription = "Description for the home page.";
        break;
      case "/choose":
        title = "TIL";
        metaDescription = "Description for the choose page.";
        break;
      case "/sign-in":
        title = "TIL";
        metaDescription = "Description for the sign in page.";
        break;
      case "/sign-up":
        title = "TIL";
        metaDescription = "Description for the sign up page.";
        break;
      case "/profile":
        title = "TIL";
        metaDescription = "Description for the profile page.";
        break;
      case "/about":
        title = "TIL";
        metaDescription = "Description for the about page.";
        break;
      case "/faq":
        title = "TIL";
        metaDescription = "Description for the faq page.";
        break;
      case "/library":
        title = "TIL";
        metaDescription = "Description for the library page.";
        break;
      case "/upload":
        title = "TIL";
        metaDescription = "Description for the upload page.";
        break;
      case "/video":
        title = "TIL";
        metaDescription = "Description for the video page.";
        break;
      case "/title":
        title = "TIL";
        metaDescription = "Description for the title page.";
        break;
      case "/description":
        title = "TIL";
        metaDescription = "Description for the description page.";
        break;
      case "/subtitles":
        title = "TIL";
        metaDescription = "Description for the subtitles page.";
        break;
      default:
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector('head > meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <div className="App">
      <video className="background-video" autoPlay loop muted>
        <source src="blurmotion.mp4" type="video/mp4" />
      </video>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/library" element={<ProtectedRoute element={LibraryPage} />} />
        <Route path="/upload" element={<ProtectedRoute element={UploadPage} />} />
      </Routes>
    </div>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}

export default AppWithRouter;
