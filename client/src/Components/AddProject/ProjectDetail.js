import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SideNav from "../../../src/SideNav";
import Header from "../../Header";

function ProjectDetail() {
  const [project, setProject] = useState({});
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [userId, setUserId] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState({});
  const [profileData, setProfileData] = useState("");

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");

    if (!loggedInUserId) {
      // Redirect the user to login if not logged in
      navigate("/login");
    } else {
      setUserId(loggedInUserId);

      fetchProfileData(loggedInUserId);
    }
  });

  const fetchProfileData = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/profile/${userId}`
      );
      const profileData = response.data;
      setProfile(profileData);
      setFirstName(profileData.firstName);
      setLastName(profileData.lastName);
      setEmail(profileData.email);
    } catch (error) {
      console.log("Error fetching profile data:", error);
      setError("Profile not found");
    }
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navigationItems = [
    { id: 1, label: "Home", url: "/" },
    { id: 2, label: "About", url: "/about" },
    { id: 3, label: "Log In", url: "/Login" },
    { id: 4, label: "Sign Up", url: "/SignUp" },
  ];

  const handleToggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
    document.body.classList.toggle("nav-open");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/project/${id}`)
      .then((response) => {
        console.log("Success:", response.data);
        setProject(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
        setError("Project not found");
      });
  }, [id]);

  if (error) {
    console.log("Error rendering:", error);
    return <div>{error}</div>;
  }

  const navigateToFavourites = () => {
    const emailSubject = `Regarding the project: ${project.title}`;
    const emailBody = `Dear staff in charge of ${project.title},\n\nI am interested in the Project: ${project.title}. \nHere is My Information: \nName: ${firstName} ${lastName} \nEmail: ${email} \nPlease feel free to contact me further.\n\nBest regards,\n${firstName}`;
    const staffEmail = project.contactInfo;

    const mailtoUrl = `mailto:${staffEmail}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoUrl;
    navigate("/favourites"); // Remove passing projectId as state

    // Update the favorites list in localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = [...storedFavorites, project];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <Header onToggleNav={handleToggleNav} />
      <SideNav
        isNavOpen={isNavOpen}
        navigationItems={navigationItems}
        onItemClick={(selectedItem) => setSelectedItem(selectedItem)}
        setIsNavOpen={setIsNavOpen}
      />
      <div className="project-detail section">
        <h2>{project.title}</h2>
        <div className="project-description">{project.description}</div>
        <div className="project-department">
          <h4>Department:</h4>
          {project.department}
        </div>
        <div className="project-requiredSkills">
          <h4>Required Skills:</h4>
          {project.requiredSkills}
        </div>
        <div className="project-scholarships">
          <h4>Scholarships:</h4>
          {project.scholarships}
        </div>
        <div className="project-contactInfo">
          <h4>Contact Information:</h4>
          {project.contactInfo}
        </div>
        <button onClick={navigateToFavourites}>Inquire Now!</button>
      </div>
    </div>
  );
}

export default ProjectDetail;
