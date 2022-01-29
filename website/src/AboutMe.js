import React, {useState, useEffect} from "react";
import './App.css';
import SectionHeader from "./components/SectionHeader";
//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
export default function AboutMe() {
  useEffect(() => {
    document.title = "About Me - Ben Gordon"
  }, []);
  const [eduOpen, setEduOpen] = useState(true)
  const [earlyOpen, setEarlyOpen] = useState(true)
  const [progOpen, setProgOpen] = useState(true)
  const [passionOpen, setPassionOpen] = useState(true)

  return (
    <div className="aboutMeScreen">
    <SectionHeader
      title="College"
      open={eduOpen}
      onClick={() => setEduOpen(!eduOpen)}
    />
    {eduOpen && <div className="aboutMeSection">
      <p style={styles.details}>I am a first-year Computer Science major at the <a href="https://www.utexas.edu/">University of Texas</a> in 
        Austin. </p>
      <p style={styles.details}>
        Semester Rundown:
      </p>
      <p style={styles.details}>
        <b>2. Spring 2022 (current) </b><br/>
        Hours: 17<br/>
        Exciting Classes: Computer Architecture, Quantum Computing I
      </p>
      <p style={styles.details}>
        <b>1. Fall 2021</b><br/>
        Hours: 12, GPA: 4.0<br/>
        Cool Classes: Data Structures, Discrete Math<br/>
        Preoccupations: Table tennis, learning back-end/full-stack development
      </p>
    </div>}
    <SectionHeader
      title="Early Life"
      open={earlyOpen}
      onClick={() => setEarlyOpen(!earlyOpen)}
    />
    {earlyOpen && <div className="aboutMeSection">
      <p style={styles.details}>
        I grew up in Mooresville, North Carolina, on the shores of Lake Norman.</p>
      <p style={styles.details}>I attended the <a style={{color: "white"}} href="https://www.ncssm.edu/">North Carolina School of Science 
        and Mathematics,</a> a lovely boarding school in the lovely city of Durham. I cannot recommend it enough;
        going there greatly broadened my horizons and allowed me to learn many technical and life skills at a young age.
      </p>
    </div>}
    <SectionHeader
      title="Programming Journey"
      open={progOpen}
      onClick={() => setProgOpen(!progOpen)}
    />
    {progOpen && <div className="aboutMeSection">
      <p style={styles.details}>
        TODO
      </p>
    </div>}
    <SectionHeader
      title="Other Passions"
      open={passionOpen}
      onClick={() => setPassionOpen(!passionOpen)}
    />
    {passionOpen && <div className="aboutMeSection">
      <p style={styles.details}>
        Table tennis, weightlifting, and Robert Caro books
      </p>
    </div>}
  </div>
  )
}

const styles = {
  details: {
    marginBottom: "1.5em",
  }
}