import React from "react"
import USMap from './USMap';
import StateTreeMapSlider from "./StateTreemapSlider"
import {northCarolina} from "./data/newNorthCarolina"

export default function Elections() {
  return (
    <div>

      <StateTreeMapSlider stateData={northCarolina} state={"North Carolina"} mapWidth={700} mapHeight={700}/>
      <p>WIP - <a style={{color: "white"}} href="https://github.com/bengordon-dev/elections">GitHub link to source code/what I'm still working on</a></p>

      {/*Electoral votes cast per human vote cast, 1876-2020<br/>
      Treemaps of statewide presidential election results (by county,) 1900-2020
*/}
      {/* <USMap/>
      <a href="https://simplemaps.com/resources/svg-us">Path data from https://simplemaps.com/resources/svg-us</a>*/}
    </div>  
  )
}