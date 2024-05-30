// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import { AuthContext } from "../Components/AuthContext";
// import axios from 'axios';

// function FileUploadForm() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const { auth } = useContext(AuthContext);
//   const username = auth.user ? auth.user.fio : "John Doe";
//   const navigate = useNavigate();
//   const [videoURL, setVideoURL] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const goBack = () => {
//     navigate(-1);
//   };

//   const onHomePageClick = () => {
//     navigate("/");
//   };

//   const onFAQClick = () => {
//     navigate("/faq");
//   };

//   const onAboutClickHandler = () => {
//     navigate("/about");
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//     setVideoURL(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!selectedFile) {
//       alert("Please select a file to upload.");
//       return;
//     }

//     setUploading(true);

//     const formData = new FormData();
//     formData.append('filedata', selectedFile);

//     try {
//       const response = await axios.post('http://26.56.36.119:3000/upload-video', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (response.status === 200) {
//         alert("File uploaded successfully!");
//         navigate("/library"); // Перенаправление пользователя после успешной загрузки
//       } else {
//         alert("Failed to upload file.");
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       alert("An error occurred while uploading the file.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="embedded-videocontainer">
//         <header className="headerpr">
//           <div className="leftSection">
//             <div className="tilh">
//               <Link to="/" className="til-link">
//                 <IconButton onClick={goBack} className="back-button">
//                   <ArrowBackIosIcon style={{ color: "white" }} />
//                 </IconButton>
//                 TIL
//               </Link>
//             </div>
//           </div>
//           <div className="centerSection2">
//             <div className="linkmenu2" onClick={onHomePageClick}>
//               Home
//             </div>
//             <div className="linkmenu2" onClick={onFAQClick}>
//               FAQ
//             </div>
//             <div className="linkmenu2" onClick={onAboutClickHandler}>
//               ABOUT
//             </div>
//           </div>

//           <Link to="/library">
//             <div className="user-info">
//               {username}
//               <img src="/vector.svg" alt="Vector" className="vector-image" />
//             </div>
//           </Link>
//         </header>
//         <main className="iframe">
//           {!videoURL && (
//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//               <div>
//                 <label htmlFor="fileInput">Upload a file:</label>
//                 <input type="file" id="fileInput" onChange={handleFileChange} />
//               </div>
//               <button type="submit" disabled={uploading}>Upload</button>
//             </form>
//           )}
//           {videoURL && (
//             <iframe src={videoURL} title="Uploaded Video" allowFullScreen />
//           )}
//         </main>
//       </div>
//       <div className="linksall">
//         <Link className="links3" to="/title" state={{ selectedFile }}>
//           Title
//         </Link>

//         <Link className="links3" to="/description" state={{ selectedFile }}>
//           Description
//         </Link>

//         <Link className="links3" to="/subtitles" state={{ selectedFile }}>
//           Subtitles
//         </Link>
//       </div>
//       <div className="uploadlinkcontainer">
//       {videoURL && (
//         <Link className="uploadlink" onClick={handleSubmit}>
//           Upload
//         </Link>
//       )}
//       </div>
      
//     </div>
//   );
// }

// export default FileUploadForm;
