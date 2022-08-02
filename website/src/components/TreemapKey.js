import React from "react";
import '../App.css';
import {colors} from "../data/PartyInfo" 

function ColorRow(props) {
  return (
    <g>
      {props.color && props.color.map((col, i) => (
        <rect x={150 + 35*i} y={props.y} height="30" width="30" stroke="black" fill={props.color[i]}/>
      ))}
    </g>
  )
}

export default function TreemapKey(props) {
  return (
    <svg width="500px" height="160px"
      style={{background: "white", marginBottom: 10}} 
    >
      <text x="15" y="40" style={{fill: "black", fontSize: 14, fontWeight: "bold"}}>Victorious Party</text>
      <text x="15" y="70" style={{fill: "black", fontSize: 14}}>Democratic</text>
      <text x="15" y="105" style={{fill: "black", fontSize: 14}}>Republican</text>
      <text x="15" y="140" style={{fill: "black", fontSize: 14}}>Other</text>
      
      <text x="240" y="25" style={{fill: "black", fontSize: 14, fontWeight: "bold"}}>Margin of Victory</text>
     
      {[...Array(10).keys()].map((i) => <text x={150 + 35*i} y="50" style={{fill: "black", fontSize: 13}}>{`${i*10}%`}</text>)}


      <ColorRow y={55} color={colors["DEM"]}/>
      <ColorRow y={90} color={colors["GOP"]}/>
      <ColorRow y={125} color={colors["PRO"]}/>
    </svg>
  )
}