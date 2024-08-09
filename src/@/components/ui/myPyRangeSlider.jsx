import React, { useEffect, useState } from "react";

const maxArea = 9999999999;

const newColorsFunction = ({ totalCount, width, height, clickList }) => {
  const newColors = Array.from({ length: totalCount }, (_, index) => {
    let borderChk = "";
    if (index % width === width - 1) {
      borderChk += "border-l border-t border-r border-gray-300";
    } else {
      borderChk += "border-l border-t border-gray-300";
    }
    if (index >= width * (height - 1)) {
      borderChk += " border-b border-gray-300";
    }
    // console.log("일단 첫 색깔 선택은 시작함", borderChk);
    return borderChk;
  });

  if (clickList.length === 1) {
    newColors[clickList[0]] = "border-l border-t border-black";
    if (clickList[0] + width < totalCount) {
      newColors[clickList[0] + width] += " border-t-black";
    }
    if (clickList[0] + 1 < totalCount && clickList[0] % width !== 3) {
      newColors[clickList[0] + 1] += " border-l-black";
    }
    if (clickList[0] % width === 3) {
      newColors[clickList[0]] += " border-r border-black";
    }
    if (clickList[0] + width > totalCount - 1) {
      newColors[clickList[0]] += " border-b border-black";
    }
  } else if (clickList.length === 2) {
    const [min, max] = clickList.sort((a, b) => a - b);
    // console.log("tow point ", min, max);
    for (let i = min; i <= max; i++) {
      newColors[i] = "p-2 flex items-center justify-center cursor-pointer ";
      if (i + width < min || i + width > max) {
        newColors[i + width] += " border-t-black";
      }
      if (i + 1 < min || i % width === 3) {
        newColors[i] += " border-r";
      }
      if (i + 1 > max && i % width !== 3) {
        newColors[i + 1] += " border-l-black";
      }
      if (i + width + 1 > totalCount) {
        newColors[i] += " border-b border-black";
      }
      newColors[i] += " border-l border-t border-black";
    }
  }

  // console.log("enwColors", newColors);
  // console.log("clicLIskt", clickList);

  return newColors;
};

const GridComponent = ({ property, setProperty, keyList, sizeList }) => {
  //초기 텍스트 및 숫자 배열 생성
  const [width, height, interval] = sizeList,
    totalCount = width * height;

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

  //아무것도 선택되지 않은, 회색 border만 있는 배열 생성
  const [colors, setColors] = useState([]);

  //property로부터 초기선택값 가져오기
  useEffect(() => {
    const [width, height, interval] = sizeList,
      totalCount = width * height;

    let initialClickList = [];
    const [leftClick, rightClick] = [
      property[keyList[0]],
      property[keyList[1]],
    ];

    //0,maxArea 이면 전체선택이므로, 0을 넣어줌
    if (leftClick === 0 && rightClick === maxArea) {
      initialClickList = [0];

      //0, 100이면 100평이하니까, 1을 넣어줌
    } else if (leftClick === 0 && rightClick === interval) {
      initialClickList = [1];

      // 100,200  혹은 300,400처럼 간격이 100인 경우 왼쪽값/100 1개만 선택
    } else if (rightClick - leftClick === interval) {
      initialClickList = [Math.floor(leftClick / 100)];

      // 8칸인데 700, maxArea면 맨 오른쪽 700평 이상이므로, 7을 넣어줌
    } else if (
      rightClick === maxArea &&
      leftClick === interval * (totalCount - 1)
    ) {
      initialClickList = [totalCount - 1];

      // 위의 모든 경우를 제외하면 케이스가 3가지임
      // 300, maxArea처럼 중간 + 맨오른쪽인 경우
      // 300,600처럼 중간 + 중간인 경우
      // 100,600처럼 0부터 중간인경우
      //300, maxArea같은 경우 leftClick이 0인 경우랑, 최대값인 경우를 위에서 제거했으므로 rigth maxArea로만 체크하면 됨
    } else if (rightClick === maxArea) {
      initialClickList = [Math.floor(leftClick / 100), totalCount - 1];
      //그 외에는
    } else {
      initialClickList = [
        Math.floor(leftClick / 100),
        Math.floor(rightClick / 100) - 1,
      ];
    }
    const newColors = newColorsFunction({
      totalCount,
      width,
      height,
      clickList: initialClickList,
    });

    setColors(newColors);
    // console.log("in useEffect newColor", newColors);
    // console.log("in useEffect initialClickList", initialClickList);
    setClickList(initialClickList);
  }, [property, keyList, sizeList]);

  const handleClick = (index) => {
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

    const newColors = newColorsFunction({
      totalCount,
      width,
      height,
      clickList: newClickList,
    });

    console.log("In handleClick newClickList", newClickList);
    setClickList(newClickList);
    setColors(newColors);

    //newClickList는 길이가 1이거나 2이다.

    //newClickList가 0이면 전체 선택이므로, 0, maxArea로 설정
    if (newClickList[0] === 0) {
      setProperty((prevProperty) => ({
        ...prevProperty,
        [keyList[0]]: 0,
        [keyList[1]]: maxArea,
      }));
    } else {
      if (newClickList.length === 1) {
        // newClickList[0]===0이 아니면서,
        // 길이가 1이고, 그 값이 1이면,
        // xxx이하 라는 텍스트를 선택햇으므로 0, interval로 설정

        // (0, 100, 200,...300,400,.. 이런 식일 수도 있찌만,
        // 0, 500, 600, 700, 800,...이런 식일 수도 있어서
        // initialNumbers의 index가 1인 값 설정.
        if (newClickList[0] === 1) {
          setProperty((prevProperty) => ({
            ...prevProperty,
            [keyList[0]]: 0,
            [keyList[1]]: initialNumbers[1],
          }));

          // newClickList[0]===0이 아니면서,
          // 길이가 1이고, 그 값이 index의 최대값이면,
          // xxxx이상 라는 텍스트를 선택햇으므로, interval*totalCount-1, maxArea로 설정
        } else if (newClickList[0] === totalCount - 1) {
          setProperty((prevProperty) => ({
            ...prevProperty,
            [keyList[0]]: initialNumbers[newClickList[0]],
            [keyList[1]]: maxArea,
          }));

          // newClickList[0]===0이 아니면서,
          // 길이가 1이고, 그 값이 index의 최대값도, 1도 아니면,
          // 중간에 범위가 inteveral인 애들임.
        } else {
          setProperty((prevProperty) => ({
            ...prevProperty,
            [keyList[0]]: initialNumbers[newClickList[0]],
            [keyList[1]]: initialNumbers[newClickList[0] + 1],
          }));
        }

        //newClickList길이가 2개일 경우
        // 첫번째값인 전체 선택은 불가능.
        // 따라서 크게 2가지임

        // 오른쪽 값이 index 최대일 경우
        // 이때는 왼쪽값부터 maxArea까지 설정
      } else {
        if (newClickList[1] === totalCount - 1) {
          setProperty((prevProperty) => ({
            ...prevProperty,
            [keyList[0]]: initialNumbers[newClickList[0]],
            [keyList[1]]: maxArea,
          }));

          //그 외에는 왼쪽값, 오른쪽까지 포함되도록한다
          // 오른쪽값이 화면에 500일 경우, 500대를 다 포함해야 하므로
          //그 다음값까지 선택함.
        } else {
          setProperty((prevProperty) => ({
            ...prevProperty,
            [keyList[0]]: initialNumbers[newClickList[0]],
            [keyList[1]]: initialNumbers[newClickList[1] + 1],
          }));
        }
      }
    }
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
