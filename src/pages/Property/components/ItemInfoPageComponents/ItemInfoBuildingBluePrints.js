const mode = "edit";
export const getDefaultBlueprint = () => [
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "주소",
          req: true,
        },
        {
          type: "text",
          keyList: ["address"],
          style: "w-2/3",
          style_input: "w-full",
          disabled: mode !== "create",
        },
      ],
    ],
  },
];

export const getHideBlueprint = ({ customJSX: { buildingSizeComp } }) => [
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
      [
        {
          type: "customJSX",
          jsx: buildingSizeComp,
        },
      ],
    ],
  },
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "준공일자",
          req: true,
        },
        {
          type: "text",
          keyList: ["completion_date"],
          maxLength: 8,
        },
      ],
    ],
  },
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "승강기",
        },
        {
          type: "number",
          keyList: ["elevator_customer"],
        },
      ],
    ],
  },
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "주차수",
        },
        {
          type: "number",
          keyList: ["total_parking"],
          style: "w-20 mr-2",
        },
        {
          type: "simpleText",
          simpleText: "대",
        },
      ],
    ],
  },
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "병의원 가능 여부",
          style: "w-full",
        },
      ],
      [
        {
          type: "flatButtons2",
          btns: {
            name: "bdhsAvailBtns",
            categories: ["전체 가능", "부분 가능", "불가능"],
            path: ["extra", "bd_hs_available"],
            mode: "single",
          },
        },
      ],
    ],
  },
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "입점 가능한 층",
          style: "w-full",
        },
      ],
      [
        {
          type: "number",
          keyList: ["pt_hs_available_floor"],
          widthStyle: "w-20 mr-2",
        },
      ],
    ],
  },
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "동종업종 가능 여부",
          style: "w-full",
        },
      ],
      [
        {
          type: "flatButtons2",
          btns: {
            name: "sameCateBtns",
            categories: ["가능", "불가능"],
            path: ["extra", "sm_md_open_available"],
            mode: "single",
          },
        },
        {
          type: "text",
          keyList: ["sm_md_open_available"],
          style: "ml-5",
        },
      ],
    ],
  },
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "장애인 시설",
          style: "w-full",
        },
      ],
      [
        {
          type: "label",
          labelText: "승강기",
          style: "text-sm w-1/8",
        },
        {
          type: "flatButtons2",
          btns: {
            name: "elevatorsCateBtns",
            categories: ["유", "무"],
            path: ["extra", "handicap_ele"],
            mode: "single",
          },
          style: "mr-6",
        },
        {
          type: "label",
          labelText: "경사로",
          style: "text-sm w-1/8",
        },
        {
          type: "flatButtons2",
          btns: {
            name: "rampCateBtns",
            categories: ["유", "무"],
            path: ["extra", "handicap_ramp"],
            mode: "single",
          },
          style: "mr-6",
        },
      ],
      [
        {
          type: "label",
          labelText: "주차장",
          style: "text-sm w-1/8",
        },
        {
          type: "flatButtons2",
          btns: {
            name: "parkingSpotsCateBtns",
            categories: ["유", "무"],
            path: ["extra", "handicap_parking"],
            mode: "single",
          },
          style: "mr-6",
        },
        {
          type: "label",
          labelText: "화장실",
          style: "text-sm w-1/8",
        },
        {
          type: "flatButtons2",
          btns: {
            name: "restroomCateBtns",
            categories: ["유", "무"],
            path: ["extra", "handicap_wc"],
            mode: "single",
          },
          style: "mr-6",
        },
      ],
    ],
  },
];
