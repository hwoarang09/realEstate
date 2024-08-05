// utils/blueprints.js

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
        },
      ],
    ],
  },
];

export const getHideBlueprint = ({
  btns: [
    bdhsAvailBtns,
    sameCateBtns,
    elevatorsCateBtns,
    rampCateBtns,
    parkingSpotsCateBtns,
    restroomCateBtns,
  ],
  customJSX: [buildingSizeComp],
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
        },
        {
          type: "text",
          keyList: ["completion_date"],
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
          type: "flatButtons",
          btns: bdhsAvailBtns,
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
          labelText: "동종진료과 가능 여부",
          style: "w-full",
        },
      ],
      [
        {
          type: "flatButtons",
          btns: sameCateBtns,
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
          type: "flatButtons",
          btns: elevatorsCateBtns,
          style: "mr-6",
        },
        {
          type: "label",
          labelText: "경사로",
          style: "text-sm w-1/8",
        },
        {
          type: "flatButtons",
          btns: rampCateBtns,
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
          type: "flatButtons",
          btns: parkingSpotsCateBtns,
          style: "mr-6",
        },
        {
          type: "label",
          labelText: "화장실",
          style: "text-sm w-1/8",
        },
        {
          type: "flatButtons",
          btns: restroomCateBtns,
          style: "mr-6",
        },
      ],
    ],
  },
];
