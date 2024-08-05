import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const MyRangeSlider = ({ property, setProperty, keyList }) => {
  const initialRange = [
    property?.from_deposit ?? 0,
    property?.to_deposit && property.to_deposit <= 100
      ? property.to_deposit
      : 100,
  ];

  const [range, setRange] = useState(initialRange);
  console.log("range", range, property.from_deposit, property.to_deposit);
  function log(value) {
    console.log(value);
  }

  useEffect(() => {
    const newRange = [
      property?.from_deposit ?? 0,
      property?.to_deposit && property.to_deposit <= 100
        ? property.to_deposit
        : 100,
    ];
    setRange(newRange);
  }, [property.from_deposit, property.to_deposit, property]);
  const handleChange = (value) => {
    log(value);

    setRange(value);
    if (keyList[0] === "from_deposit" && keyList[1] === "to_deposit") {
      setProperty((prevProperty) => ({
        ...prevProperty,
        [keyList[0]]: Number(value[0]) || 0,
        [keyList[1]]: Number(value[1]) || 100,
      }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-[300px]">
        <Slider
          range
          allowCross={false}
          value={range}
          min={0}
          max={100}
          defaultValue={[0, 40]}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between w-[300px]">
        <div>{Number(range[0]) + `억원`}</div>
        <div>
          {range[1]} {Number(range[1]) === 100 ? `억원 이상` : `억원`}
        </div>
      </div>
    </div>
  );
};

export { MyRangeSlider };
