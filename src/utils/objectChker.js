export const isExactMatch = (obj) => {
  const target = {
    order: "desc",
    sort: "updated_at",
    limit: 10,
    page: 1,
  };

  if (!obj) return false;

  const tmpObj = { ...obj };
  delete tmpObj.keyword;

  if (Object.keys(tmpObj).length !== Object.keys(target).length) {
    console.log(
      "!!!!!!!",
      tmpObj,
      Object.keys(tmpObj).length,
      Object.keys(tmpObj).length
    );
    return false;
  }

  for (let key in target) {
    if (Array.isArray(target[key])) {
      if (
        !Array.isArray(tmpObj[key]) ||
        tmpObj[key].length !== target[key].length
      ) {
        console.log(
          `!!!!!!length different, <${key}>, <${tmpObj[key]}>, <${target[key]}>`
        );
        return false;
      }
    } else if (tmpObj[key] !== target[key]) {
      console.log(
        `!!!!!!!!!value different, <${key}>, <${tmpObj[key]}>, <${target[key]}>`
      );
      return false;
    }
  }

  return true;
};
