// utils/formBlueprints.js
export const getDefaultBlueprint = (rentalTypeBtns) => [
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "보증금",
          req: true,
        },
        {
          type: "number",
          keyList: ["deposit"],
          disabled: true,
        },
      ],
    ],
  },
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "임대료",
          req: true,
        },
        {
          type: "number",
          keyList: ["monthly_rent"],
          disabled: true,
        },
      ],
    ],
  },
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "관리비",
          req: true,
        },
        {
          type: "text",
          keyList: ["maintenance_cost_str"],
          disabled: true,
        },
      ],
    ],
  },
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "임대층",
          req: true,
        },
        {
          type: "text",
          keyList: ["floor"],
          style: "w-20 mr-2",
        },
        {
          type: "flatButtons",
          btns: rentalTypeBtns,
        },
      ],
    ],
  },
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "전용면적",
          req: true,
        },
        {
          type: "number",
          keyList: ["exclusive_area"],
          disabled: true,
        },
      ],
    ],
  },
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "임대면적",
          req: false,
        },
        {
          type: "number",
          keyList: ["contact_area"],
          disabled: true,
        },
      ],
    ],
  },
];

export const getHideBlueprint = (
  availDateBtns,
  freeParkingBtns,
  visitorParkingBtns,
  transferMoneyBtns
) => [
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "입주시기",
        },
        {
          type: "datePicker",
          keyList: "available_date",
        },
      ],
      [
        {
          type: "label",
          labelText: " ",
        },
        {
          type: "flatButtons",
          btns: availDateBtns,
        },
      ],
    ],
  },
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "무료주차",
          req: false,
        },
        {
          type: "flatButtons",
          btns: freeParkingBtns,
        },
      ],
    ],
  },
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "방문주차",
          req: false,
        },
        {
          type: "flatButtons",
          btns: visitorParkingBtns,
        },
      ],
    ],
  },
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "양도양수",
          req: false,
        },
        {
          type: "flatButtons",
          btns: transferMoneyBtns,
        },
      ],
    ],
  },
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "권리금",
          req: false,
        },
        {
          type: "number",
          keyList: ["key_money"],
        },
      ],
    ],
  },
];
