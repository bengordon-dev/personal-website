import React, {useState, useEffect} from "react";
import './App.css';
import { Link } from "react-router-dom";
import SectionHeader from "./components/SectionHeader";


export default function Projects() {
  useEffect(() => {
    document.title = "Projects - Ben Gordon"
  }, []);
  const [webOpen, setWebOpen] = useState(true)
  const [volOpen, setVolOpen] = useState(true)
  const [hackOpen, setHackOpen] = useState(true)


  return (
    <div className="aboutMeScreen">
      <p style={styles.below}>This page serves 2 purposes - both as a place to describe past projects beyond the confines of resume 
        bulletpoints, and as a convenient location to host web projects meant for use by others. </p>
      <SectionHeader
        title="Web Projects"
        open={webOpen}
        onClick={() => setWebOpen(!webOpen)}
      />
      {webOpen && <div className="aboutMeSection">
        <Link style={styles.below} to="/projects/elections">Elections (WIP)</Link> 
      </div>}

      <SectionHeader
        title="Hackathons"
        open={hackOpen}
        onClick={() => setHackOpen(!hackOpen)}
      />
      {hackOpen && <div className="aboutMeSection">
        <p style={styles.below}>
          <b><a href="https://hacktx.com/">HackTX</a> 2021:</b> (October 30-31) <a href="https://github.com/consilia-proj/consilia-mobile-app">Consilia</a><br/>
          HACKTX 2021 was, for me, the very satisfying culmination of a lot of recent learning. 
          I spent a lot of time throughout 2021 writing React Native code, and a lot in the fall semester learning about full-stack development,
          and it all paid off majorly.<br/>
          I did a majority of the frontend work for my team's mobile app. It was a fun 24 hours, and it went very smoothly overall.
          Most of the React Native bugs I encountered were things I had seen before while working on Volunity. My team's backend
          code worked brilliantly, and was easy to use; furthermore, thanks to TPEO lectures, I actually understood how all
          of our code worked together!
        </p>
        <p style={styles.below}>
          <b><a href="https://unihacks.ncssm.edu/unihacks">Unihacks</a> 2019:</b> Astrostacking Application<br/>
          The first hackathon I ever participated in.
        </p>
      </div>}

      <SectionHeader
        title="Volunity (2021)"
        open={volOpen}
        onClick={() => setVolOpen(!volOpen)}
        link={"https://github.com/bengordon-dev/volunity-archive"}
        id="Volunity"
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
    </div>  
  )
}

const styles = {
  below: {
    marginBottom: "1.5em"
  }
}