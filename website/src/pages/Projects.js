import React, {useState, useEffect} from "react";
import '../App.css';
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";


export default function Projects() {
  useEffect(() => {
    document.title = "Projects - Ben Gordon"
  }, []);
  const [webOpen, setWebOpen] = useState(true)
  const [mergeOpen, setMergeOpen] = useState(false)
  const [convOpen, setConvOpen] = useState(true)
  const [bladeOpen, setBladeOpen] = useState(false)
  const [consiliaOpen, setConsiliaOpen] = useState(false)
  const [volOpen, setVolOpen] = useState(false)
  const [hackOpen, setHackOpen] = useState(false)


  return (
    <div className="aboutMeScreen">
      <h1 style={{textAlign: "center", marginBottom: "0.75em"}}>Projects</h1>
      <p style={styles.below}>This page serves 2 purposes - both as a place to describe past projects beyond the confines of resume 
        bulletpoints, and as a convenient location to host web projects meant for use by others. </p>
      <SectionHeader
        title="Web Projects"
        open={webOpen}
        setOpen={setWebOpen}
      />
      {webOpen && <div className="aboutMeSection">
      <ul style={styles.below}> 
        <li><Link style={{fontSize: 18, fontWeight: "bold"}} to="/projects/elections">Elections</Link></li>
        <li>Mobile-responsive Picross (whenever I get around to it)</li>
      </ul>
      </div>}

      <SectionHeader
        title="Merge (Freetail Hackers)"
        open={mergeOpen}
        setOpen={setMergeOpen}
        lastUpdated={"May 2023"}
      />
      {mergeOpen && <div className="aboutMeSection">
        <p><b><a href="https://gitlab.com/freetail-hackers/Merge">GitLab link</a></b></p>
        <p>
          As I built Merge up, it built me up. As Merge built me up, I built it up yet further. Such 
          is the story the preeminent project of my sophomore year of college, and the largest project I have ever 
          contributed to as of the time of writing. 
          Working on Merge taught me not only its particular tech stack but much about programming
          in general.
        </p>
      </div>}

      <SectionHeader
        title="Convergent Projects"
        open={convOpen}
        setOpen={setConvOpen}
      />
      {convOpen && <div className="aboutMeSection">
        <p>
          I participated in the <a href="https://www.txconvergent.org/">Texas Convergent</a> Build Teams 
          program for 2 semesters. The code I wrote there is arguably some of my finest work (as of December 2022.)
          My team won the "Best Technology" award in both semesters that I participated.
        </p>
        <p>
          <a href="https://github.com/bengordon-dev/fa22-sustainability-water">Launder</a> was my project in Fall 2022.

        </p>
        <p>
          <a href="https://github.com/bengordon-dev/sp22-iot-disability/">ForeSense</a> was my project in Spring 2022.
          It prepared me well for being an IoT lead later on.
        </p>
      </div>}

      <SectionHeader
        title="NeonBlader (RowdyHacks 2023)"
        open={bladeOpen}
        setOpen={setBladeOpen}
      />
      {bladeOpen && <div className="aboutMeSection">
        <p style={styles.below}>
          <b><a href="https://github.com/DinDin23/RowdyHacks2023">GitHub Link</a></b><br/>
          My three wonderful teammates and I achieved quite a lot in our 24 hours at RowdyHacks, making a silly 
          little rollerskating-themed online multiplayer racing game.
          Our tech stack was React, React Three Fiber (written on top of Three.js) for graphics, 
          Socket.io for real-time communication, MongoDB to store account information (only half-done), and Google Cloud
          (again, only half-done) to host our app.
        </p>
      </div>
      }

      <SectionHeader
        title="Consilia (HackTX 2021)"
        open={consiliaOpen}
        setOpen={setConsiliaOpen}
        lastUpdated={"January 2022"}
      />
      {consiliaOpen && <div className="aboutMeSection">
        <p style={styles.below}>
          <b><a href="https://github.com/consilia-proj/consilia-mobile-app">GitHub Link</a></b><br/>
          HackTX 2021 (on October 30th-31st) was, for me, the very satisfying culmination of a lot of recent learning! 
          The time I spent throughout 2021 writing React Native code paid off majorly, as did the extracurricular endeavors of my fall semester. 
          <br/>
          I did a majority of the frontend work for my team's mobile app. It was a fun 24 hours, and it went very smoothly overall;
          most of the React Native bugs I encountered were things I had seen before. While I didn't write any of the backend,
          my newfound understanding of APIs made it both easier to use my teammates' code and more fun; I could eagerly see how
          everything was fitting together.
        </p>
      </div>}

      <SectionHeader
        title="Volunity (2021)"
        open={volOpen}
        setOpen={setVolOpen}
        link={"https://github.com/bengordon-dev/volunity-archive"}
        id="Volunity"
        lastUpdated="January 2022"
      />
      {volOpen && <div className="aboutMeSection">
        <p>Volunity was a fun project I did with 2 high school friends. The ultimate goal was to create an effective
        system, complete with a mobile app and cross-platform website, to connect volunteers and donors with charitable/nonprofit organizations. 
        The idea was noble - we had spent most of middle and high school with "community service" in the back of our minds, and the 
        experiences of our lead strategist in corporate internships made us think there really was a need we could meet.
        <br/><br/>Development consisted of the following phases:</p>
        <ul>
          <li>Getting familliar with React Native, the framework we chose for mobile development</li>
          <li>Working tirelessly to make a "functional" (in appearance) mobile app frontend</li>
          <li>Suffering through, and ultimately resolving, an assortment of development envrionment issues (using React Native CLI instead of Expo for <i>everything</i> may have been a mistake)</li>
          <li>Learning the technologies (largely from engineering lectures at the <a href="https://txproduct.org/">Texas Product Engineering Organization</a>)  
            required to make a full-stack web application, and creating a foundation for/shell of one
          </li>
        </ul>
        <p style={styles.below}><br/>The project failed. Technical expertise was unevenly distributed, and it was very hard to stay coordinated and motivated
          after we parted our separate ways for college. At some point, doing vast amounts of unpaid labor for something with great feasibility 
          concerns could only go on so long.
        </p>
        <p style={styles.below}>As a first taste of React Native (and mobile app development more broadly), however, the project was a great success. 
          Learning a new language, JS framework, or programming paradigm requires time and effort; the hours I expended on Volunity
          over several months taught me a great deal.  
        </p>
      </div>}

      <SectionHeader
        title="Minor Hackathon Projects"
        open={hackOpen}
        setOpen={setHackOpen}
      />
      {hackOpen && <div className="aboutMeSection">
        <p>
          <b><a href="https://unihacks.ncssm.edu/unihacks">Unihacks</a> 2019:</b> Astrostacking Application<br/>
          The first hackathon I ever participated in. I wrote a frontend in JavaFX for a project that was not ultimately finished. 
        </p>
        <p>
          <b>HackMIT 2022:</b>Emissions Calendar<br/>
          My team's goal was to make something that took in your Google calendar and offered suggestions to reduce 
          carbon emissions in your transit between events with specified locations. We did not get very far.
        </p>
      </div>}
    </div>  
  )
}

const styles = {
  below: {
    marginBottom: "1.5em"
  }
}