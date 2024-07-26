import Button from "../commonComponents/Button";
import { FaCheck } from "react-icons/fa";
import _ from "lodash";

const handleMultiCategoryClick = (cate, cateList, setFunction) => {
  setFunction((prevProperty) => {
    const newProperty = _.cloneDeep(prevProperty);
    const lastKey = cateList.pop();
    const target = cateList.reduce((obj, key) => obj[key], newProperty);

    const newCategories = target[lastKey].includes(cate)
      ? target[lastKey].filter((category) => category !== cate)
      : [...target[lastKey], cate];

    target[lastKey] = newCategories;

    return newProperty;
  });
};

const handleSingleCategoryClick = (cate, cateList, setFunction) => {
  setFunction((prevProperty) => {
    //const newProperty = JSON.parse(JSON.stringify(prevProperty));
    const newProperty = _.cloneDeep(prevProperty);
    const lastKey = cateList.pop();
    const target = cateList.reduce((obj, key) => obj[key], newProperty);

    target[lastKey] = cate;

    return newProperty;
  });
};

const handleChange = (keyList, value, setFunction) => {
  setFunction((prevProperty) => {
    const newProperty = { ...prevProperty };
    let target = newProperty;

    for (let i = 0; i < keyList.length - 1; i++) {
      target[keyList[i]] = { ...target[keyList[i]] };
      target = target[keyList[i]];
    }
    target[keyList[keyList.length - 1]] = value;

    return newProperty;
  });
};

const getValue = (keyList, property) => {
  return keyList.reduce((obj, key) => obj[key], property);
};

const renderCategoryButtons = (
  categories,
  cateJsonKeyList,
  chkSingleMulti,
  property,
  setProperty
) => {
  const clickFunction =
    chkSingleMulti === "single"
      ? handleSingleCategoryClick
      : handleMultiCategoryClick;

  return categories.map((cate) => {
    let isSelected;
    if (chkSingleMulti === "single") {
      isSelected =
        cateJsonKeyList.reduce((obj, key) => obj[key], property) === cate;
    } else if (chkSingleMulti === "multi") {
      isSelected = cateJsonKeyList
        .reduce((obj, key) => obj[key], property)
        .includes(cate);
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
          {isSelected && <FaCheck />}
          <span>{cate}</span>
        </Button>
      </div>
    );
  });
};

export {
  renderCategoryButtons,
  handleChange,
  getValue,
  handleSingleCategoryClick,
  handleMultiCategoryClick,
};
