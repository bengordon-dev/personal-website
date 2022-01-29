import './App.css';
import React from "react"

import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from './Home';
import Projects from "./Projects"
import Elections from "./Elections"
import AboutMe from './AboutMe';




export default function App() {
  

  return (
    <BrowserRouter>
      <div className="App">
      <header className="App-header">
        <Link className="headerLink" to="/aboutme">About me</Link> 
        <p>You are on&nbsp;</p>
        <Link to="/"><code>bengordon.dev</code></Link>
        <Link className="headerLink" to="/projects">Projects</Link>
      </header>
     
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/projects/elections" element={<Elections/>}/>
        <Route path="/aboutme" element={<AboutMe/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}
