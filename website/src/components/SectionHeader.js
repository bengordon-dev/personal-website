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
    marginRight: 0,

    border: "none",
    backgroundColor: "#282c34",
    color: "white",
    fontSize: 20
  }
}