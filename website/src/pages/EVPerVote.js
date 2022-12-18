import React, {useState} from "react"
import EVMap from "../components/EVMap";
import YearSlider from "../components/YearSlider";
import { EVData } from "../data/EVData";

export default function EVPerVote() {
  const [yearIndex, setYearIndex] = useState(0)
  return (
    <div className="page">
      <h1>EV Per vote: {EVData.years[0] + 4*yearIndex}</h1>
      <EVMap index={yearIndex}/>
      <YearSlider 
        firstYear={EVData.years[0]} 
        numYears={EVData.years.length}
        index={yearIndex}
        setIndex={setYearIndex}
      />
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