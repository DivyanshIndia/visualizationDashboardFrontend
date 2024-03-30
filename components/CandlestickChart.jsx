"use client";
import React from "react";
import Chart from "react-apexcharts";

const CandlestickChart = ({ data }) => {
  const candlestickData = data.map((item) => ({
    x: new Date(item.fullDate).getTime(),
    y: [item.open, item.high, item.low, item.close],
  }));

  const series = [
    {
      name: "Candlestick",
      data: candlestickData,
    },
  ];

  const options = {
    chart: {
      type: "candlestick",
      height: "100%",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        title: {
          text: "Price in USD",
        },
        labels: {
          style: {
            colors: "#1a202c",
          },
        },
      },
    ],
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: "100%",
          },
        },
      },
    ],
  };

  return (
    <div className="mx-auto border-2 border-gray-200 rounded-md">
      <Chart
        options={options}
        series={series}
        type="candlestick"
        className="rounded-lg shadow-md"
      />
    </div>
  );
};

export default CandlestickChart;
