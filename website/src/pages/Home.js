import React from "react";
import '../App.css';
import { Link } from "react-router-dom";
import pic from '../images/pic.jpg';

export default function Home() {
  return (
    <div className="page homeScreen" >
      <p>Hello! Welcome to my personal website.</p>
      <img height="316px" width="308px" src={pic} alt="mew" />
      <p style={{marginTop: ".5em"}}>Me, shortly before graduating high school (June 2021)</p>
      <a href="https://github.com/bengordon-dev">GitHub link</a>
      <br/>
      <Link to="./resume.pdf" target="_blank" download>Concise Resume</Link>
      <p>I can be contacted at <a href="mailto:ben.gordon@utexas.edu">ben.gordon@utexas.edu</a>.</p>
    </div>
  );
}

