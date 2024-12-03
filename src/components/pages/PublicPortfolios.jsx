import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicProfile } from "./../../store/public-profile-slice";
import AboutMe from "../portfolio/AboutMe";
import Projects from "../portfolio/Projects";
import Education from "../portfolio/Education";
import Experience from "../portfolio/Experience";
import { useNavigate } from "react-router-dom";

function PublicPortfolio({ userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { portfolioData, status } = useSelector((state) => state.publicProfile);
  console.log("status", status)

  useEffect(() => {
    dispatch(fetchPublicProfile(1));
  }, [dispatch]);

  if (status === "failed") {
    navigate("/notfound");
  }

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>
      {portfolioData && (
        <>
          <AboutMe data={portfolioData} isPublic={true}/>
          <Education data={portfolioData?.educations} isPublic={true}/>
          <Experience data={portfolioData?.experiences} isPublic={true}/>
          <Projects data={portfolioData?.projects} isPublic={true}/>
        </>
      )}
    </div>
  );
}

export default PublicPortfolio;
