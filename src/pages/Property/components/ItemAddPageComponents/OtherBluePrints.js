export const getDefaultBlueprint = () => [
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "상권",
        },
        {
          type: "flatButtons2",
          btns: {
            name: "areaTypeBtns",
            categories: ["역세권", "주거권", "유통권"],
            path: ["area_type"],
            mode: "multi",
          },
        },
      ],
    ],
  },
];

export const getHideBlueprint = () => [
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "등급",
        },
        {
          type: "flatButtons2",
          btns: {
            name: "gradeBtns",
            categories: ["상", "중", "하"],
            path: ["grade"],
            mode: "single",
          },
        },
      ],
      [
        {
          type: "label",
          labelText: "진행 상태",
        },
        {
          type: "flatButtons2",
          btns: {
            name: "statusBtns",
            categories: ["기본", "임장중", "계약중"],
            path: ["status"],
            mode: "single",
          },
        },
      ],
      [
        {
          type: "label",
          labelText: "앱/웹 노출 여부",
        },
        {
          type: "flatButtons2",
          btns: {
            name: "isActiveBtns",
            categories: [true, false],
            path: ["is_active"],
            mode: "single",
            mappedCategories: {
              true: "노출 O",
              false: "노출 X",
            },
          },
        },
      ],
      [
        {
          type: "label",
          labelText: "매물 확보 여부",
        },
        {
          type: "flatButtons2",
          btns: {
            name: "isVerifiedBtns",
            categories: [true, false],
            path: ["is_verified"],
            mode: "single",
            mappedCategories: {
              true: "확보 O",
              false: "확보 X",
            },
          },
        },
      ],
      [
        {
          type: "label",
          labelText: " ",
          style: "mb-10",
        },
      ],
    ],
  },
];
