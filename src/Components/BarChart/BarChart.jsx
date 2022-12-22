import React from "react";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState, useEffect } from "react";
import { Forecast } from "../../Services/ApiCalls";

function BarChart({ city, type }) {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [results, setResults] = useState([]);

  let dataType;
  let labelType;
  switch (type) {
    case "windSpeed":
      dataType = data.map((data) => data.wind.speed);
      labelType = "Wind speed forecast";
      break;
    case "temperature":
      dataType = data.map((data) => data.main.temp);
      labelType = "Temperature forecast";
      break;
  }

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Users gained",
        data: [],
        backgroundColor: ["#000000", "#656565"],
      },
    ],
  });
  useEffect(() => {
    Forecast(city).then((data) => setData(data));
  }, []);
  useEffect(() => {
    Forecast(city).then((data) => setData(data));
  }, [city]);
  useEffect(() => {
    setDates(data.map((data) => data.dt_txt.slice(5, 16)));
    setResults(dataType);
  }, [data]);
  useEffect(() => {
    setChartData({
      labels: dates,
      datasets: [
        {
          label: labelType,
          data: results,
          backgroundColor: ["#000000", "#656565"],
        },
      ],
    });
  }, [dates, results]);

  return <Bar data={chartData} />;
}

export default BarChart;
