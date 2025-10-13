import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";


function YearPicker() {
    const [year, setYear] = useState(new Date());
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor="Year" className="font-medium text-gray-700">Năm sản xuất: </label>
      
      <DatePicker
        id="Year"
        name="Year"
        selected={year}
        onChange={(date) => setYear(date)}
        showYearPicker
        dateFormat="yyyy"
        className="w-full border rounded-md px-3 py-2 border-[black] bg-[white]"
      />
    </div>
  )
}

export default YearPicker