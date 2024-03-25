"use client";

import React, { useState, useEffect } from "react";
import Charts from "@/components/Charts";
import Projects from "@/components/Projects";
import Image from "next/image";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from GitLab API
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        "https://gitlab.example.com/api/v4/projects",
        {
          headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      const projectNames = data.map((project) => project.name);
      setProjects(projectNames);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-3/10 flex flex-col justify-start items-center border-r border-gray-300 py-8 px-4">
        <Projects projects={projects} handleProjectClick={handleProjectClick} />
      </div>
      <div className="w-7/10 flex flex-col justify-start items-center py-8">
        {selectedProject && (
          <h2 className="text-xl text-sky-900 font-bold mb-4">
            Charts for {selectedProject}
          </h2>
        )}
        <div className="w-full flex justify-center px-10">
          <Charts selectedProject={selectedProject} />
        </div>
      </div>
    </div>
  );
}
