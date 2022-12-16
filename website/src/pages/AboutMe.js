import React, {useState, useEffect} from "react";
import '../App.css';
import SectionHeader from "../components/SectionHeader";

export default function AboutMe() {
  useEffect(() => {
    document.title = "About Me - Ben Gordon"
  }, []);
  const [eduOpen, setEduOpen] = useState(false)
  const [earlyOpen, setEarlyOpen] = useState(true)
  const [progOpen, setProgOpen] = useState(true)
  const [passionOpen, setPassionOpen] = useState(true)

  return (
    <div className="aboutMeScreen">
     
    <h1 style={{textAlign: "center", marginBottom: "0.5em"}}>About Me</h1>
    <SectionHeader
      title="Early Life"
      open={earlyOpen}
      onClick={() => setEarlyOpen(!earlyOpen)}
    />
    {earlyOpen && <div className="aboutMeSection">
      <p>
        I grew up in Mooresville, North Carolina, on the shore of Lake Norman.</p>
      <p>I attended the <a style={{color: "white"}} href="https://www.ncssm.edu/">North Carolina School of Science 
        and Mathematics,</a> a lovely boarding school in the wonderful city of Durham. I cannot recommend it enough;
        going there greatly broadened my horizons and allowed me to learn many technical and life skills at a young age.
      </p>
      <p>I wrote my first line of code at age 9, in Python.</p>
    </div>}

    

    <SectionHeader
      title="College"
      open={eduOpen}
      onClick={() => setEduOpen(!eduOpen)}
    />
    {eduOpen && <div className="aboutMeSection">
      <p>I am a second-year Computer Science major at the <a href="https://www.utexas.edu/">University of Texas</a> at 
        Austin. Here is a semester-by-semester rundown of my college experience:
      </p>

      <p>
        <b>Spring 2023</b> (15 hours)<br/>
        CS classes: Algorithms and Complexity, Object-Oriented Programming
      </p>

      <p>
        <b>Fall 2022</b> (14 hours)<br/>
        By far my most difficult semester so far.<br/>
        Notable classes: Operating Systems<br/>
        Clubs: Freetail Hackers, Texas Convergent<br/>
        Other preoccupations: recruiting
      </p>

      <p>
        <b>Summer 2022 </b> (15 hours)<br/>
        I partipated in the McCombs Summer Institute, earning most (5/6 classes) of a minor in business.<br/>
        Classes: Finance, Accounting, Business Law and Ethics, Marketing, Management <br/>
        Clubs: Freetail Hackers <br/>
        Other passions: table tennis
      </p>

      <p>
        <b>2. Spring 2022 </b> (16 hours)<br/>
        Cool Classes: Computer Architecture, Quantum Computing I, Linear Algebra<br/>
        Clubs: Texas Convergent, Quantum Collective, Longhorn Quiz Bowl<br/>
        Other passions: lifting, roller skating 
      </p>

      <p>
        <b>1. Fall 2021</b> (12 hours)<br/>
        Cool Classes: Data Structures, Discrete Math<br/>
        Clubs: Texas Product Engineering Organization, Texas Table Tennis, Longhorn Quiz Bowl<br/>
        Other passions: lifting, Robert Caro books
      </p>

    </div>}

    <SectionHeader
      title="Persistent Passions"
      open={passionOpen}
      onClick={() => setPassionOpen(!passionOpen)}
    />
    {passionOpen && <div className="aboutMeSection">
      <p>I greatly enjoy table tennis. While I had a table at home growing up, I never truly loved
        the game until I played it in the NCSSM Woolworth room.
        If one defines talent as the derivative of ability with
        respect to the effort one has put in, I am perhaps lacking; nonetheless, I try to play at least once a week. 
      </p>
      <p>I have lost countless hours to the following two puzzle games. You should try them! 
        <ul>
          <li>Sean O'Connor's <a href="http://www.windowsgames.co.uk/slay.html">Slay</a></li>
          <li>Henry Liou's implementation of <a href="http://liouh.com/picross/">Picross</a></li>
        </ul>
      </p>
    </div>}
  </div>
  )
}
