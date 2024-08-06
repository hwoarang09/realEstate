import React, { useEffect, useState } from "react";

const GridComponent = ({ property, setProperty, keyList, sizeList }) => {
  //초기 텍스트 및 숫자 배열 생성
  const width = sizeList[0];
  const height = sizeList[1];
  const interval = sizeList[2];
  const totalCount = width * height;
  const initialNumbers = Array.from(
    { length: totalCount },
    (_, i) => i * interval
  );
  const initialNumbersText = initialNumbers.slice();
  for (let i = 0; i < totalCount; i++) {
    if (i === 0) initialNumbersText[i] = "전체";
    else if (i === 1) initialNumbersText[i] += "평 이하";
    else if (i > 1 && i < totalCount - 1) {
      initialNumbersText[i] += "평대";
    } else initialNumbersText[i] += "평 이상";
  }

  const [clickList, setClickList] = useState([]);
  const [colors, setColors] = useState(
    Array.from({ length: totalCount }, (_, index) => {
      let borderChk = "";
      if (index % width === width - 1) {
        borderChk += "border-l border-t border-r border-gray-300";
      } else {
        borderChk += "border-l border-t border-gray-300";
      }
      if (index >= width * (height - 1)) {
        borderChk += " border-b border-gray-300";
      }
      return borderChk;
    })
  );

  useEffect(() => {
    //property로부터 초기선택값 가져오기
    let initialClickList = [];
    let leftClick = property[keyList[0]];
    let rightClick = property[keyList[1]];

    console.log("leftClick, rightClick", leftClick, rightClick);
    console.log(
      "property in pyrange",
      property[keyList[0]],
      property[keyList[1]]
    );
    //0,9999 이면 전체선택이므로, 0을 넣어줌
    if (leftClick === 0 && rightClick === 9999) {
      initialClickList = [0];

      //0, 100이면 100평이하니까, 1을 넣어줌
    } else if (leftClick === 0 && rightClick === interval) {
      initialClickList = [1];

      // 100,200  혹은 300,400처럼 간격이 100인 경우 왼쪽값/100 1개만 선택
    } else if (rightClick - leftClick === interval) {
      initialClickList = [Math.floor(leftClick / 100)];

      // 8칸인데 700, 9999면 맨 오른쪽 700평 이상이므로, 7을 넣어줌
    } else if (
      rightClick === 9999 &&
      leftClick === interval * (totalCount - 1)
    ) {
      initialClickList = [totalCount - 1];

      // 위의 모든 경우를 제외하면 케이스가 2가지임
      // 300, 9999처럼 중간 + 맨오른쪽인 경우
      // 300,600처럼 중간 + 중간인 경우

      //300, 9999같은 경우 leftClick이 0인 경우랑, 최대값인 경우를 위에서 제거했으므로 rigth 9999로만 체크하면 됨
    } else if (rightClick === 9999) {
      initialClickList = [Math.floor(leftClick / 100), totalCount - 1];
      //그 외에는
    } else {
      initialClickList = [
        Math.floor(leftClick / 100),
        Math.floor(rightClick / 100) - 1,
      ];
    }

    setClickList(initialClickList);

    const newColors = Array(totalCount).fill("");

    if (initialClickList.length === 1) {
      newColors[initialClickList[0]] = "border border-black";
    } else if (initialClickList.length === 2) {
      const [min, max] = initialClickList.sort((a, b) => a - b);
      console.log("min, max", min, max, width, height);
      for (let i = min; i <= max; i++) {
        newColors[i] += " border-l border-t border-black";
        if (i + width < min || i + width > max) {
          newColors[i] += " border-b border-black";
        }
        if (i + 1 < min || i + 1 > max || i % width === 3) {
          newColors[i] += " border-r border-black";
        }
      }
    }

    setColors(newColors);
  }, [property, keyList, sizeList]);

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

    if (newClickList.length === 1) {
      newColors[newClickList[0]] = " border border-black";
    } else if (newClickList.length === 2) {
      const [min, max] = newClickList.sort((a, b) => a - b);
      for (let i = min; i <= max; i++) {
        newColors[i] += " border-l border-t border-black";
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

    if (newClickList[0] === 0) {
      console.log("범위", 0, 9999);

      setProperty((prevProperty) => ({
        ...prevProperty,
        [keyList[0]]: 0,
        [keyList[1]]: 9999,
      }));
    } else {
      if (newClickList.length === 1) {
        if (newClickList[0] === 1) {
          setProperty((prevProperty) => ({
            ...prevProperty,
            [keyList[0]]: 0,
            [keyList[1]]: initialNumbers[newClickList[0]],
          }));
          console.log("범위", 0, initialNumbers[newClickList[0]]);
        } else if (newClickList[0] === totalCount - 1) {
          setProperty((prevProperty) => ({
            ...prevProperty,
            [keyList[0]]: initialNumbers[newClickList[0]],
            [keyList[1]]: 9999,
          }));
          console.log("범위", initialNumbers[newClickList[0]], 9999);
        } else {
          setProperty((prevProperty) => ({
            ...prevProperty,
            [keyList[0]]: initialNumbers[newClickList[0]],
            [keyList[1]]: initialNumbers[newClickList[0] + 1],
          }));
          console.log(
            "범위",
            initialNumbers[newClickList[0]],
            initialNumbers[newClickList[0] + 1]
          );
        }
      } else {
        if (newClickList[1] === totalCount - 1) {
          setProperty((prevProperty) => ({
            ...prevProperty,
            [keyList[0]]: initialNumbers[newClickList[0]],
            [keyList[1]]: 9999,
          }));
          console.log("범위", initialNumbers[newClickList[0]], 9999);
        } else {
          setProperty((prevProperty) => ({
            ...prevProperty,
            [keyList[0]]: initialNumbers[newClickList[0]],
            [keyList[1]]: initialNumbers[newClickList[1] + 1],
          }));
          console.log(
            "범위",
            initialNumbers[newClickList[0]],
            initialNumbers[newClickList[1] + 1]
          );
        }
      }
    }
    console.log("newClickList", newClickList);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-2">
      {initialNumbersText.map((text, index) => {
        return (
          <div
            key={`mypy` + index}
            className={`p-2 flex items-center justify-center cursor-pointer 
              ${colors[index]}`}
            onClick={() => handleClick(index)}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
};

export default GridComponent;
