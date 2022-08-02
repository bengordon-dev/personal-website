import React from "react"
import StateTreemapUI from "./StateTreemapUI"

export default function Treemaps() {
  return (
    <div className="page">

      {/*<StateTreeMapSlider stateData={{"North Carolina": northCarolina, "Texas": texas}} stateList={[{displayName: "North Carolina"}, {displayName: "Texas"}]} state={"Texas"} mapWidth={700} mapHeight={700}/>*/}
      {/*list && list.map((item, key) => <div>{item}</div>)*/}
      <StateTreemapUI/>
      <p style={{textAlign: "center"}}>
        <br/>Darker shades mean a larger margin of victory in a county. Blue means a Democratic win, red means 
        Republican, green means everyone else for now.<br/>
        Rectangle sizes are proportional to the number of votes cast in a county.<br/><br/>
        Data source: wget-ing Wikipedia<br/>
        Made with <a href="https://www.npmjs.com/package/treemap-squarify">treemap-squarify</a>
      </p>
    </div>  
  )
}