import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../../store/projects-slice";
import Modal from "../reusable/EditModal";
import ProjectForm from "../reusable/ProjectForm";

function EditProject({ isOpen, onClose, id }) {
  const projects = useSelector((state) => state.projects.allProjects);
  const project = projects?.find((m) => m.id === Number(id))

  const [title, setTitle] = useState("") 
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");


  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen && project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setPicture(project.dipslay_image || "");

    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("id", id)
 
    if (picture) {
      formData.append("display_image", picture);
    }

    dispatch(updateProject(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        // navigate("/portfolio");
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError.error);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-medium text-gray-800 mb-4">Add Project</h2>
      <ProjectForm
        title={title}
        description={description}
        picture={picture}
        setTitle={setTitle}
        setDescription={setDescription}
        setPicture={setPicture}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}

export default EditProject;
