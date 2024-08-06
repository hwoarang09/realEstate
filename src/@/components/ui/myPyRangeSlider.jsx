import { set } from "lodash";
import React, { useState } from "react";

const GridComponent = () => {
  const initialNumbers = [
    "전체",
    "50평 이하",
    "100평 대",
    "150평 대",
    "200평 대",
    "250평 대",
    "300평 대",
    "350평 이상",
  ];
  const [clickList, setClickList] = useState([]);

  const [colors, setColors] = useState(
    Array.from({ length: 8 }, (_, index) => {
      let borderChk = "";
      if (index === 3 || index === 7) {
        borderChk += "border-l border-t border-r border-gray-300";
      } else {
        borderChk += "border-l border-t border-gray-300";
      }
      if (index >= 4) {
        borderChk += " border-b border-gray-300";
      }
      return borderChk;
    })
  );

  const handleClick = (index) => {
    console.log("clcikc index", index);
    let newClickList = [...clickList];
    if (index === 0) {
      //0을 클릭하면 전체로 무조건 초기화
      newClickList = [0];
    } else {
      //비워졌거나 1개만 있을 경우
      if (newClickList.length < 2) {
        //전체선택을 클릭하거나 같은 숫자를 클릭했을 경우
        if (newClickList.includes(0) || newClickList.includes(index)) {
          newClickList = [index];
        } else newClickList.unshift(index);
      } else {
        //2개 이미 채워졌을 경우, 비우고 1개만 넣기
        newClickList = [index];
      }
    }

    const newColors = Array(8).fill("");
    const width = 4;
    const height = 2;
    if (newClickList.length === 1) {
      newColors[newClickList[0]] = " border border-black";
    } else if (newClickList.length === 2) {
      const [min, max] = newClickList.sort((a, b) => a - b);
      for (let i = min; i <= max; i++) {
        newColors[i] += " border-l border-t border-black";
        // if (i - width < min || i - width > max) {
        //   newColors[i] += " border-t border-black";
        // }
        if (i + width < min || i + width > max) {
          newColors[i] += " border-b border-black";
        }
        if (i + 1 < min || i + 1 > max || i % width === 3) {
          newColors[i] += " border-r border-black";
        }
      }
    }
    setClickList(newClickList);
    setColors(newColors);
    console.log("newClickList", newClickList);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-2">
      {initialNumbers.map((number, index) => {
        return (
          <div
            key={`mypy` + index}
            className={`p-2 flex items-center justify-center cursor-pointer 
              ${colors[index]}`}
            onClick={() => handleClick(index)}
          >
            {number}
          </div>
        );
      })}
    </div>
  );
};

export default GridComponent;
