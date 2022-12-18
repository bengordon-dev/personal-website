import React from "react"
import { Link } from "react-router-dom";
import "../App.css"

export default function Elections() {
  return (
    <div className="page">
      <h1 style={{marginBottom: "1em"}}>Elections</h1>
      <Link className="electionsLink" style={{backgroundColor: "rgba(150, 200, 255, 0.5)"}} to="/projects/elections/treemaps">
        Treemaps
      </Link> 
      <Link className="electionsLink" style={{backgroundColor: "rgba(255, 100, 100, 0.5)"}} to="/projects/elections/evpervote">
        EV Per Vote
      </Link> 
      <p style={{textAlign: "center"}}>
        This all started in January 2021 (in high school at NCSSM) as a project for Dr. Morrison's "J-term" Unix shell class.
      <br/>Tweaks have been made over the years when I've had time.
      <br/><br/>Map source: <a href="https://simplemaps.com/resources/svg-us">https://simplemaps.com/resources/svg-us</a>
      </p>
    </div>  
  )
}