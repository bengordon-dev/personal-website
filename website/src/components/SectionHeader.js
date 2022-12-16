import React from "react";
import "../App.css"

export default function SectionHeader(props) {
  return (
    <div className={`sectionHeader ${props.open ? "openSH" : "closedSH"}`}>
      <div style={styles.topRow}>
        <h2>{props.link ? <a href={props.link}>{props.title}</a> : props.title}</h2>
        <button style={styles.button} onClick={props.onClick}>{props.open ? "˅" : "Click to expand ˄"}</button>
      </div>
      <hr/>
      {props.open && props.lastUpdated && <p><i>Last Updated: {props.lastUpdated}</i></p>}
    </div>
  )
}

const styles = {
  topRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  button: {
    marginLeft: "auto",
    marginRight: "1em",
    border: "none",
    backgroundColor: "rgba(40,44,52, 0)",
    color: "white",
    fontSize: 18
  }
}