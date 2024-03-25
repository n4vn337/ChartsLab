import React from "react";

const Projects = ({ projects, handleProjectClick }) => {
  return (
    <div>
      <h2 className="text-xl text-sky-900 font-bold mb-4">Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li
            key={index}
            className="mb-2 cursor-pointer text-blue-500"
            onClick={() => handleProjectClick(project)}
          >
            {project}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
