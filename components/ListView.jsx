import React, { useState, useEffect } from "react";

const ListView = ({ data, onSelect }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 780 : ""
  );

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsSmallScreen(window.innerWidth <= 780);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSelectChange = (e) => {
    onSelect(e.target.value);
  };

  return (
    <div
      className={
        isSmallScreen
          ? "relative w-fit"
          : "rounded-lg shadow-md p-4 h-full border-2 border-gray-300 "
      }
    >
      {isSmallScreen ? (
        <select
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
          onChange={handleSelectChange}
        >
          <option value="">Select Currency</option>
          {data.map((item) => (
            <option key={item.key} value={item.key}>
              {item.name}
            </option>
          ))}
        </select>
      ) : (
        <>
          <h2 className=" font-semibold mb-4">Crypto Currency</h2>
          <ul>
            {data.map((item) => (
              <li
                key={item.name}
                className="cursor-pointer py-2 px-4 hover:bg-gray-100 hover:text-black "
                onClick={() => onSelect(item.key)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </>
      )}
      {isSmallScreen && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-.707.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ListView;
