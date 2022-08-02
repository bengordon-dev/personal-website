import React, {useState, useEffect} from "react"
import { data as texasData }  from "./images/treemaps/Texas/index.js" 
import { data as NCData } from "./images/treemaps/NorthCarolina/index.js"
import { data as georgiaData } from "./images/treemaps/Georgia/index.js"
import { data as caliData } from "./images/treemaps/California/index.js"
import { data as NYData } from "./images/treemaps/NewYork/index.js"
import "./App.css"
import TreemapKey from "./components/TreemapKey.js"

const blankSVG = <svg width="100%" height="100%" viewBox="0 0 700 700">
  <rect x="0" y="0" height="700" width="700"></rect>
</svg>

const states = {
  "Texas": texasData,
  "North Carolina": NCData,
  "Georgia": georgiaData,
  "California": caliData,
  "New York": NYData,
  "Select State": {firstYear: 0, list: [blankSVG]}
}

export default function StateTreemapUI(props) {
  const [index, setIndex] = useState(0)
  const [displayState, setDisplayState] = useState("Texas");
  
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
        <select value={displayState} onChange={(e) => setDisplayState(e.target.value)} style={{...styles.stateSelector, marginLeft: 0, marginRight: "auto"}}>
          {states && Object.keys(states).map((e, i) => <option value={e} key={i}>{e}</option>)}
        </select>

        <button style={styles.genButton} onClick={() => {generateMaps(); setIndex(0)}}>Refresh maps</button>
      </div>
      <p style={{fontSize: 22, paddingTop: 5, paddingBottom: 5}}>Presidential Election of <b>{index < states[displayState].list.length ? states[displayState].firstYear + 4*(states[displayState].list.length - index - 1) : "N/A"}</b> in {displayState}</p>
      
      <div className="resizable" tabIndex={0} onKeyDown={(e) => handleKey(e)}>
        {index < states[displayState].list.length && states[displayState].list[index] /* magic */} 
        {states[displayState].list.length > 0 && <button className="treemapButton" style={styles.leftButton} onClick={() => setIndex(index > 0 ? index - 1 : index)}>←</button>}
        {states[displayState].list.length > 0 && <button className="treemapButton" style={styles.rightButton} onClick={() => setIndex(index < states[displayState].list.length - 1 ? index + 1 : index)}>→</button>}
      </div>
      

      <div style={{backgroundColor: "white", paddingTop: 10, marginBottom: 10, paddingLeft: 5, paddingRight: 5, color:"black", paddingBottom: 10}}>
        {states[displayState].list && states[displayState].list.length > 0 && states[displayState].firstYear + 4*(states[displayState].list.length - 1)}
        <input 
          type="range" style={{width: 500}} min={0} max={states[displayState].list.length - 1} step={1} value={index}
          onChange={(e) => setIndex(e.target.value)}
          list="tickmarks"
        />
        <datalist id="tickmarks">
        {states[displayState].list.length > 0 && [...Array(states[displayState].list.length).keys()].map(e => 
          <option value={e} label={e*4} key={e}/>
        )}
        </datalist>
        {states[displayState].list && states[displayState].list.length > 0 && states[displayState].firstYear}
      </div>
      <TreemapKey/>

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
    textAlign: "center"

  },
  genButton: {
    width: "250px",
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