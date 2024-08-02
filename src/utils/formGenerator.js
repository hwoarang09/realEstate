import React from "react";
import { Input } from "../@/components/ui/input";
import { handleChange, notNullValue, parseFormInt } from "./formUtils";
import StyleForm from "../commonComponents/FormStyle";

const getPropertyValue = (property, keyList) => {
  return keyList.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    property
  );
};

const simpleInputGenerator = ({
  label,
  labelRequired,
  type,
  keyList,
  property,
  setProperty,
}) => {
  const name = keyList.join("");

  return (
    <StyleForm formRow>
      <StyleForm label className="w-1/4">
        {label}{" "}
        {labelRequired ? (
          <span className="text-red-500 font-bold text-xl">*</span>
        ) : (
          ""
        )}
      </StyleForm>
      <StyleForm>
        <Input
          type={type}
          name={name}
          value={notNullValue(getPropertyValue(property, keyList))}
          onChange={(e) => {
            handleChange(
              keyList,
              type === "number" ? parseFormInt(e.target.value) : e.target.value,
              setProperty
            );
          }}
        />
      </StyleForm>
    </StyleForm>
  );
};

export { simpleInputGenerator };
