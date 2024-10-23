import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePopupState, useDebouce, usePagination } from "../hooks";
import {
  Button,
  BackButton,
  SearchInput,
  ProjectTable,
  Pagination,
  FormProject,
} from "../components";
import { toast } from "react-toastify";

const DEFAULT_VALUE = {
  title: "",
  category: "Education",
  StartDate: "",
  EndDate: "",
  status: "",
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [originalProject, setOriginalProject] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [projectId, setProjectId] = useState("");
  const { currentPage, setCurrentPage, displayedProducts, totalPages } =
    usePagination(projects);

    const {
      value: newProject,
      show: popupAddNew,
      setShow: setPopupAddNew,
      handleClose: closePopup,
      handleChange: handleInputChange,
    } = usePopupState(DEFAULT_VALUE);
  
    const {
      value: updateData,
      setValue: setUpdateData,
      show: updatePopup,
      setShow: setUpdatePopup,
      handleClose: closeUpdatePopup,
      handleChange: handleInputChangeUpdate,
    } = usePopupState(DEFAULT_VALUE);

    
  const fetchData = async () => {
    try {
      const res = await axios.get("/admin/project");
      // Check if the response is as expected
      console.log("Response data:", res.data);

      setProjects(res.data);
      setOriginalProject(res.data);
    } catch (error) {
      console.error("Error fetching Data: ", error.response.data);
    }
  };
  
  useEffect(() => {
    document.title = "Project Page";
  }, []);

  useEffect(() => {
    fetchData()
  }, [updateUI])

  //search filter
  const [searchUser, setSearchUser] = useState("");
  const searchDebouce = useDebouce(searchUser, 500);

  const handleAddNew = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/admin/project",
        newProject, // Send newProject directly
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 201) { // Use status check for successful creation
        console.log("Added new project successfully!");
      }
      setUpdateUI((prevState) => !prevState);
      toast.success("Added new project successfully");
      closePopup();
    } catch (error) {
      console.error("Error: ", error.response?.data || error.message);
      toast.error("Failed to add new project");
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`/admin/project/${id}`);
      setUpdateUI((prevState) => !prevState);
      toast.success("Deleted project!");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleFetchProject = async (id) => {
    setUpdatePopup(true);
    setProjectId(id); //project._id
    try {
      const res = await axios.get(`/admin/project/${id}`);
      setUpdateData(res.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/admin/project/${projectId}`, // Correct project URL
        updateData, // Send the updateData object directly
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) { // Check if the update was successful
        toast.info("Updated project information");
      }
      setUpdateUI((prevState) => !prevState);
      closeUpdatePopup();
    } catch (error) {
      console.error("Error: ", error.response?.data || error.message);
      toast.error("Failed to update project");
    }
  };


  useEffect(() => {
    const dataFilter = originalProject.filter((project) =>
      project.title.toLowerCase().includes(searchDebouce.toLowerCase())
    );
    setProjects(dataFilter);
  }, [searchDebouce, originalProject]);

  return (
    <div className="p-7 container relative">
      <BackButton />
      <div className="flex items-center justify-between pb-4">
        <SearchInput
          onChange={(e) => setSearchUser(e.target.value)}
          placeholder="Search for user by name"
        ></SearchInput>
        <Button onClick={() => setPopupAddNew(true)}>Add new</Button>
      </div>
      <ProjectTable
        ProjectsData={displayedProducts}
        handleRemoveProject={deleteProject}
        handleFetchProject={handleFetchProject}
      ></ProjectTable>
      {popupAddNew && (
        <FormProject
          data={newProject}
          title="Add new project"
          handleClose={closePopup}
          handleChange={handleInputChange}
          handleSubmit={handleAddNew}
          typeButton="Add new"
        ></FormProject>
      )}
      {updatePopup && (
        <FormProject
          data={updateData}
          title="Update project"
          handleChange={handleInputChangeUpdate}
          handleClose={closeUpdatePopup}
          handleSubmit={handleUpdateSubmit}
          typeButton="Update"
        ></FormProject>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setCurrentPage}
        ></Pagination>
      )}
    </div>
  );
};

export default Projects;
