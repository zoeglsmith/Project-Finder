import React from "react";
import SideNav from "../../../src/SideNav";
import Header from "../../Header";
import axios from "axios";
import "./about.css";

const About = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

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
          <h2>About Us</h2>
          <p>
            Welcome to our Research Project Listing Platform. We connect staff members who have research projects, with students who are interested in
            gaining invaluable research experience.
          </p>
        </div>

        <div className="container">
          <div className="box">
            <h3>For Staff Members</h3>
            <p>
              Are you a staff member looking for assistance with your research project? Our platform allows you to create project listings and
              provide project details such as the title, description, required skills, and your contact information. This way, students can easily
              find and apply for your projects.
            </p>
          </div>

          <div className="box">
            <h3>For Students</h3>
            <p>
              Are you a student eager to gain hands-on research experience? Our platform provides a curated list of research projects from staff
              members. You can search and view project details, and easily apply or express your interest in a project. This is a great opportunity to
              work with experienced staff members and contribute to exciting research endeavors.
            </p>
          </div>
        </div>

        <div className="box">
          <h3>How It Works</h3>
          <div className="container">
            <div className="box inline">
              <p>Step 1: Staff members create project listings with project details.</p>
            </div>
            <div className="box inline">
              <p>Step 2: Students browse and search for projects based on their interests and skills.</p>
            </div>
            <div className="box inline">
              <p>Step 3: Students can view project details and apply or express their interest in a project.</p>
            </div>
            <div className="box inline">
              <p>Step 4: Staff members review applications and contact students for further discussion.</p>
            </div>
          </div>
        </div>

        <div className="box">
          <p>
            If you have any questions or feedback, please feel free to reach out to us using the contact information provided below. We look forward
            to helping you connect and collaborate on exciting research projects!
          </p>
        </div>
      </div>

      <footer></footer>
    </div>
  );
};

export default About;
