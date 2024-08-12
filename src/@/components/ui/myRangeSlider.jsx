import React, { useState, useEffect, useCallback } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../../../styles/rcslider.css";
import { Input } from "./input";
import debounce from "lodash.debounce";

const MyRangeSlider = ({ property, setProperty, keyList }) => {
  const initialRange = [
    property?.[keyList[0]] ?? 0,
    property?.[keyList[1]] && property[keyList[1]] <= 100
      ? property[keyList[1]]
      : 100,
  ];

  const [range, setRange] = useState(initialRange);

  useEffect(() => {
    const newRange = [
      property?.[keyList[0]] ?? 0,
      property?.[keyList[1]] && property[keyList[1]] <= 100
        ? property[keyList[1]]
        : 100,
    ];
    setRange(newRange);
  }, [property, keyList]);

  // function log(value) {
  //   console.log(value);
  // }

  const debouncedUpdateProperty = useCallback(
    debounce((newRange) => {
      setProperty((prevProperty) => ({
        ...prevProperty,
        [keyList[0]]: Number(newRange[0]) || 0,
        [keyList[1]]: Number(newRange[1]) || 100,
      }));
    }, 300), // 300ms 딜레이
    [setProperty, keyList]
  );

  const handleChange = (value) => {
    setRange(value);
    debouncedUpdateProperty(value);
  };

  const handleInputChange = (index, event) => {
    const value = Number(event.target.value);
    if (isNaN(value)) return;

    const newRange = [...range];
    newRange[index] = value;
    setRange(newRange);

    debouncedUpdateProperty(newRange);
  };
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full pl-4 pr-8">
        <Slider
          range
          allowCross={false}
          value={range}
          min={0}
          max={100}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between w-full">
        <div className="mt-4">
          <Input
            // type="number"
            value={range[0]}
            min={0}
            max={range[1]}
            onChange={(event) => handleInputChange(0, event)}
            className="border w-20 mt-2 text-center"
          />
        </div>
        <div className="mt-4 ">
          <Input
            // type="number"
            value={range[1]}
            min={range[0]}
            max={100}
            onChange={(event) => handleInputChange(1, event)}
            className="border w-20 mt-2 text-center "
          />
        </div>
      </div>
    </div>
  );
};

export { MyRangeSlider };
