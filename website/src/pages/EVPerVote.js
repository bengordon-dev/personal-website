import React from "react"
import EVMap from "../components/EVMap";

export default function EVPerVote() {
  return (
    <div className="page">
      <p>I accidentally rm'd an important file, setting this page back to an earlier version. It will be fixed soon</p>

      <EVMap/>
      <a href="https://simplemaps.com/resources/svg-us">Path data from https://simplemaps.com/resources/svg-us</a>
      <p style={{textAlign: "center"}}>Human votes cast in a state per electoral vote cast by the state. 
      {/*<br/> Different states have always been slightly over- or under-represented in the Electoral College.
      <br/>However, the gap between the highest and lowest values in this dataset also highlights the 
      <br/>historical contrast between democracy and disenfranchisement/authoritarianism in different states.
  <br/>More election years (and more interactive information) will be added soon.*/}
      </p>
    </div>  
  )
}