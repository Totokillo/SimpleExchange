import React from "react";
import UseAxios from "../api/UseAxios";
import { Line } from "react-chartjs-2";
import moment from "moment";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function Chart() {
  const id = JSON.parse(localStorage.getItem("id"));
  const { response } = UseAxios(
    `coins/${id}/market_chart?vs_currency=thb&days=3`
  );

  if (!response) {
    return <div>Loading....</div>;
  }
  const coinCharData = response.prices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const options = {
    legend: {
      labels: {
        fontColor: "white",
        fontSize: 18,
      },
    },
    scales: {
      yAxes: {
        ticks: {
          beginAtZero: true,
          color: "white",
          fontSize: 12,
        },
      },
      xAxes: {
        ticks: {
          beginAtZero: true,
          color: "white",
          fontSize: 12,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      title: {
        display: true,
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
  };

  const data = {
    labels: coinCharData.map((value) =>
      moment(value.x).startOf("hour").fromNow()
    ),
    datasets: [
      {
        label: id,
        fill: true,
        data: coinCharData.map((val) => val.y),
        borderColor: "rgb(66, 194, 255)",
        backgroundColor: "rgb(184, 255, 249,0.5)",
      },
    ],
  };

  return (
    <div>
      {response ? (
        <Line options={options} data={data ? data : null} />
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
}

export default Chart;
