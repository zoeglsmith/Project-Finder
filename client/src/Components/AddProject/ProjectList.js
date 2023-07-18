import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./AddedProject";

function ProjectList({ projects }) {
  
  return (
    <div className="project-list section">
      {/* <h2>Research Projects</h2>

      <input type="text" id="search-bar" placeholder="Search Projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      
<button type="button" onClick={handleSearch}>
  Search
</button> */}

      <div className="project-container">
        {projects &&
          projects.map((project) => {
            return (
              <div className="project-box" key={project._id}>
                <div className="project-title" key={`title-${project._id}`}>
                  {project.title}
                </div>
                <div
                  className="project-description"
                  key={`description-${project._id}`}
                >
                  {project.description}
                </div>
                <Link to={`/${project._id}`} className="project-link">
                  Learn more
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ProjectList;
