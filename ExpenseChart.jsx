import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function ExpenseChart({ expenses }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartData = {
      necessity: expenses
        .filter((expense) => expense.category === "necessity")
        .reduce((sum, expense) => sum + expense.amount, 0),
      desire: expenses
        .filter((expense) => expense.category === "desire")
        .reduce((sum, expense) => sum + expense.amount, 0),
    };

    const chart = new Chart(chartRef.current, {
      type: "pie",
      data: {
        labels: ["Necessity", "Desire"],
        datasets: [
          {
            data: [chartData.necessity, chartData.desire],
            backgroundColor: ["#4caf50", "#f44336"],
          },
        ],
      },
    });

    return () => {
      chart.destroy();
    };
  }, [expenses]);

  return <canvas ref={chartRef} />;
}

export default ExpenseChart;
