import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEducation, fetchEducations } from "../../store/education-slice"

import Button from '../reusable/Button';
import FormInput from '../reusable/FormInput';
import { useNavigate } from "react-router-dom";



function Education(){
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [educations, setEducations] = useState(
    useSelector((state) => state?.educations?.allEducations)
  );

  // const userCalorieLimit = useSelector(
  //   (state) => state.profile.profileData.calorie_limit
  // );

  useEffect(() => {
    dispatch(fetchEducations())
      .unwrap()
      .then((result) => {
        setEducations(result);
      });
  }, [educations?.length]);

  const deleteHandler = (education) => {
    dispatch(
      deleteEducation({
        id: education.id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        setEducations(educations.filter((m) => m !== education));
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError.message);
      });
  };

  const renderEducation = educations?.map((education) => {
    const { id, description, start_year, end_year, school, degree, field, grade, activities} = education;
    return (
      <div className="bg-gray-50 px-8 py-10 rounded-md" key={id}>
        <h4 className="font-medium text-gray-700 text-lg mb-4">{school}</h4>
        <h5 className="font-medium text-gray-700 text-lg mb-4">{start_year} – {end_year}</h5>
        <h5 className="font-medium text-gray-700 text-lg mb-4">{degree}</h5>
        <h5 className="font-medium text-gray-700 text-lg mb-4">{field}</h5>

        <p className="font-normal text-gray-500 text-md mb-4">{description}</p>
        <h5 className="font-medium text-gray-700 text-lg mb-4">Grade: {grade}</h5>

        <div className="relative">
          <h6 className="font-semibold text-gray-500 text-md relative z-10">See the place here</h6>
          <span className="w-32 h-1 bg-blue-200 absolute bottom-1 left-0 z-0"></span>
        </div>
      </div>
    )
  });

  return(
    <section className="py-10 md:py-16">

      <div className="container max-w-screen-xl mx-auto px-4">

        <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Education</h1>

        <p className="font-normal text-gray-500 text-xs md:text-base mb-20">Below is a summary of the places I studied</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderEducation}
        </div>
      </div>
    </section>

  )
}

export default Education;