"use client";

import React, { useState } from "react";
import Charts from "@/components/Charts";
import Projects from "@/components/Projects";
import Image from "next/image";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  // Dummy data for projects
  const projects = [
    "E-commerce Website Development",
    "Fitness Tracker Mobile App",
    "Recipe Sharing Platform",
    "Personal Finance Management Tool",
    "Online Learning Platform for Programming",
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-3/10 flex flex-col justify-start items-center border-r border-gray-300 py-8 px-4">
        <Projects projects={projects} handleProjectClick={handleProjectClick} />
      </div>
      <div className="w-7/10 flex flex-col justify-center items-center py-8 px-4">
        <Charts selectedProject={selectedProject} />
      </div>
    </div>
  );
}
