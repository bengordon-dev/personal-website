import React from "react";

export default function SectionHeader(props) {
  return (
    <div style={styles.container}>
      <div style={styles.topRow}>
        <h2>{props.link ? <a href={props.link}>{props.title}</a> : props.title}</h2>
        <button style={styles.button} onClick={props.onClick}>{props.open ? "˅" : "Click to expand ˄"}</button>
      </div>
      <hr/>
    </div>
  )
}

const styles = {
  container: {
    width: "100%",
    marginBottom: "0.5em",
  },
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
    fontSize: 20
  }
}