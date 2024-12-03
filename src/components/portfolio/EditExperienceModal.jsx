import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";;
import { fetchExperiences, updateExperience } from "../../store/experience-slice";
import Modal from "../reusable/EditModal";
import ExperienceForm from "../reusable/ExperienceForm";

function EditExpereience({ isOpen, onClose, experience, setExperiences }) {
  const experiences = useSelector((state) => state.experiences.allExperiences);
  
  const [title, setTitle] = useState("") 
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateExperience({
      id: experience?.id,
      title: title,
      description: description,
      company: company,
      end_date: endDate,
      start_date: startDate,
      location: location
    }))
      .unwrap()
      .then((originalPromiseResult) => {
        window.location.reload();
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError.error);
      });
  };

  useEffect(() => {
    if (isOpen && experience) {
      setTitle(experience.title || "");
      setDescription(experience.description || "");
      setCompany(experience.company || "");
      setStartDate(experience.start_date || "");
      setEndDate(experience.end_date || "");
      setLocation(experience.location || "");

    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-medium text-gray-800 mb-4">Add Experience</h2>
      <ExperienceForm
        title={title}
        company={company}
        location={location}
        description={description}
        startDate={startDate}
        endDate={endDate}
        setTitle={setTitle}
        setCompany={setCompany}
        setLocation={setLocation}
        setDescription={setDescription}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        onSubmit={handleSubmit}
      />
        
    </Modal>
  );
}

export default EditExpereience;