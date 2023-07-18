import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SideNav from "../../../src/SideNav";
import Header from "../../Header";
import axios from "axios";
import "./favourite.css";

const Favourites = () => {
  const [favouriteIds, setFavouriteIds] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const location = useLocation(); // Access the location object using useLocation()
  const [userType] = useState("Student");
  const [navigationItems, setNavigationItems] = useState([]);

  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    if (userType === "Student") {
      setNavigationItems([
        { id: 1, label: "Home", url: "/loggedin" },
        { id: 2, label: "Profile", url: "/Profile" },
        { id: 3, label: "Favourites", url: "/favourites" },
        { id: 4, label: "SignOut", url: "/signout" },
      ]);
    }
  }, [userType]);
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavourites(storedFavorites);
  }, []);
  const handleToggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
    document.body.classList.toggle("nav-open");
  };

  useEffect(() => {
    if (location.state && location.state.projectId) {
      const projectId = location.state.projectId;

      // Check if the project already exists in favourites
      const projectExists = favourites.some(
        (project) => project.id === projectId
      );

      if (!projectExists) {
        setFavouriteIds((prevIds) => [...prevIds, projectId]);

        // Fetch the project details using the project ID
        axios
          .get(`http://localhost:8080/api/project/${projectId}`)
          .then((response) => {
            console.log("Success:", response.data);
            setFavourites((prevFavourites) => [
              ...prevFavourites,
              response.data,
            ]);
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      }
    }
  }, [location]);

  return (
    <div>
      <Header onToggleNav={handleToggleNav} />
      <SideNav
        isNavOpen={isNavOpen}
        navigationItems={navigationItems}
        setIsNavOpen={setIsNavOpen}
      />

      <div className="about-page">
        <div className="box about-box">
          <h2>Favourites</h2>
          <p>Your Favourited Projects</p>
          <div className="favourites-list">
            {/* Map over the favourites and render each project */}
            {favourites.map((project, index) => (
              <div className="favourite-item" key={index}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer></footer>
    </div>
  );
};

export default Favourites;
