import React, {useState} from "react";
import '../App.css';
import USState from "./USState";
import { statePaths } from "../data/statePaths.js";
import { EVData } from "../data/EVData"

const reds = ["#FFD4D4", "#FFB2B2", "#FF7F7F", "#FF4C4C", "#FF0000", "#B20000", "#7F0000", "#660000", "#4C0000", "#330000"]
const greens = ["#D4FFD4", "#B2FFB2", "#7FFF7F", "#4CFF4C", "#00FF00", "#00B200", "#007F00", "#006600", "#004C00", "#003300"]

function color(ratio) {
  if (ratio > 5.5) {
    return reds[9]
  } else if (ratio >= 1) {
    return reds[Math.floor((ratio - 1)/.5)]
  } else if (ratio > 0) {
    return greens[Math.floor((1 - ratio)*10)]
  }
  return "#999999"
}

export default function EVMap(props) {
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
          fill={EVData[state.id] && EVData[state.id][props.index] > 0 ? color(EVData[state.id][props.index]) : "#999999"}
          opacity={hoveredState === state.id ? 0.5: 1}
          key={key}
        />
      ))}
    </svg>
  )
}