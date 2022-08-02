import React from "react"
import { Link } from "react-router-dom";


export default function Elections() {
  return (
    <div className="page">

      {/*<p>WIP - <a style={{color: "white"}} href="https://github.com/bengordon-dev/elections">GitHub link to source code/what I'm still working on</a></p>*/}

      {/*Electoral votes cast per human vote cast, 1876-2020<br/>
      Treemaps of statewide presidential election results (by county,) 1900-2020
    */}
      The culmination of a lot of work, beginning in January 2021.
      <br/>Bash (particularly sed and awk), Python, and NodeJS have all been used heavily.
      <Link style={styles.link} to="/projects/elections/treemaps">Treemaps</Link> 
      <Link style={styles.link} to="/projects/elections/evpervote">EV Per Vote</Link> 



   
    </div>  
  )
}

const styles = {
  link: {
    marginTop: 10,
    textDecoration: "none",
  }
}