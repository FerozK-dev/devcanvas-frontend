import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExperience, fetchExperiences } from "../../store/experience-slice"
import AddExpereience from "./AddExperienceModal";
import EditExpereience from "./EditExperienceModal";

function Experience({ data, isPublic }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const dispatch = useDispatch();

  const [experiences, setExperiences] = useState(
    useSelector((state) => state?.experiences?.allExperiences)
  );

  useEffect(() => {
    if (isPublic && data) {
      setExperiences(data || []);
    } else if (!isPublic) {
        dispatch(fetchExperiences())
        .unwrap()
        .then((result) => {
          setExperiences(result);
        });
    }
  }, [dispatch, isPublic, data]);

  const deleteHandler = (experience) => {
    dispatch(
      deleteExperience({
        id: experience.id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        setExperiences(experiences.filter((m) => m !== experience));
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError.message);
      });
  };

  const openEditModal = (experience) => {
    setSelectedExperience(experience);
    setModalOpen(true);
  };

  const renderExperience = experiences?.map((experience) => {
    const { id, title, description, employment_type, company, location, industry, start_date, end_date, headline } = experience;
    return (
      <div
        key={id}
        // className="flex flex-col lg:flex-row justify-between mb-8 grid grid-cols-4 gap-4"
        className="mb-8 grid grid-cols-5 gap-4"
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
        {!isPublic && (
          <>
          <div className="space-y-2 md:space-y-4">
            <button
              onClick={() => openEditModal(experience)}
              className="font-medium w-12 h-12 md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-500 hover:text-gray-700 transition ease-linear duration-500"
            >
              Edit
            </button>
          </div>
          <div className="space-y-2 md:space-y-4">
            <button
              onClick={() => deleteHandler(experience)}
              className="font-medium h-12 w-12 md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-500 hover:text-gray-700 transition ease-linear duration-500"
            >
              Delete
            </button>
          </div>
          </>
        )}
      </div>
    )
  });

  return (
    <section className="py-10 md:py-16  bg-gray-50">
      <div className="container max-w-screen-xl mx-auto px-4">

        <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Experience</h1>

        <p className="font-normal text-gray-500 text-xs md:text-base mb-20">Below is a summary of the places I studied</p>
        {renderExperience}

        {!isPublic && (
          <>
            <button
              onClick={() => setModalOpen(true)}
              className="px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-500 hover:text-gray-700 transition ease-linear duration-500"
            >
              Add Experience
            </button>
            <AddExpereience  
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
            />
            {selectedExperience && (
              <EditExpereience
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                id={selectedExperience.id}
              />
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default Experience;