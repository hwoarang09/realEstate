import React from "react";
import { Input } from "../@/components/ui/input";
import { handleChange, parseFormInt } from "./formUtils";
import StyleForm from "../commonComponents/FormStyle";
import Button from "../commonComponents/Button";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { DatePickerDemo } from "../@/components/ui/datepicker";
import { DatePickerWithRange } from "../@/components/ui/datePickerRange";
import { MyRangeSlider } from "../@/components/ui/myRangeSlider";

const getPropertyValue = (property, keyList) => {
  return keyList.reduce(
    (obj, key) => (obj && obj[key] !== null ? obj[key] : ""),
    property
  );
};

const formGenerator = ({ property, setProperty, WIDTHLIST: widthList }) => {
  const renderElement = ({ input, index, row, rowIndex }) => {
    const key = `${input.type}_${index}_${rowIndex}`;

    if (input.type === "label") {
      return (
        <StyleForm label key={key} className={input.style}>
          {input.labelText}{" "}
          {input.req && (
            <span className="text-red-500 font-bold text-xl">*</span>
          )}
        </StyleForm>
      );
    } else if (input.type === "flatButtons") {
      return (
        <StyleForm flatButtons key={key} className={input.style}>
          {input.btns}
        </StyleForm>
      );
    } else if (input.type === "text" || input.type === "number") {
      const name = input.keyList?.join("");
      const value = getPropertyValue(property, input.keyList);

      return (
        <div className="" key={key}>
          <Input
            type={input.type}
            name={name}
            value={value}
            disabled={input.disabled}
            onChange={(e) =>
              handleChange(
                input.keyList,
                input.type === "number"
                  ? parseFormInt(e.target.value)
                  : e.target.value,
                setProperty
              )
            }
            className={input.style}
          />
        </div>
      );
    } else if (input.type === "simpleText") {
      return (
        <span key={key} className={input.style}>
          {input.simpleText}
        </span>
      );
    } else if (input.type === "datePicker") {
      console.log(
        "datepicker!!",
        property?.available_date,
        input.keyList,
        property
      );

      return (
        <div key={key}>
          <DatePickerDemo
            property={property}
            setProperty={setProperty}
            keyList={input.keyList}
          />
        </div>
      );
    } else if (input.type === "datePickerRange") {
      return (
        <div key={key}>
          <DatePickerWithRange
            property={property}
            setProperty={setProperty}
            keyList={input.keyList}
          />
        </div>
      );
    } else if (input.type === "range") {
      console.log("range!!", property);

      const style = { width: 400, margin: 50 };

      return (
        <div className="flex justify-center items-center w-full ">
          <div className="w-[400px] pl-4">
            <MyRangeSlider
              property={property}
              setProperty={setProperty}
              keyList={input.keyList}
            />
          </div>
        </div>
      );
    } else if (input.type === "customJSX") {
      return <div className="w-full">{input.jsx}</div>;
    } else {
      return null;
    }
  };

  return (
    <>
      {widthList.map((row, rowIndex) => {
        return (
          <StyleForm formRow key={`sr_${rowIndex}`}>
            {row.map((input, inputIndex) => (
              <React.Fragment key={`r_${rowIndex}_${inputIndex}`}>
                {renderElement({ input, inputIndex, row, rowIndex })}
              </React.Fragment>
            ))}
          </StyleForm>
        );
      })}
    </>
  );
};
const ToggleButton = ({ showMoreInfo, setShowMoreInfo }) => {
  return (
    <Button
      primary
      rounded
      outline
      className="mb-4 flex justify-between py-0.5 px-1"
      type="button"
      onClick={() => setShowMoreInfo(!showMoreInfo)}
    >
      {showMoreInfo ? (
        <>
          <span className="text-xs mr-2">접기</span>
          <span>
            <FaChevronUp />
          </span>
        </>
      ) : (
        <>
          <span className="text-xs mr-2">펼치기</span>
          <span>
            <FaChevronDown />
          </span>
        </>
      )}
    </Button>
  );
};

export { formGenerator, ToggleButton };
