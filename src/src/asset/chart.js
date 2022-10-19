import React from "react";
import UseAxios from "../api/UseAxios";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
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
const theme = createTheme({
  typography: {
    body1: {
      color: "#FFFFFF",
    },
    h4: {
      color: "#FFFFFF",
    },
  },
});
function Chart() {
  const id = JSON.parse(localStorage.getItem("id"));
  /*const { response } = UseAxios(
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
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        },
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
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
  };

  const data = {
    labels: coinCharData.map((value) => moment(value.x).format("L")),
    datasets: [
      {
        label: "",
        fill: true,
        data: coinCharData.map((val) => val.y),
        borderColor: "rgb(66, 194, 255)",
      },
    ],
  };*/

  return (
    <div>
      {id ? (
        <Container maxWidth="xl">
          <Box sx={{ height: "42vh" }}>
            <AdvancedRealTimeChart
              theme="dark"
              symbol={`BITKUB:${id}THB`}
              autosize
              hide_side_toolbar
              hide_legend
              disabled_features={["header_symbol_search"]}
            ></AdvancedRealTimeChart>
          </Box>
        </Container>
      ) :  <ThemeProvider theme={theme}>
      <Typography variant="body1">Loading....</Typography>
    </ThemeProvider>}
    </div>
  );
}

export default Chart;
