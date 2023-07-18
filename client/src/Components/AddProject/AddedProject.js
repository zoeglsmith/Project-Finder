import SideNav from "../../../src/SideNav";
import Header from "../../Header";
import React from "react";

const AddedProject = () => {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const navigationItems = [
    { id: 1, label: "Home", url: "/" },
    { id: 2, label: "About", url: "/about" },
    { id: 3, label: "Add Project", url: "/Project" },
    { id: 4, label: "Log In", url: "/Login" },
    { id: 5, label: "Sign Up", url: "/SignUp" },
    { id: 6, label: "Profile", url: "/Profile" },

    { id: 7, label: "TEST", url: "/test" },
  ];

  const handleToggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
    document.body.classList.toggle("nav-open");
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
      <h1>Project Sucessfully Added!</h1>
      <footer></footer>
    </div>
  );
};

export default AddedProject;
