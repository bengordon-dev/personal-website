import './App.css';
import React, {useEffect, useState} from "react"
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from './pages/Home';
import Projects from './pages/Projects'
import Elections from './pages/Elections'
import AboutMe from './pages/AboutMe';
import Treemaps from './pages/Treemaps';
import EVPerVote from './pages/EVPerVote';
import Picross from './pages/Picross';
import { useMediaQuery } from '@mantine/hooks';


let colors = ["#b8c5d6", "#a39ba8"] //["#A6D06C", /*"#ACAC56",*/ "#3D893E", /*"#E3D568", /*"#53AB3A", "#4D7FC4"*/]

function HexGrid(props) {

  function pointCoords(index, number) { // number on [0, 5], index is a property of the hexagon
    let x = index % 30;
    let y = Math.floor(index/30);
    let centerX = 50*(1 + 1.5*x);
    let centerY = 50*Math.sqrt(3)*(.5 + y + .5*(x%2));
    return `${centerX + 50*Math.cos(number*Math.PI/3)},${centerY + 50*Math.sin(number*Math.PI/3)}`
  }

  return <svg id="hexGrid" viewBox="0 0 2225 1040">
    {[...Array(props.numPoints).keys()].map((hex, i) => (
      <polygon 
        points={`${pointCoords(i, 0)} ${pointCoords(i, 1)} ${pointCoords(i, 2)} ${pointCoords(i, 3)} ${pointCoords(i, 4)} ${pointCoords(i, 5)}`}
        style={{fill: colors[Math.floor(Math.random()*colors.length)], stroke: "black", strokeWidth: 1, }}
      />
    ))}
  </svg>
}



export default function App() {
  const isDesktop = useMediaQuery("(orientation: landscape)");

  useEffect(() => {
    document.title = "Ben Gordon"
  }, []);

  useEffect(() => {
    const resizeFunc = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    resizeFunc();
    window.addEventListener("resize", resizeFunc);
    return () => {
      window.removeEventListener("resize", resizeFunc);
    };
  }, []);


  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Link className="headerLink" to="/aboutme">{isDesktop ? "About me" : "About"}</Link> 
          {isDesktop && <p>You are on&nbsp;</p>}
          <Link to="/"><code>bengordon.dev</code></Link>
          <Link className="headerLink" to="/projects">Projects</Link>
        </header>
      
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/projects/picross" element={<Picross isDesktop={isDesktop}/>}/>
          <Route path="/projects/elections" element={<Elections/>}/>
          <Route path="/projects/elections/treemaps" element={<Treemaps/>}/>
          <Route path="/projects/elections/evpervote" element={<EVPerVote/>}/>
          <Route path="/aboutme" element={<AboutMe/>}/>
        </Routes>  

        <HexGrid numPoints={360}/>
      
      </div>
    </BrowserRouter>
  );
}
