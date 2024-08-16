import Button from "../commonComponents/Button";
import { FaCheck } from "react-icons/fa";
import _ from "lodash";

const handleMultiCategoryClick = (cate, cateList, setFunction) => {
  setFunction((prevProperty) => {
    console.log("cateList : ", cateList);
    const newProperty = _.cloneDeep(prevProperty);
    const lastKey = cateList.pop();
    const target = cateList.reduce((obj, key) => obj[key], newProperty);

    console.log(
      `target : ${JSON.stringify(
        target
      )}, lastKey ${lastKey}, cate ${cate} cateList : ${cateList}`
    );
    if (target[lastKey] === undefined) {
      target[lastKey] = [];
    } else {
      const newCategories = target[lastKey].includes(cate)
        ? target[lastKey].filter((category) => category !== cate)
        : [...target[lastKey], cate];

      target[lastKey] = newCategories;
    }
    return newProperty;
  });
};

const handleSingleCategoryClick = (cate, cateList, setFunction) => {
  setFunction((prevProperty) => {
    const newProperty = _.cloneDeep(prevProperty);
    const newCateList = [...cateList];
    const lastKey = newCateList.pop();
    const target = newCateList.reduce((obj, key) => obj[key], newProperty);

    if (target[lastKey] === undefined) {
      console.log("target[lastKey] is undefined??");
      target[lastKey] = cate;
    } else {
      target[lastKey] = target[lastKey] === cate ? "" : cate; // 선택 해제 추가
    }
    return newProperty;
  });
};
const handleChange = (keyList, value, setFunction) => {
  setFunction((prevProperty) => {
    const newProperty = { ...prevProperty };
    console.log("in handleChange, value : ", value);
    console.log("in handleChange, value : ", typeof value);
    let target = newProperty;
    for (let i = 0; i < keyList.length - 1; i++) {
      if (Array.isArray(target[keyList[i]])) {
        target[keyList[i]] = [...target[keyList[i]]];
      } else {
        target[keyList[i]] = { ...target[keyList[i]] };
      }
      target = target[keyList[i]];
    }
    if (Array.isArray(target)) {
      target[parseInt(keyList[keyList.length - 1])] = value;
    } else {
      target[keyList[keyList.length - 1]] = value;
    }
    return newProperty;
  });
};
const removeContact = (index, setFunction) => {
  setFunction((prevProperty) => {
    const newProperty = _.cloneDeep(prevProperty);
    newProperty.extra.contact.contactList = [
      ...newProperty.extra.contact.contactList.slice(0, index),
      ...newProperty.extra.contact.contactList.slice(index + 1),
    ];
    return newProperty;
  });
};

const addContact = (setFunction) => {
  setFunction((prevProperty) => {
    const newProperty = _.cloneDeep(prevProperty);
    newProperty.extra.contact.contactList = [
      ...newProperty.extra.contact.contactList,
      { name: "", note: "", type: "", phone: "" },
    ];
    return newProperty;
  });
};
const notNullValue = (value) =>
  value !== null && value !== undefined ? value : "";

const parseFormInt = (value) => {
  console.log("in parseFormInt ", value, typeof value);
  if (!value) return null;
  else if (value === "-") return value;
  else return parseInt(value);
};
const renderCategoryButtons = (
  categories,
  cateJsonKeyList,
  chkSingleMulti,
  property,
  setProperty,
  mapppedValue
) => {
  const clickFunction =
    chkSingleMulti === "single"
      ? handleSingleCategoryClick
      : handleMultiCategoryClick;

  return categories.map((cate) => {
    let isSelected = false;

    if (chkSingleMulti === "single") {
      const result = cateJsonKeyList.reduce((obj, key) => {
        if (obj === null || obj === false) {
          return false;
        }
        return obj[key];
      }, property);
      isSelected = result === cate;
    } else if (chkSingleMulti === "multi") {
      const result = cateJsonKeyList.reduce((obj, key) => {
        if (obj === null || obj === false) {
          return false;
        }
        return obj[key];
      }, property);
      isSelected = Array.isArray(result) && result.includes(cate);
    }

    return (
      <div key={cate}>
        <Button
          onClick={() => clickFunction(cate, cateJsonKeyList, setProperty)}
          option_select={isSelected}
          option_noselect={!isSelected}
          rounded
          type="button"
        >
          {isSelected && <FaCheck className="mr-1" />}
          <span>{mapppedValue ? mapppedValue[cate] : cate}</span>
        </Button>
      </div>
    );
  });
};

export {
  renderCategoryButtons,
  handleChange,
  notNullValue,
  parseFormInt,
  handleSingleCategoryClick,
  handleMultiCategoryClick,
  removeContact,
  addContact,
};
