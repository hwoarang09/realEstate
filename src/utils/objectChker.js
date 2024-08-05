export const isExactMatch = (obj) => {
  const target = {
    area: [],
    from_deposit: 0,
    from_updated_date: "",
    order: "desc",
    sort: "",
    tmpSortDate: "",
    to_deposit: 99999,
    to_updated_date: "",
    page: 1,
  };

  if (!obj || Object.keys(obj).length !== Object.keys(target).length) {
    return false;
  }

  for (let key in target) {
    if (Array.isArray(target[key])) {
      if (!Array.isArray(obj[key]) || obj[key].length !== target[key].length) {
        return false;
      }
    } else if (obj[key] !== target[key]) {
      return false;
    }
  }

  return true;
};
