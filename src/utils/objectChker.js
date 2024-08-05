export const isExactMatch = (obj) => {
  const target = {
    area_type: [],
    from_updated_date: "",
    order: "desc",
    sort: "",
    tmpSortDate: "",
    to_updated_date: "",
    from_deposit: 0,
    to_deposit: 99999,
    from_monthly_rent: 0,
    to_monthly_rent: 99999,
    from_monthly_rent_by: 0,
    to_monthly_rent_by: 99999,
    keyword: "",
    page: 1,
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
