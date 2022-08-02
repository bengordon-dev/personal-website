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
      title="Early Life"
      open={earlyOpen}
      onClick={() => setEarlyOpen(!earlyOpen)}
    />
    {earlyOpen && <div className="aboutMeSection">
      <p style={styles.details}>
        I grew up in Mooresville, North Carolina, on the shore of Lake Norman.</p>
      <p style={styles.details}>I attended the <a style={{color: "white"}} href="https://www.ncssm.edu/">North Carolina School of Science 
        and Mathematics,</a> a lovely boarding school in the wonderful city of Durham. I cannot recommend it enough;
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
        I wrote my first line of code in elementary school, and really got started in middle school. My first language was Python. <br/>
        JavaScript has been a large part of my life for a long time. I spent a lot of time working on large frontend projects in regular JS/HTML,
        React, and React Native during the summers of 2019, 2020, and 2021 respectively.<br/>
        High school classes made me familliar with Java and C, which has made college go a lot smoother.<br/>
        I learned how to work with Arduinos and basic breadboard circuits in 2019 at a summer camp. Those skills have stayed surprisingly relevant
        due to my current extracurriculars!
      </p>
    </div>}
    
    <SectionHeader
      title="College"
      open={eduOpen}
      onClick={() => setEduOpen(!eduOpen)}
    />
    {eduOpen && <div className="aboutMeSection">
      <p style={styles.details}>I am a second-year Computer Science major at the <a href="https://www.utexas.edu/">University of Texas</a> at 
        Austin.<br/>
        Semester Rundown:
      </p>

      <p style={styles.details}>
        <b>Summer 2022 </b> (15 hours)<br/>
        I partipated in the McCombs Summer Institute, earning most (5/6 classes) of a minor in business.
        Classes: Finance, Accounting, Business Law and Ethics, Marketing, Management <br/>
        Clubs: Freetail Hackers <br/>
        Other passions: table tennis
      </p>

      <p style={styles.details}>
        <b>2. Spring 2022 </b> (16 hours)<br/>

        Cool Classes: Computer Architecture, Quantum Computing I, Linear Algebra<br/>
        Clubs: Texas Convergent, Quantum Collective, Longhorn Quiz Bowl<br/>
        Other passions: lifting, roller skating 
      </p>
      <p style={styles.details}>
        <b>1. Fall 2021</b> (12 hours)<br/>
        Cool Classes: Data Structures, Discrete Math<br/>
        Clubs: Texas Product Engineering Organization, Texas Table Tennis, Longhorn Quiz Bowl<br/>
        Other passions: lifting, Robert Caro books

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