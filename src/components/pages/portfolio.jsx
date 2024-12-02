import AboutMe from "../portfolio/AboutMe"
import Sandbox from "../portfolio/Sandbox"
import Projects from "../portfolio/Projects";
import Education from "../portfolio/Education";

function Portfolio() {

  return (
    <div>
      <AboutMe/>
      {/* <Sandbox/> */}
      <Projects/>
      <Education/>
    </div>
  )

}

export default Portfolio;