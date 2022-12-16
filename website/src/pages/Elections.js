import React from "react"
import { Link } from "react-router-dom";


export default function Elections() {
  return (
    <div className="page">
      <h1 className="pageTitle" style={{marginBottom: "1em"}}>Elections</h1>

      {/*<p>WIP - <a style={{color: "white"}} href="https://github.com/bengordon-dev/elections">GitHub link to source code/what I'm still working on</a></p>*/}

      {/*Electoral votes cast per human vote cast, 1876-2020<br/>
      Treemaps of statewide presidential election results (by county,) 1900-2020
    */}    
      <Link style={{...styles.link, backgroundColor: "rgba(150, 200, 255, 0.5)"}} to="/projects/elections/treemaps">Treemaps</Link> 
      <Link style={{...styles.link, backgroundColor: "rgba(255, 100, 100, 0.5)"}} to="/projects/elections/evpervote">EV Per Vote (RIP)</Link> 

      <p style={{textAlign: "center"}}>
        This all started in January 2021 (in high school at NCSSM) as a project for Dr. Morrison's "J-term" Unix shell class.
      <br/>Tweaks have been made over the years when I've had time.
      </p>


   
    </div>  
  )
}

const styles = {
  link: {
    marginBottom: 20,
    textDecoration: "none",
    padding: 40,
    borderRadius: 80,
    fontSize: 20,
    width: "15%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}