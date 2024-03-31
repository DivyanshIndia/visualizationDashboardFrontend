"use client"
import React, { useEffect, useState } from "react";

const CandlestickChart = ({ data }) => {
  const [ApexChartsModule, setApexChartsModule] = useState(null);

  useEffect(() => { 
    if (typeof window !== "undefined") {
      import("react-apexcharts")
        .then((module) => {
          setApexChartsModule(module);
        })
        .catch((error) => {
          console.error("Failed to load ApexCharts", error);
        });
    }
  }, []);

  if (!ApexChartsModule) {
    return null; 
  }

  const ApexCharts = ApexChartsModule.default;

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
      <ApexCharts
        options={options}
        series={series}
        type="candlestick"
        className="rounded-lg shadow-md"
      />
    </div>
  );
};

export default CandlestickChart;
