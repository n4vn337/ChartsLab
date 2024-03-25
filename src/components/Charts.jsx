"use client";

import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const Charts = ({ selectedProject }) => {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (selectedProject) {
      // Generate dummy chart data based on the selected project
      const data = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: `Data for ${selectedProject}`,
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      };

      setChartData(data);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (chartData) {
      if (chartInstance.current) {
        // If chart instance exists, destroy it before rendering a new one
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          maintainAspectRatio: false, // Disable aspect ratio for fixed dimensions
          responsive: false, // Disable responsiveness for fixed dimensions
        },
      });
    }
  }, [chartData]);

  return (
    <div>
      {selectedProject ? (
        <div>
          <h2 className="text-xl text-sky-900 font-bold mb-4">
            Charts for {selectedProject}
          </h2>
          <div style={{ width: "500px", height: "300px" }}>
            {" "}
            {/* Fixed dimensions */}
            <canvas ref={chartRef} width="500" height="300" />
          </div>
        </div>
      ) : (
        <div>No project selected</div>
      )}
    </div>
  );
};

export default Charts;
