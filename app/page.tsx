"use client";
import React, { useState, useEffect, useCallback } from "react";
import CandlestickChart from "@/components/CandlestickChart";
import ListView from "@/components/ListView";

const currencies = [
  {
    name: "BTCUSD",
    key: "btcusd",
  },
  {
    name: "EURUSD",
    key: "eurusd",
  },
];
const App = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState("btcusd");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (currency: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://visualizationdashboardbackend-production.up.railway.app/${currency}`
      );
      console.log(res);
      const data = await res.json();
      setData(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(selectedData);
  }, [fetchData, selectedData]);

  const handleDataSelect = (selected: string) => {
    setSelectedData(selected);
  };

  return (
    <div className="mx-auto w-full">
      <h1 className="text-xl font-bold py-2 bg-[#222831] text-white flex items-center justify-center">
        Data Visualization Dashboard
      </h1>

      <div className="flex flex-col md:flex-row p-2">
        <div className="md:w-1/5 mr-4 pb-2 md:pb-0">
          <ListView data={currencies} onSelect={handleDataSelect} />
        </div>
        <div className=" w-full relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
              <div className="spinner-border text-gray-500" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-100 text-red-500 font-bold z-50">
              {error}
            </div>
          )}
          {selectedData && <CandlestickChart data={data} />}
        </div>
      </div>
    </div>
  );
};

export default App;
