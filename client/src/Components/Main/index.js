import SideNav from "../../../src/SideNav";
import Header from "../../Header";
import Project from "../../ProjectModel";
import ProjectList from "../AddProject/ProjectList";
import { filter_project_data } from "../../Controllers/project_controller";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Main.css";

const Main = () => {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigationItems = [
    { id: 1, label: "Home", url: "/" },
    { id: 2, label: "Log In", url: "/Login" },
    { id: 3, label: "Sign Up", url: "/SignUp" },
  ];

  const handleToggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
    document.body.classList.toggle("nav-open");
  };

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/project")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.log("Error fetching projects:", error);
      });
  }, []);

  const handleSearch = () => {
    const filteredProjects = projects.filter((project) => {
      const matchesSearchQuery = Object.values(project).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });

      const matchesDepartment = selectedDepartment
        ? project.department === selectedDepartment
        : true;

      return matchesSearchQuery && matchesDepartment;
    });

    setSearchResults(filteredProjects);
  };

  // Create a set of unique departments
  const uniqueDepartments = [...new Set(projects.map((project) => project.department))];

  return (
    <div>
      <Header onToggleNav={handleToggleNav} />
      <SideNav
        isNavOpen={isNavOpen}
        navigationItems={navigationItems}
        onItemClick={(selectedItem) => setSelectedItem(selectedItem)}
        setIsNavOpen={setIsNavOpen}
      />

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0px",
          }}
        >
          <input
            type="text"
            placeholder="Search projects"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginTop: "10px", paddingBottom: "15px",}}
          />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            style={{

              
              paddingTop: "15px",
              paddingBottom: "4px",
              borderRadius: "4px",
              backgroundColor: "#f2f2f2",
              color: "#333",
              border: "1px solid #ccc",
            }}
          >
            <option value="">All Departments</option>
            {uniqueDepartments.map((department) => (
              <option value={department} key={department}>
                {department}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleSearch}
            style={{ marginBottom: "15px" }}
          >
            Search
          </button>
        </div>

        <div>
          <ProjectList
            projects={searchResults.length > 0 ? searchResults : projects}
          />

        </div>
      </div>
      <footer></footer>
    </div>
  );
};

export default Main;
