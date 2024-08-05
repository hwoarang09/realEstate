import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const MyRangeSlider = ({ property, setProperty, keyList }) => {
  const [range, setRange] = useState([0, 20]);

  function log(value) {
    console.log(value);
  }

  useEffect(() => {
    if (property.range) {
      setRange(property.range);
    }
  }, [property.range]);

  const handleChange = (value) => {
    log(value);

    setRange(value);
    if (keyList[0] === "from_deposit" && keyList[1] === "to_deposit") {
      let maxValue;
      if (Number(value[1]) === 100) {
        maxValue = 999999;
      } else {
        maxValue = Number(value[1]);
      }
      console.log("from_deposit, to_deposit", Number(value[0]), maxValue);
      setProperty((prevProperty) => ({
        ...prevProperty,
        [keyList[0]]: Number(value[0]) || 0,
        [keyList[1]]: maxValue || null,
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
          min
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
