import React from "react"
import USMap from './components/USMap';

export default function EVPerVote() {
  return (
    <div className="page">
     <h2 style={{marginBottom: 0}}>EV per vote (1916 only) (WIP)</h2>
     <p style={{textAlign: "center"}}>Human votes cast in a state in 1916 per electoral vote cast by the state. 
     <br/>The range here is 76892.5 (green) to 7105.78 (red)
     <br/> Different states have always been slightly over- or under-represented in the Electoral College.
     <br/>However, the gap between the highest and lowest values in this dataset also highlights the 
     <br/>historical contrast between democracy and disenfranchisement/authoritarianism in different states.
     <br/>More election years (and more interactive information) will be added soon.
     </p>
     <USMap/>
      <a href="https://simplemaps.com/resources/svg-us">Path data from https://simplemaps.com/resources/svg-us</a>
    </div>  
  )
}