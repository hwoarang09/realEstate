export const getSortBlueprint = () => [
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
          type: "flatButtons2",
          btns: {
            name: "sortOrderBtns",
            categories: ["updated_at", "created_at"],
            path: ["sort"],
            mode: "single",
            mappedCategories: {
              updated_at: "수정한 날짜",
              created_at: "업로드 날짜",
            },
          },
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
          type: "flatButtons2",
          btns: {
            name: "sortDateBtns",
            categories: ["어제", "지난주", "지난달"],
            path: ["tmpSortDate"],
            mode: "single",
          },
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

export const getFilterBlueprint = ({ customJSX: { myGridSlider } }) => {
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
            type: "flatButtons2",
            btns: {
              name: "areaBtns",
              categories: ["역세권", "유통권", "주거권"],
              path: ["area_type"],
              mode: "multi",
            },
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
            type: "flatButtons2",
            btns: {
              name: "gradeBtns",
              categories: ["상", "중", "하"],
              path: ["area_type"],
              mode: "single",
            },
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
            type: "flatButtons2",
            btns: {
              name: "availableMdBtns",
              categories: ["치과", "미용", "감기", "통증", "한의원"],
              path: ["available_md_name"],
              mode: "multi",
            },
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
            type: "flatButtons2",
            btns: {
              name: "recommendedMdBtns",
              categories: ["치과", "미용", "감기", "통증", "한의원"],
              path: ["recommended_md_name"],
              mode: "multi",
            },
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
            type: "flatButtons2",
            btns: {
              name: "isActiveBtns",
              categories: ["노출 O", "노출 X"],
              path: ["is_active"],
              mode: "single",
            },
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
            type: "flatButtons2",
            btns: {
              name: "isContactCompletedBtns",
              categories: ["확보 O", "확보 X"],
              path: ["is_contact_completed"],
              mode: "single",
            },
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
