import React from "react";
import "../App.css"

export default function SectionHeader(props) {
  return (
    <div className={`sectionHeader ${props.open ? "openSH" : "closedSH"}`}>
      <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
        <h2>{props.link ? <a href={props.link}>{props.title}</a> : props.title}</h2>
        <button className="buttonSH" onClick={() => props.setOpen(prev => !prev)}>{props.open ? "˅" : "˄"}</button>
      </div>
      <hr/>
      {props.open && props.lastUpdated && <p><i>Last Updated: {props.lastUpdated}</i></p>}
    </div>
  )
}