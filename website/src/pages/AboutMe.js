import React, {useState, useEffect} from "react";
import '../App.css';
import SectionHeader from "../components/SectionHeader";
import {Link} from "react-router-dom"

export default function AboutMe() {
  useEffect(() => {
    document.title = "About Me - Ben Gordon"
  }, []);
  const [eduOpen, setEduOpen] = useState(true)
  const [earlyOpen, setEarlyOpen] = useState(true)
  const [passionOpen, setPassionOpen] = useState(true)

  return (
    <div className="aboutMeScreen">
     
    <h1 style={{textAlign: "center", marginBottom: "0.5em"}}>About Me</h1>
    <SectionHeader
      title="Early Life"
      open={earlyOpen}
      setOpen={setEarlyOpen}
    />
    {earlyOpen && <div className="aboutMeSection">
      <p>
        I grew up in Mooresville, North Carolina, and later attended the <a style={{color: "white"}} 
        href="https://www.ncssm.edu/">North Carolina School of Science and Math</a> in Durham, 
        which I cannot recommend enough.
        I wrote my first line of code at age 9 in Python, and also dabbled around in Scratch, but first 
        seriously learned to code in middle school.
      </p>
    </div>}

    <SectionHeader
      title="Persistent Passions"
      open={passionOpen}
      setOpen={setPassionOpen}
    />
    {passionOpen && <div className="aboutMeSection">
      <p>My favorite hobbies are learning new things, working out, and playing table tennis.
      </p>
      <p>I have lost countless hours to the following puzzle games: 
        <ul>
          <li>Picross, first by <a href="http://liouh.com/picross/">Henry Liou</a>, nowadays 
          by <Link to="/projects/picross">myself</Link></li>
          <li>Sean O'Connor's <a href="http://www.windowsgames.co.uk/slay.html">Slay</a>, through
          the end of sophomore year of college</li>
          <li>Minesweeper, early on in high school</li>
        </ul>
      </p>
      <p>My favorite books are <a href="https://www.penguinrandomhouse.com/authors/4318/robert-a-caro/">
        Robert Caro's</a> <i>The Years of Lyndon Johnson</i> series.</p>
    </div>}

    <SectionHeader
      title="College"
      open={eduOpen}
      setOpen={setEduOpen}
    />
    {eduOpen && <div className="aboutMeSection">
      <p>I studied computer science at the <a href="https://www.utexas.edu/">University of Texas</a> at 
        Austin, graduating in three years.
      </p>

      <p>
        <b>Favorite (Voluntarily Chosen) Classes</b><br/>
        Hard CS classes: Honors Graphics with Dr. Vouga, Concurrency with Dr. Rossbach<br/>
        Moderate CS classes: iOS Mobile Computing with Dr. Bulko, ML 1 with Prof. Beasley<br/>
        Other Subjects:
        <ul>
          <li>Organic Chemistry I with Dr. Callman</li>
          <li>U.S. Constitutional History with Dr. Fourmy</li>
          <li>Ideas of the 20th Century with Dr. Bonevac (my UGS, effectively chosen at random)</li>
        </ul>
      </p>
      
      <p>
        <b>Clubs</b><br/>
        I was in <a href="https://txconvergent.org/">Texas Convergent</a> for five semesters and <a href="https://freetailhackers.com/">
        Freetail Hackers</a> for three.
      </p>

      <p>
        <b>Summers</b><br/>
        In 2023 (after sophomore year) I interned at Capital One in Richmond, VA.<br/>
        In 2022 (after freshman year) I participated in the McCombs Summer Institute, earning most (5/6 classes) of a business
            minor in 8 weeks.
      </p>
    </div>}
  </div>
  )
}
