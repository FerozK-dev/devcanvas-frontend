import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, fetchProjects } from "../../store/projects-slice"
import AddProjects from "./AddProjectModal";
import EditProject from "./EditProjectModal";
import Button from "../reusable/Button";

function Projects() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
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

    const openEditModal = (project) => {
      setSelectedProject(project);
      setModalOpen(true);
    };

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
        <div className=" w-96">
          <img 
            src={display_image} 
            alt="Profile" 
            className="h-40 rounded-lg object-cover" 
          />
        </div>

        <span className="hidden lg:block w-0.5 bg-gray-300"></span>

        <div className="w-3/5 h-72">
          <h1 className="font-normal text-gray-700 text-3xl md:text-4xl mb-5">{title}</h1>

          <p className="font-normal text-gray-500 text-sm md:text-base">{description}</p>
          {/* <p className="font-normal text-gray-500 text-sm md:text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae dignissimos non culpa, aperiam quas facilis fuga aliquid iure, inventore, laboriosam dicta voluptatem consequatur quo. Repellendus aliquam ipsam aspernatur quo impedit.</p> */}
        </div>
        <button
          onClick={() => openEditModal(project)}
          className="md:px-9 md:py-4 font-medium h-12 lg:flex-row md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-500 hover:text-gray-700 transition ease-linear duration-500"
        >
          Edit
        </button>
      </div>
    )
  });

  return (
    <section className="py-10 md:py-16">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="mb-10 lg:mb-0 mr-24">
            <h1 className="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Portfolio</h1>

            <p className="font-normal text-gray-500 text-xs md:text-base">I have brought here my biggest and favorite works <br/> as a professional.</p>
          </div>

          <div className="space-y-16 container">
            {renderProjects}
          </div>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-500 hover:text-gray-700 transition ease-linear duration-500"
        >
          Add a Project
        </button>
        <AddProjects  
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
        {selectedProject && (
          <EditProject
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            id={selectedProject.id} // Pass the selected project to the modal
          />
        )}
      </div>
    </section>
  )
}

export default Projects;
