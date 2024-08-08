// utils/formBlueprints.js

export const rentalTypeCategories = ["전층", "일부"];
export const availDateCategories = ["즉시", "협의"];
export const transferMoneyCategories = ["양수도 매물임"];
export const parkingCategories = ["가능", "불가능", "협의"];

export const btnsGenerator = ({
  property,
  setProperty,
  renderCategoryButtons,
}) => {
  const categoriesConfig = [
    {
      name: "availDateBtns",
      categories: availDateCategories,
      path: ["available_date"],
    },
    {
      name: "rentalTypeBtns",
      categories: rentalTypeCategories,
      path: ["rent_scale"],
    },
    {
      name: "transferMoneyBtns",
      categories: transferMoneyCategories,
      path: ["transferMoney"],
    },
    {
      name: "visitorParkingBtns",
      categories: parkingCategories,
      path: ["visit_parking"],
    },
    {
      name: "freeParkingBtns",
      categories: parkingCategories,
      path: ["free_parking_str"],
    },
  ];

  return categoriesConfig.reduce((acc, config) => {
    acc[config.name] = renderCategoryButtons(
      config.categories,
      config.path,
      config.type === "multi" ? "multi" : "single",
      property,
      setProperty
    );
    return acc;
  }, {});
};

export const getDefaultBlueprint = ({ mode, btns: { rentalTypeBtns } }) => [
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

export const getHideBlueprint = ({
  btns: {
    availDateBtns,
    freeParkingBtns,
    visitorParkingBtns,
    transferMoneyBtns,
  },
  mode,
}) => [
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
