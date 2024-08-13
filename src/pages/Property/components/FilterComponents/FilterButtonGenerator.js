export const mappedSortOrder = {
  updated_at: "수정한 날짜",
  created_at: "업로드 날짜",
};

export const btnsGeneratorSort = ({
  filterObj,
  setFilterObj,
  renderCategoryButtons,
}) => {
  const categoriesConfig = [
    {
      name: "sortOrderBtns",
      categories: ["updated_at", "created_at"],
      path: ["sort"],
      mode: "single",
      mappedOptions: mappedSortOrder,
    },
    {
      name: "sortDateBtns",
      categories: ["어제", "지난주", "지난달"],
      path: ["tmpSortDate"],
      mode: "single",
    },
  ];

  return categoriesConfig.reduce((acc, config) => {
    acc[config.name] = renderCategoryButtons(
      config.categories,
      config.path,
      config.mode,
      filterObj,
      setFilterObj,
      config.mappedOptions
    );
    return acc;
  }, {});
};
export const btnsGeneratorFilter = ({
  filterObj,
  setFilterObj,
  renderCategoryButtons,
}) => {
  const categoriesConfig = [
    {
      name: "areaBtns",
      categories: ["역세권", "유통권", "주거권"],
      path: ["area_type"],
      mode: "multi",
    },
    {
      name: "gradeBtns",
      categories: ["상", "중", "하"],
      path: ["area_type"],
      mode: "single",
    },
    {
      name: "availableMdBtns",
      categories: ["치과", "미용", "감기", "통증", "한의원"],
      path: ["available_md_name"],
      mode: "multi",
    },
    {
      name: "recommendedMdBtns",
      categories: ["치과", "미용", "감기", "통증", "한의원"],
      path: ["recommended_md_name"],
      mode: "multi",
    },
    {
      name: "isActiveBtns",
      categories: ["노출 O", "노출 X"],
      path: ["is_active"],
      mode: "single",
    },
    {
      name: "isContactCompletedBtns",
      categories: ["확보 O", "확보 X"],
      path: ["is_contact_completed"],
      mode: "single",
    },
  ];

  return categoriesConfig.reduce((acc, config) => {
    acc[config.name] = renderCategoryButtons(
      config.categories,
      config.path,
      config.mode,
      filterObj,
      setFilterObj,
      config.mappedOptions
    );
    return acc;
  }, {});
};
