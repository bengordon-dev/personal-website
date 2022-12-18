import React from "react";
import '../App.css';
import {colors} from "../data/PartyInfo" 

function ColorRow(props) {
  return (
    <g>
      {props.color && props.color.map((col, i) => (
        <rect x={props.x + 30*i} y={props.y} height="30" width="30" stroke="black" fill={props.color[i]}/>
      ))}
    </g>
  )
}

export default function EVKey(props) {
  return (
    <div className="resizable evKey">
      <svg width="100%" height="100%" viewBox="0 0 700 100"
        style={{background: "white", marginBottom: 10}} 
      >
        <text x="50%" y="15" dominantBaseline="central" textAnchor="middle"  style={{fill: "black", fontSize: 14, fontWeight: "bold"}}>
          Relative power of Voter (% of national average)
        </text>
        <ColorRow x={50} y={40} color={[...colors["PRO"].reverse(), ...colors["GOP"]]}/>
        {[...Array(9).keys()].map((i) => <text 
          x={80 + 30*i} y={80} style={{fill: "black", fontSize: 13}}
          dominantBaseline="central" textAnchor="middle">
          {`${i*10 + 10}`}
        </text>)}
        {[...Array(10).keys()].map((i) => <text 
          x={350 + 30*i} y={80} style={{fill: "black", fontSize: 13}}
          dominantBaseline="central" textAnchor="middle">
          {`${i*50 + 100}`}
        </text>)}

      </svg>
    </div>
  )
}