import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideNav from "../../SideNav";
import Header from "../../Header";
import ProfilePage from "../Profile/index";
import ProjectList from "../AddProject/ProjectList";
import axios from "axios";
import "./App.css";

const LoggedInPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [userType, setUserType] = useState("");
  const [selectedItem, setSelectedItem] = useState({ itemId: null });
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navigationItems, setNavigationItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isNavigationItemsLoaded, setIsNavigationItemsLoaded] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    setIsLoggedIn(true);
    const userIdFromStorage = localStorage.getItem("userId");
    const userTypeFromStorage = localStorage.getItem("userType");

    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
    }
    if (userTypeFromStorage) {
      setUserType(userTypeFromStorage);
    }
  }, []);

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

  useEffect(() => {
    if (location.state) {
      const { firstName, userType, userId } = location.state;
      console.log("User type:", userType);
      console.log("Location state:", location.state);
      setFirstName(firstName);
      setUserType(userType);
      setUserId(userId);
    }
  }, [location.state]);

  useEffect(() => {
    if (userType === "Staff") {
      setNavigationItems([
        { id: 1, label: "Home", url: "/loggedin" },
        { id: 2, label: "Add Project", url: "/Project" },
        { id: 3, label: "Profile", url: "/Profile" },
        { id: 4, label: "SignOut", url: "/signout" },
      ]);
    } else if (userType === "Student") {
      setNavigationItems([
        { id: 1, label: "Home", url: "/" },
        { id: 2, label: "Profile", url: "/Profile" },
        { id: 3, label: "Favourites", url: "/favourites" },
        { id: 4, label: "SignOut", url: "/signout" },
      ]);
    }
  }, [userType]);

  useEffect(() => {
    if (navigationItems.length > 0) {
      setIsNavigationItemsLoaded(true);
    }
  }, [navigationItems]);

  const handleToggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
    document.body.classList.toggle("nav-open");
  };
  console.log("NAV:", navigationItems);
  console.log(userType);
  const navStorage = localStorage.getItem("navigationItems");
  const parsedNavStorage = JSON.parse(navStorage);
  console.log("Nav Storage:", parsedNavStorage);

  const navigateToProfile = () => {
    navigate("/Profile", {
      state: {
        userId: userId,
        userType: userType,
        navigationItems: navigationItems,
      },
    });
  };
  console.log(navigationItems);

  const handleItemClick = (selectedItem) => {
    setSelectedItem({ itemId: selectedItem.id });
    setIsNavOpen(false); // Close the side nav after item click
  };
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
  const uniqueDepartments = [
    ...new Set(projects.map((project) => project.department)),
  ];
  return (
    <div>
      <Header onToggleNav={handleToggleNav} />
      <SideNav
        isNavOpen={isNavOpen}
        navigationItems={navigationItems}
        onItemClick={handleItemClick}
        setIsNavOpen={setIsNavOpen}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        userType={userType}
      />
      <div>
        <h2>Welcome {firstName}!</h2>
        <p>You are logged in as a {userType}</p>
        {selectedItem.itemId === 3 && (
          <button onClick={navigateToProfile}>Go to Profile</button>
        )}
      </div>
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
            style={{ marginTop: "10px", paddingBottom: "15px" }}
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
      {/* {
        
        /> /* {isNavigationItemsLoaded && selectedItem.itemId === 3 && (
        <ProfilePage
          userId={userId}
          userType={userType}
          firstName={firstName}
          navigationItems={navigationItems}
          key={navigationItems.length} // Add a key to force re-rendering
        />
      )} */}{" "}
    </div>
  );
};

export default LoggedInPage;
