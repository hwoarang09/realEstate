export const getDefaultBlueprint = ({
  btns: [openableBtns, recommendedBtns, areaBtns],
}) => [
  {
    WIDTHLIST: [
      [
        {
          type: "menuTitle",
          labelText: "개별 가능 진료과",
        },
      ],
      [
        {
          type: "flatButtons",
          btns: openableBtns,
        },
      ],
      [
        {
          type: "menuTitle",
          labelText: "추천 진료과",
        },
      ],
      [
        {
          type: "flatButtons",
          btns: recommendedBtns,
        },
      ],
      [
        {
          type: "menuTitle",
          labelText: "상권",
        },
      ],
      [
        {
          type: "flatButtons",
          btns: areaBtns,
        },
      ],
    ],
  },
];

export const getHideBlueprint = ({
  comps: [scoreComps, hospitalComps, areaComps],
}) => [
  {
    WIDTHLIST: [
      [
        {
          type: "menuTitle",
          labelText: "입주현황",
        },
      ],
      [
        {
          type: "customJSX",
          jsx: scoreComps,
        },
      ],
      [
        {
          type: "menuTitle",
          labelText: "진료과별 점수",
        },
      ],
      [
        {
          type: "customJSX",
          jsx: hospitalComps,
        },
      ],
      [
        {
          type: "menuTitle",
          labelText: "상권 특성",
        },
      ],
      [
        {
          type: "customJSX",
          jsx: areaComps,
          style: "mb-10",
        },
      ],
    ],
  },
];
