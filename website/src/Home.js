import React, { useEffect } from "react";
import './App.css';
import { Link } from "react-router-dom";
import pic from './images/pic.jpg';

export default function Home() {
  useEffect(() => {
    document.title = "Ben Gordon"
  }, []);
  return (
    <div className="App">
      <p>Hello! Welcome to my personal website.</p>
      <img height="316px" width="308px" src={pic} alt="mew" />
      <p>Me, shortly before graduating high school (June 2021)</p>
      <Link to="./resume.pdf" target="_blank" download>Concise Resume</Link>
    </div>
  );
}

