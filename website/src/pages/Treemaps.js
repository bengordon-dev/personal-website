import React from "react"
import StateTreemapUI from "../components/StateTreemapUI"

export default function Treemaps() {
  return (
    <div className="page">
      <StateTreemapUI/>
      <p style={{textAlign: "center"}}>
        Rectangle sizes are proportional to the number of votes cast in a county.<br/><br/>
        <a href="https://github.com/bengordon-dev/elections/tree/master/treemapping-tools">Code and explanation</a><br/><br/>
        Data source: wget-ing Wikipedia<br/>
        Made with <a href="https://www.npmjs.com/package/treemap-squarify">treemap-squarify</a>
      </p>
    </div>  
  )
}