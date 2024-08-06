export const isExactMatch = (obj) => {
  const target = {
    area_type: undefined,
    from_updated_date: undefined,
    order: "desc",
    sort: undefined,
    tmpSortDate: undefined,
    to_updated_date: undefined,
    from_deposit: 0,
    to_deposit: 9000000,
    from_monthly_rent: 0,
    to_monthly_rent: 9000000,
    from_monthly_rent_by: 0,
    to_monthly_rent_by: 9000000,
    grade: undefined,
    available_md_name: undefined,
    recommended_md_name: undefined,
    is_active: undefined,
    is_contact_completed: undefined,
    page: 1,
    keyword: undefined,
  };

  if (!obj || Object.keys(obj).length !== Object.keys(target).length) {
    return false;
  }

  for (let key in target) {
    if (Array.isArray(target[key])) {
      if (!Array.isArray(obj[key]) || obj[key].length !== target[key].length) {
        console.log("length different", key, obj[key], target[key]);
        return false;
      }
    } else if (obj[key] !== target[key]) {
      console.log("value different", key, obj[key], target[key]);
      return false;
    }
  }

  return true;
};
