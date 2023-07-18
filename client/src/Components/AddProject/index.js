import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "../../SideNav";
import Header from "../../Header";
import "./AddProject.css";
import axios from "axios";

function AddProject() {
  const setSelectedItem = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [userType] = useState("Staff");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    requiredSkills: "",
    scholarships: "",
    contactInfo: "",
  });
  const navigationItems = [
    { id: 1, label: "Home", url: "/loggedin" },
    { id: 2, label: "Profile", url: "/Profile" },
    { id: 3, label: "Add Project", url: "/Project" },
    { id: 5, label: "Sign Out", url: "/signout" },
  ];
  const handleToggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
    document.body.classList.toggle("nav-open");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/project";
      const { data: res } = await axios.post(url, JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
      });
      navigate("/loggedin");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const renderAddProjectForm = () => {
    return (
      <div>
        <form onSubmit={handleSubmit} action="/Project">
          <h3>Add Project:</h3>

          <label htmlFor="title">
            <b>Title</b>
          </label>
          <input
            type="text"
            placeholder="Enter Title of project"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">
            <b>Description</b>
          </label>
          <input
            type="text"
            placeholder="Enter Description of Project"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label htmlFor="department">
            <b>Department</b>
          </label>
          <input
            type="text"
            placeholder="Enter Department of Project"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <label htmlFor="requiredSkills">
            <b>Required Skills</b>
          </label>
          <input
            type="text"
            placeholder="Enter the Required Skills"
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            required
          />

          <label htmlFor="scholarships">
            <b>Scholarships</b>
          </label>
          <input
            type="text"
            placeholder="Enter Scholarships available"
            name="scholarships"
            value={formData.scholarships}
            onChange={handleChange}
          />

          <label htmlFor="contactInfo">
            <b>Contact Information</b>
          </label>
          <input
            type="email"
            placeholder="Enter Contact Information"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            required
          />

          <button className="submitBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <Header onToggleNav={handleToggleNav} />
      <SideNav
        isNavOpen={isNavOpen}
        navigationItems={navigationItems}
        onItemClick={setSelectedItem}
        setIsNavOpen={setIsNavOpen}
      />
      <div className="container">
        <h3>Add Project Page</h3>
        {renderAddProjectForm()}
      </div>
    </div>
  );
}

export default AddProject;
