"use client";
import React from "react";
import arrow from "./icon-arrow.svg";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function App() {
  const date = new Date();

  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const currentDay = date.getDate();

  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [monthIndex, setMonthIndex] = useState(0);
  const [year, setYear] = useState(null);

  const [calculatedDay, setCalculatedDay] = useState(null);
  const [calculatedMonth, setCalculatedMonth] = useState(null);
  const [calculatedYear, setCalculatedYear] = useState(null);

  useEffect(() => {
    setMonthIndex(currentMonth + 1);
  }, []);

  useEffect(() => {
    console.log(monthIndex); // Now logs correctly
  }, [monthIndex]);

  console.log(monthIndex);

  //   function handleSubmit(event) {
  //     event.preventDefault();
  //     setCalculatedYear(currentYear - year);
  //     setCalculatedMonth(Math.abs(currentMonth - month));
  //     setCalculatedDay(Math.abs(currentDay - day));
  //   }

  function handleSubmit(event) {
    event.preventDefault();

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    setCalculatedYear(ageYears);
    setCalculatedMonth(ageMonths);
    setCalculatedDay(ageDays);
  }

  return (
    <main className="flex flex-col items-center px-4">
      <div className="w-full max-w-[90%] sm:max-w-[70%] md:max-w-[50%] lg:max-w-[40%] mt-[5rem] sm:mt-[7rem] md:mt-[10rem] p-6 sm:p-8 md:p-10 border border-transparent bg-white shadow rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[50px] flex flex-col gap-5">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-1">
              <label
                className="uppercase text-gray-600 font-bold text-sm sm:text-base"
                htmlFor="day"
              >
                Day
              </label>
              <input
                onChange={(event) => setDay(Number(event.target.value))}
                value={day}
                className="font-bold text-gray-700 border border-gray-400 rounded-[5px] p-2 text-lg sm:text-xl md:text-2xl outline-none w-full"
                id="day"
                type="number"
                placeholder="DD"
                max={31}
                maxLength={2}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                className="uppercase text-gray-600 font-bold text-sm sm:text-base"
                htmlFor="month"
              >
                Month
              </label>
              <input
                onChange={(event) => setMonth(Number(event.target.value))}
                value={month}
                className="text-gray-700 font-bold border border-gray-400 rounded-[5px] p-2 text-lg sm:text-xl md:text-2xl outline-none w-full"
                id="month"
                type="number"
                placeholder="MM"
                required
                max={12}
                maxLength={2}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                className="uppercase text-gray-600 font-bold text-sm sm:text-base"
                htmlFor="year"
              >
                Year
              </label>
              <input
                onChange={(event) => setYear(Number(event.target.value))}
                value={year}
                className="text-gray-700 font-bold border border-gray-400 rounded-[5px] p-2 text-lg sm:text-xl md:text-2xl outline-none w-full"
                id="year"
                type="number"
                placeholder="YYYY"
                required
                max={currentYear}
              />
            </div>
          </div>

          <div className="pt-4 flex flex-row gap-1 items-center">
            <span className="h-[1px] rounded-[25px] bg-gray-500 flex-grow" />
            <button className="border border-transparent bg-violet-700 rounded-full p-2 hover:bg-black duration-500">
              <Image
                alt="arrow"
                src={arrow}
                width={40}
                height={40}
                className="sm:w-[45px] sm:h-[45px]"
              />
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-2 text-left">
          <p className="font-extrabold text-4xl sm:text-5xl">
            <span className="text-violet-700">
              {calculatedYear ? calculatedYear : "--"}
            </span>{" "}
            years
          </p>
          <p className="font-extrabold text-4xl sm:text-5xl">
            <span className="text-violet-700">
              {calculatedMonth ? calculatedMonth : "--"}
            </span>{" "}
            months
          </p>
          <p className="font-extrabold text-4xl sm:text-5xl">
            <span className="text-violet-700">
              {calculatedDay ? calculatedDay : "--"}
            </span>{" "}
            days
          </p>
        </div>
      </div>
    </main>
  );
}
