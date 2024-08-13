export const getSortBlueprint = ({ btns: { sortOrderBtns, sortDateBtns } }) => [
  {
    WIDTHLIST: [
      [
        {
          type: "label",
          labelText: "정렬 순서",
        },
      ],
      [
        {
          type: "flatButtons",
          btns: sortOrderBtns,
        },
      ],
      [
        {
          type: "label",
          labelText: "날짜 설정",
        },
      ],
      [
        {
          type: "flatButtons",
          btns: sortDateBtns,
        },
      ],
      [
        {
          type: "datePickerRange",
          keyList: "tmpSortDate",
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

export const getFilterBlueprint = ({
  btns: {
    areaBtns,
    gradeBtns,
    availableMdBtns,
    recommendedMdBtns,
    isActiveBtns,
    isContactCompletedBtns,
  },
  customJSX: { myGridSlider },
}) => {
  console.log("in bluprint, btns", areaBtns);
  return [
    {
      WIDTHLIST: [
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
        [
          {
            type: "label",
            labelText: "평수",
          },
        ],
        [
          {
            type: "customJSX",
            jsx: myGridSlider,
          },
        ],
        [
          {
            type: "label",
            labelText: "보증금(억원)",
          },
        ],
        [
          {
            type: "range",
            keyList: ["from_deposit", "to_deposit"],
          },
        ],
        [
          {
            type: "label",
            labelText: "임대료(만원)",
          },
        ],
        [
          {
            type: "range",
            keyList: ["from_monthly_rent", "to_monthly_rent"],
          },
        ],
        [
          {
            type: "label",
            labelText: "평당 임대료(만원)",
            style: "w-1/2",
          },
        ],
        [
          {
            type: "range",
            keyList: ["from_monthly_rent_by", "to_monthly_rent_by"],
          },
        ],
        [
          {
            type: "label",
            labelText: "등급",
          },
        ],
        [
          {
            type: "flatButtons",
            btns: gradeBtns,
          },
        ],
        [
          {
            type: "label",
            labelText: "개원 가능 진료과",
          },
        ],
        [
          {
            type: "flatButtons",
            btns: availableMdBtns,
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
            btns: recommendedMdBtns,
          },
        ],
        [
          {
            type: "label",
            labelText: "노출 여부",
          },
        ],
        [
          {
            type: "flatButtons",
            btns: isActiveBtns,
          },
        ],
        [
          {
            type: "label",
            labelText: "확보 여부",
          },
        ],
        [
          {
            type: "flatButtons",
            btns: isContactCompletedBtns,
          },
        ],
        [
          {
            type: "label",
            labelText: " ",
            style: "mb-40",
          },
        ],
      ],
    },
  ];
};
