import React from "react";
import "./NavBar.css";
import { useLocation, useNavigate } from "react-router-dom";
import SignOut from "./Components/SignOut/SignOut";

function SideNav({
  navigationItems = [],
  onItemClick,
  isNavOpen,
  setIsNavOpen,
  setIsLoggedIn,
  isLoggedIn,
  userType,
}) {
  const handleItemClick = (item) => {
    onItemClick(item);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState("");

  const firstName = location.state && location.state.firstName;
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsNavOpen(false);
    navigate("/", { replace: true });
  };

  const handleSignOutClick = () => {
    setIsNavOpen(false);
    setSelectedItem("Sign Out"); // Update the selected item value
  };

  return (
    <nav className={`sidenav ${isNavOpen ? "open" : "closed"}`}>
      {isLoggedIn ? (
        <ul className="loggedIn-items">
          <div className="line"></div>
          {/* Show items for logged-in users */}
          <li>
            <a href="/" onClick={() => navigate("/")}>
              Home
            </a>
          </li>
          {userType === "Staff" && isLoggedIn && (
            <li>
              <a href="/Project" onClick={() => navigate("/Project")}>
                Add Project
              </a>
            </li>
          )}

          {userType === "Student" && isLoggedIn && (
            <li>
              <a href="/favourites" onClick={() => navigate("/favourites")}>
                Favorites
              </a>
            </li>
          )}

          <li>
            <a href="/Profile" onClick={() => navigate("/Profile")}>
              Profile
            </a>
          </li>
          <li>
            <a href="#" onClick={handleSignOutClick}>
              Sign Out
            </a>
          </li>
        </ul>
      ) : (
        <ul className="navigation-items">
          {/* Show items for not logged-in users */}
          {navigationItems.map((item) => (
            <li key={item.id}>
              <a href={item.url} onClick={() => navigate(item.url)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* This is the added code */}
      {selectedItem === "Sign Out" && (
        <SignOut
          setIsNavOpen={setIsNavOpen}
          setIsLoggedIn={setIsLoggedIn}
          handleLogout={handleLogout}
        />
      )}
    </nav>
  );
}

export default SideNav;
