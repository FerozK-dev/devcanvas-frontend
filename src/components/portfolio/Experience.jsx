import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExperience, fetchExperiences } from "../../store/experience-slice"

function Experience() {
  const dispatch = useDispatch();

  const [experiences, setExperience] = useState(
    useSelector((state) => state?.experiences?.allExperiences)
  );


  useEffect(() => {
    dispatch(fetchExperiences())
      .unwrap()
      .then((result) => {
        setExperience(result);
      });
  }, [experiences?.length]);

  const deleteHandler = (experience) => {
    dispatch(
      deleteExperience({
        id: experience.id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        setExperience(experience.filter((m) => m !== experience));
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError.message);
      });
  };

  const renderExperience = experiences?.map((experience) => {
    const { id, title, description, employment_type, company, location, industry, start_date, end_date, headline } = experience;
    return (
      <div
        key={id}
        className="flex flex-col lg:flex-row justify-between mb-8"
      >
        {/* Company */}
        <div className="space-y-2 md:space-y-4">
          <h6 className="font-medium text-gray-400 text-base uppercase">
            Company
          </h6>
          <p className="font-semibold text-gray-600 text-base">
            {company}{" "}
            <span className="font-normal text-gray-300">/ {location}</span>
          </p>
        </div>

        {/* Position */}
        <div className="space-y-2 md:space-y-4">
          <h6 className="font-medium text-gray-400 text-base uppercase">
            Position
          </h6>
          <p className="font-normal text-gray-400 text-base">
            {title}
          </p>
        </div>

        {/* Year */}
        <div className="space-y-2 md:space-y-4">
          <h6 className="font-medium text-gray-400 text-base uppercase">
            Year
          </h6>
          <p className="font-normal text-gray-400 text-base">{start_date} - {end_date}</p>
        </div>
      </div>
    )
  });

  return (
    <section className="py-10 md:py-16">
      <div className="container max-w-screen-xl mx-auto px-4">

        <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Experience</h1>

        <p className="font-normal text-gray-500 text-xs md:text-base mb-20">Below is a summary of the places I studied</p>
        {renderExperience}

        {/* <div className="flex flex-col lg:flex-row justify-between">
          <div className="space-y-8 md:space-y-16 mb-16 md:mb-0">
            <h6 className="font-medium text-gray-400 text-base uppercase">Company</h6>

            <p className="font-semibold text-gray-600 text-base">Massa Fames <span className="font-normal text-gray-300">/ New York</span></p>

          </div>

          <div className="space-y-8 md:space-y-16 mb-16 md:mb-0">
            <h6 className="font-medium text-gray-400 text-base uppercase">Position</h6>

            <p className="font-normal text-gray-400 text-base">Junior Front-End Developer</p>
          </div>

          <div className="space-y-8 md:space-y-16">
            <h6 className="font-medium text-gray-400 text-base uppercase">Year</h6>

            <p className="font-normal text-gray-400 text-base">2016</p>
          </div>
        </div>     */}
      </div>
    </section>
  )
}

export default Experience;