const mode = "view";

export const getDefaultBlueprint = () => [
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
          disabled: mode !== "create",
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
          disabled: mode !== "create",
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
          disabled: mode !== "create",
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
          type: "flatButtons2",
          btns: {
            name: "rentalTypeBtns",
            categories: ["전층", "일부"],
            path: ["rent_scale"],
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
          labelText: "전용면적",
          req: true,
        },
        {
          type: "number",
          keyList: ["exclusive_area"],
          disabled: mode !== "create",
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
          disabled: mode !== "create",
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
          labelText: "입주시기",
        },
        {
          type: "flatButtons2",
          btns: {
            name: "availDateBtns",
            categories: ["즉시", "협의"],
            path: ["available_date"],
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
          labelText: "무료주차",
          req: false,
        },
        {
          type: "flatButtons2",
          btns: {
            name: "freeParkingBtns",
            categories: ["가능", "불가능", "협의"],
            path: ["free_parking_str"],
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
          labelText: "방문주차",
          req: false,
        },
        {
          type: "flatButtons2",
          btns: {
            name: "visitorParkingBtns",
            categories: ["가능", "불가능", "협의"],
            path: ["visit_parking"],
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
          labelText: "양도양수",
          req: false,
        },
        {
          type: "flatButtons2",
          btns: {
            name: "transferMoneyBtns",
            categories: ["양수도 매물임"],
            path: ["transferMoney"],
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
