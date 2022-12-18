import React, {useState} from "react"
import { data as texasData }  from "../images/treemaps/Texas/index.js" 
import { data as NCData } from "../images/treemaps/NorthCarolina/index.js"
import { data as georgiaData } from "../images/treemaps/Georgia/index.js"
import { data as caliData } from "../images/treemaps/California/index.js"
import { data as NYData } from "../images/treemaps/NewYork/index.js"
import { data as illinoisData } from "../images/treemaps/Illinois/index.js"
import { data as floridaData } from "../images/treemaps/Florida/index.js"
import { data as ohioData } from "../images/treemaps/Ohio/index.js"
import { data as pennData} from "../images/treemaps/Pennsylvania/index.js"
import { data as vaData } from "../images/treemaps/Virginia/index.js"
import { data as arizonaData } from "../images/treemaps/Arizona/index.js"
import { data as wisconsinData } from "../images/treemaps/Wisconsin/index.js"
import { data as minnesotaData } from "../images/treemaps/Minnesota/index.js"
import { data as michiganData } from "../images/treemaps/Michigan/index.js"
import "../App.css"
import TreemapKey from "./TreemapKey.js"
import USState from "./USState";
import { statePaths } from "../data/statePaths";

const blankSVG = <svg width="100%" height="100%" viewBox="0 0 700 700">
  <rect x="0" y="0" height="700" width="700"></rect>
</svg>

const stateIDs = {
  "TX": "Texas",
  "NC": "North Carolina",
  "GA": "Georgia",
  "CA": "California",
  "NY": "New York",
  "IL": "Illinois",
  "FL": "Florida",
  "OH": "Ohio",
  "PA": "Pennsylvania",
  "VA": "Virginia",
  "AZ": "Arizona",
  "WI": "Wisconsin",
  "MN": "Minnesota",
  "MI": "Michigan",
}

const states = {
  "Texas": texasData,
  "North Carolina": NCData,
  "Georgia": georgiaData,
  "California": caliData,
  "New York": NYData,
  "Illinois": illinoisData,
  "Florida": floridaData,
  "Ohio": ohioData,
  "Pennsylvania": pennData,
  "Virginia": vaData,
  "Arizona": arizonaData,
  "Wisconsin": wisconsinData,
  "Michigan": michiganData,
  "Minnesota": minnesotaData,
  "Select State": {firstYear: 1900, list: [blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG, blankSVG]}
}

export default function StateTreemapUI(props) {
  const [index, setIndex] = useState(0)
  const [displayState, setDisplayState] = useState("Select State");
  const [hoveredState, setHoveredState] = useState("");
  
  const generateMaps = () => {
   // let newMaps = states[displayState] ? states[displayState].list : []
    //newMaps)
    setIndex(0)
  }
  

  function handleKey(e) {
    if (e.key === "ArrowLeft") {
      setIndex(index > 0 ? index - 1 : states[displayState].list.length - 1)
    }
    if (e.key === "ArrowRight") {
      setIndex(index < states[displayState].list.length - 1 ? index + 1 : 0)
    }
  }

  return (
    <div style={{...styles.container}} className="noMarginBlock">
      <div style={{display: "flex", width: "50%", }}>
        {displayState !== "Select State" && <button style={{width: "120px"}} onClick={() => setDisplayState("Select State")}>&lt; Go back</button>}

        <select value={displayState} onChange={(e) => setDisplayState(e.target.value)} style={styles.stateSelector}>
          {states && Object.keys(states).map((e, i) => <option value={e} key={i}>{e}</option>)}
        </select>

        <button style={styles.genButton} onClick={() => {generateMaps(); setIndex(0)}}>Refresh maps</button>
      </div>
      <p style={{fontSize: 22, paddingTop: 5, paddingBottom: 5}}>Presidential Election of <b>{index < states[displayState].list.length ? states[displayState].firstYear + 4*(states[displayState].list.length - index - 1) : "N/A"}</b>{displayState !== "Select State" && ` in ${displayState}`}</p>
      
      {displayState === "Select State" && <p>Select any state highlighted in yellow!</p>}

      {displayState === "Select State" && <svg
        height="100%"
        viewBox="0 0 1000 589"
        style={{strokeLineJoin: "round", stroke: "#000", fill: "none", paddingRight: 90}}
        width="100%"
        id="svg"
      >
        {statePaths && statePaths.map((state, key) => (
          <USState
            id={state.id}
            d={state.d}
            onMouseEnter={() => setHoveredState(state.id)}
            onMouseLeave={() => setHoveredState("")}
            fill={stateIDs[state.id] && states[stateIDs[state.id]].firstYear <= 2020 - 4*parseInt(index) ? "#fdfd96" : "#999999"}
            opacity={hoveredState === state.id ? 0.5: 1}
            onClick={() => stateIDs[state.id] && states[stateIDs[state.id]].firstYear <= 2020 - 4*parseInt(index) && setDisplayState(stateIDs[state.id])}
            key={key}
          />
        ))}
      </svg>}

      {displayState !== "Select State" && <div className="resizable treemap" tabIndex={0} onKeyDown={(e) => handleKey(e)}>
        {index < states[displayState].list.length && states[displayState].list[index] /* magic */} 
        {states[displayState].list.length > 0 && <button className="treemapButton" style={styles.leftButton} onClick={() => setIndex(index > 0 ? index - 1 : index)}>←</button>}
        {states[displayState].list.length > 0 && <button className="treemapButton" style={styles.rightButton} onClick={() => setIndex(index < states[displayState].list.length - 1 ? parseInt(index) + 1 : index)}>→</button>}
      </div>}
      

      <div style={{backgroundColor: "white", paddingTop: 10, marginBottom: 10, paddingLeft: 5, paddingRight: 5, color:"black", paddingBottom: 10}}>
        {states[displayState].list && states[displayState].list.length > 0 && states[displayState].firstYear + 4*(states[displayState].list.length - 1)}
        <input 
          type="range" style={{width: 500}} min={0} max={states[displayState].list.length - 1} step={1} value={index}
          onChange={(e) => setIndex(e.target.value)}
          list="tickmarks"
        />
        <datalist id="tickmarks">
        {states[displayState].list.length > 0 && [...Array(states[displayState].list.length).keys()].map(e => 
          <option style={{color: "black"}} value={e} key={e}></option>
        )}
        </datalist>
        {states[displayState].list && states[displayState].list.length > 0 && states[displayState].firstYear}
      </div>
      {displayState !== "Select State" && <TreemapKey/>}

    </div>
    
  )
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%"
  },
  stateSelector: {
    height: "27px",
    width: "175px",
    textAlign: "center",
    marginRight: "auto",
    marginLeft: "auto",

  },
  genButton: {
    width: "200px",
    height: "27px",
    marginRight: 0,
    marginLeft: "auto"
  },
  leftButton: {
    position: "absolute",
    left: 10,
    top: "50%",
  },
  rightButton: {
    position: "absolute",
    right: 10,
    top: "50%",
  }
}