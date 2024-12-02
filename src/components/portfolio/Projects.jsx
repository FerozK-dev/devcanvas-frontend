import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, fetchProjects } from "../../store/projects-slice"

function Projects() {
  const dispatch = useDispatch();

  const [projects, setProjects] = useState(
    useSelector((state) => state?.projects?.allProjects)
  );

  useEffect(() => {
    dispatch(fetchProjects())
      .unwrap()
      .then((result) => {
        setProjects(result);
      });
  }, [projects?.length]);

  const deleteHandler = (project) => {
    dispatch(
      deleteProject({
        id: project.id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        setProjects(Projects.filter((m) => m !== project));
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError.message);
      });
  };

  const renderProjects = projects?.map((project) => {
    const { id, description, title, display_image } = project;
    return (
      // <div className="flex space-x-6" key={id}>
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6" key={id}>
        <div className="flex justify-center">
          <img 
            src={display_image} 
            alt="Profile" 
            className="w-64 h-64 rounded-lg object-cover" 
          />
        </div>

        <span className="hidden lg:block w-0.5 bg-gray-300"></span>

        <div>
          <h1 className="font-normal text-gray-700 text-3xl md:text-4xl mb-5">{title}</h1>

          <p className="font-normal text-gray-500 text-sm md:text-base">{description}</p>
        </div>
      </div>
    )
  });

  return (
    <section className="py-10 md:py-16">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="mb-10 lg:mb-0">
            <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Portfolio</h1>

            <p className="font-normal text-gray-500 text-xs md:text-base">I have brought here my biggest and favorite works <br/> as a professional.</p>
          </div>

          <div className="space-y-24">
            {renderProjects}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects;
