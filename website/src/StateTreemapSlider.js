import React, {useState, useEffect} from "react"
import StateTreemap from "./StateTreemap";
import { colors, names, squareColor } from './data/PartyInfo';
import "./App.css"


export default function StateTreemapSlider(props) {
  const [maps, setMaps] = useState([])
  const [index, setIndex] = useState(0)
  const [displayState, setDisplayState] = useState("N/A");
  
  const generateMaps = () => {
    let newMaps = [];
    props.stateData && props.stateData[displayState] && props.stateData[displayState].forEach(element => {
      const svgParams = {
        data: element.countyData && element.countyData.map(row => {
          return {label: row.label, value: row.totalVotes, color: squareColor(row.party, Math.floor(row.marginPct / 10))}
        })
          .sort((x, y) => x.value - y.value),
        width: props.mapWidth,
        height: props.mapHeight
      }
      newMaps.push({year: element.year, tmap: <StateTreemap key={`${element.year}map`}svgParams={svgParams}/>})
    });
    setMaps(newMaps.reverse())
    setIndex(0)
  }
  
  return (
    <div style={{...styles.container, width: props.mapWidth ? props.mapWidth : 700}} className="noMarginBlock">
      <div style={{display: "flex", width: "70%", }}>
        <select value={displayState} onChange={(e) => setDisplayState(e.target.value)} style={{...styles.stateSelector, marginLeft: 0, marginRight: "auto"}}>
          <option value="N/A">Select State</option>
          {props.stateList && props.stateList.map((e, i) => <option value={e.valueName} key={i}>{e.displayName}</option>)}
        </select>

        <button style={styles.genButton} onClick={() => {generateMaps(); setIndex(0)}}>Generate/Refresh maps</button>
      </div>
      <p style={{fontSize: 22, paddingTop: 5, paddingBottom: 5}}>Presidential Election of <b>{index < maps.length ? maps[index].year : "N/A"}</b> in {displayState}</p>
      
      {index < maps.length && maps[index].tmap /* magic */} 
      
      <div style={{backgroundColor: "white", paddingTop: 10, paddingLeft: 5, paddingRight: 5, color:"black", paddingBottom: 10}}>
        {maps && maps.length > 0 && maps[0].year}
        <input 
          type="range" style={{width: 500}} min={0} max={maps.length - 1} step={1} value={index}
          onChange={(e) => setIndex(e.target.value)}
          list="tickmarks"
        />
        <datalist id="tickmarks">
        {maps.length > 0 && [...Array(maps.length).keys()].map(e => 
          <option value={e} label={e*4} key={e}/>
        )}
        </datalist>
        {maps && maps.length > 0 && maps[maps.length - 1].year}
      </div>
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

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  }
}