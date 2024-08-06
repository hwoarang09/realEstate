import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../../../styles/rcslider.css";
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

  function log(value) {
    console.log(value);
  }

  const handleChange = (value) => {
    log(value);

    setRange(value);

    setProperty((prevProperty) => ({
      ...prevProperty,
      [keyList[0]]: Number(value[0]) || 0,
      [keyList[1]]: Number(value[1]) || 100,
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full">
        <Slider
          range
          allowCross={false}
          value={range}
          min={0}
          max={100}
          defaultValue={[0, 40]}
          trackStyle={[
            { backgroundColor: "#3b82f6" },
            { backgroundColor: "green" },
          ]}
          handleStyle={[
            { backgroundColor: "white" },
            { backgroundColor: "white" },
          ]}
          railStyle={{ backgroundColor: "#bfdbfe" }}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between w-full">
        <div>{Number(range[0]) + `억원`}</div>
        <div>
          {Number(range[1])} {Number(range[1]) === 100 ? `억원 이상` : `억원`}
        </div>
      </div>
    </div>
  );
};

export { MyRangeSlider };
