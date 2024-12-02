import AboutMe from "../portfolio/AboutMe"
import Sandbox from "../portfolio/Sandbox"
import Projects from "../portfolio/Projects";
import Education from "../portfolio/Education";
import Experience from "../portfolio/Experience";

function Portfolio() {

  return (
    <div>
      <AboutMe/>
      {/* <Sandbox/> */}
      <Education/>
      <Experience/>
      <Projects/>
    </div>
  )

}

export default Portfolio;