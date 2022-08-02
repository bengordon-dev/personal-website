import React, {useState} from "react";
import '../App.css';
import USState from "./USState";
import { statePaths } from "./statePaths";
import { EVData1916 } from "../data/EVData1916";

function color(ratio) {
  //let quotient = (ratio/7105.78 - 1)*(255/) 
  let quotient = (ratio - 7105.78)/(76892.5 - 7105.78)*255;
  return `rgb(${255 - quotient}, ${quotient}, 0)`;
}

export default function USMap(props) {
  const [hoveredState, setHoveredState] = useState("");

  return (
    <svg
      height="589px"
      style={{strokeLineJoin: "round", stroke: "#000", fill: "none"}}
      width="1000px"
      id="svg"
    >
      {statePaths && statePaths.map((state, key) => (
        <USState
          id={state.id}
          d={state.d}
          onMouseEnter={() => setHoveredState(state.id)}
          onMouseLeave={() => setHoveredState("")}
          //fill={hoveredState === state.id ? "#ff0000" : "#f9f9f9"}
          fill={EVData1916[state.id] ? color(EVData1916[state.id].ratio) : "#999999"}
          opacity={hoveredState === state.id ? 0.5: 1}
          key={key}
        />
      ))}
      
    </svg>
  )
}