import React from "react";
import '../App.css';

export default function USState(props) {
  return (
    <path
      id={props.id}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      d={props.d}
      style={{strokeWidth: 0.97063118000000004, fill: props.fill, opacity: props.opacity}} 
      onClick={props.onClick}
    />
  )
}