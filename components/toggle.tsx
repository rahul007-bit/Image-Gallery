"use client";
import { Montserrat } from "next/font/google";
import React, { use, useEffect, useState } from "react";
const montserrat = Montserrat({ subsets: ["latin"], weight: "700" });

const Toggle = () => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("isDark");
    if (isDark === "true") {
      setIsChecked(true);
      document.getElementById("rk")?.classList.add("dark");
    }
  }, []);

  const handleCheckboxChange = () => {
    if (isChecked) {
      document.getElementById("rk")?.classList.remove("dark");
      localStorage.removeItem("isDark");
    } else {
      document.getElementById("rk")?.classList.add("dark");
      localStorage.setItem("isDark", "true");
    }
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="hidden themeSwitcherTwo relative md:inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />
        <span
          className={`label flex items-center text-[#333] dark:text-white xl:text-sm text-xs text-center ${montserrat.className}`}
        >
          {isChecked ? "Light" : "Dark"} Mode
        </span>
        <span
          className={`slider mx-4 flex h-6 w-[52px] items-center rounded-full p-1 duration-200 dark:bg-[#f4f4f4] bg-[#858484]`}
        >
          <span
            className={`dot h-4 w-4 rounded-full  duration-200 dark:bg-[#858484] bg-white ${
              isChecked && "translate-x-[28px]"
            }`}
          ></span>
        </span>
      </label>
    </>
  );
};

export default Toggle;
