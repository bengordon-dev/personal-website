import './App.css';
import React from "react"

import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from './Home';
import Projects from "./Projects"
import Elections from "./Elections"
import AboutMe from './AboutMe';
import Treemaps from './Treemaps';
import EVPerVote from './EVPerVote';


function pointCoords(index, number) { // number on [0, 5], index is a property of the hexagon
  let x = index % 30;
  let y = Math.floor(index/30);
  let centerX = 50*(1 + 1.5*x);
  let centerY = 50*Math.sqrt(3)*(.5 + y + .5*(x%2));
  return `${centerX + 50*Math.cos(number*Math.PI/3)},${centerY + 50*Math.sin(number*Math.PI/3)}`
}

let colors = ["#A6D06C", /*"#ACAC56",*/ "#3D893E", /*"#E3D568", /*"#53AB3A", "#4D7FC4"*/]


//double centerX = container.topLeftX + container.hexSize*(1 + 1.5*x);
//double centerY = container.topLeftY + container.hexSize*Math.sqrt(3)*(.5 + y + .5*(x%2));


export default function App() {
  

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header" style={{paddingLeft: "0.5em", paddingRight: "0.5em"}}>
          <Link className="headerLink" to="/aboutme">About me</Link> 
          <p>You are on&nbsp;</p>
          <Link to="/"><code>bengordon.dev</code></Link>
          <Link className="headerLink" to="/projects">Projects</Link>
        </header>
      
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/projects/elections" element={<Elections/>}/>
          <Route path="/projects/elections/treemaps" element={<Treemaps/>}/>
          <Route path="/projects/elections/evpervote" element={<EVPerVote/>}/>
          <Route path="/aboutme" element={<AboutMe/>}/>
        </Routes>  

        <div id="hexGrid">
          <svg height="5000" width="5000">
            {[...Array(360).keys()].map((hex, i) => (
              <polygon 
                points={`${pointCoords(i, 0)} ${pointCoords(i, 1)} ${pointCoords(i, 2)} ${pointCoords(i, 3)} ${pointCoords(i, 4)} ${pointCoords(i, 5)}`}
                style={{fill: colors[Math.floor(Math.random()*2)], stroke: "black", strokeWidth: 1, }}
              />
            ))}
           

          </svg>
        </div>
        
      </div>
    </BrowserRouter>
  );
}
