import React, {useState, useEffect} from "react";
import '../App.css';
import SectionHeader from "../components/SectionHeader";
import {Link} from "react-router-dom"

export default function AboutMe() {
  useEffect(() => {
    document.title = "About Me - Ben Gordon"
  }, []);
  const [eduOpen, setEduOpen] = useState(false)
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
        I grew up in Mooresville, North Carolina, on the shore of Lake Norman. I wrote my first line
        of code at age 9 in Python, and also dabbled around in Scratch, but first seriously learned to 
        code in middle school.
      </p>
      <p>I attended the <a style={{color: "white"}} href="https://www.ncssm.edu/">North Carolina School of Science 
        and Mathematics,</a> a lovely boarding school in the wonderful city of Durham. I cannot recommend it enough;
        going there greatly broadened my horizons and allowed me to learn many technical and life skills at a young age.
      </p>
      <p>I am a third-year Computer Science major at the <a href="https://www.utexas.edu/">University of Texas</a> at 
        Austin. Below one can find a semester-by-semester rundown of my college experience.
      </p>
    </div>}

    

    <SectionHeader
      title="College"
      open={eduOpen}
      setOpen={setEduOpen}
    />
    {eduOpen && <div className="aboutMeSection">
      <p>
        <b>Summer 2023</b><br/>
        I interned at Capital One in Richmond, VA. The new technologies I worked with were Vue.js, Redux, 
        and JS unit tests, but the most important skills I learned were those required to 
        effectively work in a large codebase with many other contributors. <br/>
        Clubs: I was quite bored in the month before my internship started, and I spent a lot of time 
        working on Merge for Freetail Hackers, adding many new features all by myself.<br/>
        Hobbies: I spent a lot of time playing poker with my fellow interns and a very
        large amount of time at the Gold's Gym near my apartment. 
      </p>


      <p>
        <b>4. Spring 2023</b> (12 hours)<br/>
        Classes: Organic Chemistry I, Object-Oriented Programming<br/>
        Clubs: Texas Convergent (now as an officer), Freetail Hackers<br/>
        Other passions: lifting, table tennis, cooking
      </p>

      <p>
        <b>3. Fall 2022</b> (14 hours)<br/>
        Notable classes: The only important class was Operating Systems, which was just as difficult 
        as advertised. This was by far my hardest semester academically.<br/>
        Clubs: In Freetail Hackers I volunteered at HackTX, went to HackMIT, and went from fairly clueless
        to somewhat competent in my tech work. I managed to win Best Tech again in Texas Convergent 
        (this time on the Sustainability team) despite all that was going on.<br/>
        I had no real hobbies but was also preoccupied by my first real attempt at recruiting for 
        internships. 
      </p>

      <p>
        <b>Summer 2022 </b><br/>
        I partipated in the McCombs Summer Institute, earning most (5/6 classes) of a minor in business
        in 8 weeks. It was difficult but incredibly fun, especially towards the end.<br/>
        Classes: Finance, Accounting, Business Law and Ethics, Marketing, Management <br/>
        Clubs: I joined the Freetail Hackers tech team, beginning a long journey of working on their 
        Merge project.<br/>
        Hobbies: There was a ping-pong table in the building where our business classes were, which made 
        life much more enjoyable and gave me several new friends.
      </p>

      <p>
        <b>2. Spring 2022 </b> (16 hours)<br/>
        Cool/Notable Classes: Computer Architecture, Quantum Computing, Linear Algebra, Probability<br/>
        Clubs: I briefly went to Quantum Collective meetings to supplement my learning in class, and 
        went to a few Quiz Bowl tournaments. Most notably I joined Texas Convergent, having 
        great fun and working very hard on my project in the Internet of Things team.<br/>
        Hobbies: lifting, roller skating 
      </p>

      <p>
        <b>1. Fall 2021</b> (12 hours)<br/>
        Cool Classes: Data Structures, Discrete Math, Ideas of the 20th Century<br/>
        Clubs: I "audited" the lectures of the Texas Product Engineering Organization, learning many key
        concepts of full-stack web development. I continued 2 high school hobbies by regularly going 
        to practices of Longhorn Quiz Bowl and Texas Table Tennis.<br/>
        Hobbies: I developed a serious lifting program for the first time and achieved
        astonishing newbie gains. Having more free time and fewer friends than at any other point
        in college, I spent a lot of time reading nonfiction and working on this website.
      </p>

    </div>}

    <SectionHeader
      title="Persistent Passions"
      open={passionOpen}
      setOpen={setPassionOpen}
    />
    {passionOpen && <div className="aboutMeSection">
      <p>I greatly enjoy table tennis. While I had a table at home growing up, I never truly loved
        the game until I played it in the NCSSM Woolworth room.
        If one defines talent as the change in ability per
        unit of effort put in, I am perhaps lacking; nonetheless, I try 
        to play at least once a week. 
      </p>
      <p>I have lost countless hours to the following puzzle games. You should try them! 
        <ul>
          <li>Henry Liou's implementation of <a href="http://liouh.com/picross/">Picross</a>, and 
          &nbsp;<Link to="/projects/picross">my own</Link>, up to the present</li>
          <li>Sean O'Connor's <a href="http://www.windowsgames.co.uk/slay.html">Slay</a>, through
          the end of sophomore year of college</li>
          <li>Minesweeper, early on in high school</li>
        </ul>
      </p>
      <p>My favorite books are <a href="https://www.penguinrandomhouse.com/authors/4318/robert-a-caro/">
        Robert Caro's</a> <i>The Years of Lyndon Johnson</i> series.</p>
    </div>}
  </div>
  )
}
