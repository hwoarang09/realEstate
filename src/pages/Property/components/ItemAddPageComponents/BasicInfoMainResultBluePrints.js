export const getDefaultBlueprint = ({
  btns: [openableBtns, recommendedBtns, areaBtns],
}) => [
  {
    WIDTHLIST: [
      [
        {
          type: "label",
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
          type: "label",
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
          type: "label",
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
  btns: [openableBtns, recommendedBtns, areaBtns],
  customJSX: [],
}) => [
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "건물명",
        },
        {
          type: "text",
          keyList: ["building_name"],
        },
      ],
    ],
  },
];
