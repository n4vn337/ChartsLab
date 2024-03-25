import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const Charts = ({ selectedProject }) => {
  const [pipelineData, setPipelineData] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchPipelineData = async (projectName) => {
      try {
        // Fetch pipeline data from GitLab API
        const response = await fetch(
          `https://gitlab.example.com/api/v4/projects/${encodeURIComponent(projectName)}/pipelines?status=success`,
          {
            headers: {
              Authorization: "Bearer YOUR_ACCESS_TOKEN",
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch pipeline data");
        }
        const data = await response.json();
        // Process pipeline data
        processData(data);
      } catch (error) {
        console.error("Error fetching pipeline data:", error);
      }
    };

    if (selectedProject) {
      // Fetch pipeline data for the selected project
      fetchPipelineData(selectedProject);
    }
  }, [selectedProject]);

  const processData = (data) => {
    // Process pipeline data to generate chart data
    const labels = data.map((pipeline) => pipeline.created_at);
    const successCounts = data.map((pipeline) => pipeline.id); // Change this to count successful pipelines per date
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Pipeline Success",
          data: successCounts,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
    setPipelineData(chartData);
  };

  useEffect(() => {
    if (pipelineData) {
      if (chartInstance.current) {
        // If chart instance exists, destroy it before rendering a new one
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: pipelineData,
        options: {
          scales: {
            x: {
              type: "time", // Use time scale for date on x-axis
              time: {
                unit: "day", // Display dates by day
                displayFormats: {
                  day: "MMM D", // Format for displaying dates
                },
              },
            },
            y: {
              beginAtZero: true,
            },
          },
          maintainAspectRatio: false, // Disable aspect ratio for fixed dimensions
          responsive: false, // Disable responsiveness for fixed dimensions
        },
      });
    }
  }, [pipelineData]);

  return (
    <div>
      {selectedProject ? (
        <div>
          <div style={{ width: "800px", height: "450px" }}>
            {/* Fixed dimensions */}
            <canvas ref={chartRef} width="800" height="450" />
          </div>
        </div>
      ) : (
        <div>No project selected</div>
      )}
    </div>
  );
};

export default Charts;
