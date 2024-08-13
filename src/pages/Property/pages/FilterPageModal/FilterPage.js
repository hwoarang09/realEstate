import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsList } from "../../../../store/slices/headerSlice";
import { subDays, startOfWeek, subMonths, format } from "date-fns";
import { setFilters } from "../../../../store/slices/searchFilterSlice";

import { renderCategoryButtons } from "../../../../utils/formUtils";
import StyleForm from "../../../../commonComponents/FormStyle";
import { formGenerator } from "../../../../utils/formGenerator";
import GridComponent from "../../../../@/components/ui/myPyRangeSlider";
import {
  btnsGeneratorFilter,
  btnsGeneratorSort,
} from "../../components/FilterComponents/FilterButtonGenerator";
import {
  getSortBlueprint,
  getFilterBlueprint,
} from "../../components/FilterComponents/FilterBluePrints";

import {
  REACT_APP_PAGE_LIMIT as PAGE_LIMIT,
  REACT_APP_PAGE_ORDER as PAGE_ORDER,
  REACT_APP_PAGE_SORT as PAGE_SORT,
} from "../../../../constants/constants";

function FilterPage() {
  const dispatch = useDispatch();
  const filterParams = useSelector((state) => state.searchFilter);
  const [filterObj, setFilterObj] = useState({
    ...filterParams,
    order: "desc",
  });

  useEffect(() => {
    console.log("filterObj가 변경되었습니다:", filterObj);
  }, [filterObj]);

  const updateFilterDates = useCallback((tmpSortDate) => {
    console.log("updateFilterDates", tmpSortDate);
    const today = new Date();
    const formattedToday = format(today, "yyyy-MM-dd");

    const yesterday = subDays(today, 1);
    const formattedYesterday = format(yesterday, "yyyy-MM-dd");

    const lastWeekStart = startOfWeek(subDays(today, 7), { weekStartsOn: 1 });
    const formattedLastWeekStart = format(lastWeekStart, "yyyy-MM-dd");

    const lastMonthStart = subMonths(today, 1);
    const formattedLastMonthStart = format(lastMonthStart, "yyyy-MM-dd");

    if (tmpSortDate === "어제") {
      setFilterObj((prevObj) => ({
        ...prevObj,
        from_updated_date: formattedYesterday,
        to_updated_date: formattedToday,
      }));
    } else if (tmpSortDate === "지난주") {
      setFilterObj((prevObj) => ({
        ...prevObj,
        from_updated_date: formattedLastWeekStart,
        to_updated_date: formattedToday,
      }));
    } else if (tmpSortDate === "지난달") {
      setFilterObj((prevObj) => ({
        ...prevObj,
        from_updated_date: formattedLastMonthStart,
        to_updated_date: formattedToday,
      }));
    } else if (tmpSortDate === "") {
      //버튼을 다시 눌러서 선택해제할 경우
      setFilterObj((prevObj) => ({
        ...prevObj,
        from_updated_date: "",
        to_updated_date: "",
      }));
    }
  }, []);

  useEffect(() => {
    updateFilterDates(filterObj.tmpSortDate);
  }, [filterObj.tmpSortDate, updateFilterDates]);

  const myGridSlider = (
    <GridComponent
      property={filterObj}
      setProperty={setFilterObj}
      keyList={["from_area", "to_area"]}
      sizeList={[4, 2, 100]}
    />
  );

  const handleUpdateChanges = () => {
    dispatch(
      setFilters({
        ...filterObj,
        ...(filterObj.to_deposit !== undefined && {
          to_deposit:
            filterObj.to_deposit === 100 ? 99999 : filterObj.to_deposit,
        }),
        ...(filterObj.to_monthly_rent !== undefined && {
          to_monthly_rent:
            filterObj.to_monthly_rent === 100
              ? 99999
              : filterObj.to_monthly_rent,
        }),
        ...(filterObj.to_monthly_rent_by !== undefined && {
          to_monthly_rent_by:
            filterObj.to_monthly_rent_by === 100
              ? 99999
              : filterObj.to_monthly_rent_by,
        }),
      })
    );
    dispatch(setIsList(true));
  };

  const handleDateSortReset = () => {
    const newProperty = { ...filterObj };
    delete newProperty.from_updated_date;
    delete newProperty.to_updated_date;
    delete newProperty.tmpSortDate;

    newProperty.sort = PAGE_SORT;
    newProperty.limit = PAGE_LIMIT;
    newProperty.order = PAGE_ORDER;

    setFilterObj(newProperty);
  };

  const handleFilterReset = () => {
    const newProperty = {
      ...(filterObj.from_updated_date !== undefined && {
        from_updated_date: filterObj.from_updated_date,
      }),
      ...(filterObj.to_updated_date !== undefined && {
        to_updated_date: filterObj.to_updated_date,
      }),
      ...(filterObj.tmpSortDate !== undefined && {
        tmpSortDate: filterObj.tmpSortDate,
      }),
      ...(filterObj.keyword !== undefined && {
        keyword: filterObj.keyword,
      }),
      sort: PAGE_SORT,
      limit: PAGE_LIMIT,
      order: PAGE_ORDER,
      page: 1,
    };

    setFilterObj(newProperty);
  };

  const sortBluePrint = getSortBlueprint({
    btns: btnsGeneratorSort({
      filterObj,
      setFilterObj,
      renderCategoryButtons,
    }),
  });
  const filterBluePrint = getFilterBlueprint({
    btns: btnsGeneratorFilter({
      filterObj,
      setFilterObj,
      renderCategoryButtons,
    }),
    customJSX: { myGridSlider },
  });

  
  return (
    <div className="w-full max-w-[500px] justify-center items-center rounded-xl z-60 h-[1200px] overflow-y-auto">
      <div className="border-2 border-gray-100 px-4">
        <StyleForm mainWrapper>
          <StyleForm tabWrapper>
            <StyleForm menuTitle>
              정렬 및 날짜
              <span
                onClick={handleDateSortReset}
                className="text-sm text-gray-500 underline cursor-pointer ml-4"
              >
                초기화
              </span>
            </StyleForm>
            {sortBluePrint.map((bluePrint, i) => (
              <React.Fragment key={`${i}`}>
                {formGenerator({
                  property: filterObj,
                  setProperty: setFilterObj,
                  ...bluePrint,
                })}
              </React.Fragment>
            ))}
          </StyleForm>
          <StyleForm tabWrapper>
            <StyleForm menuTitle>
              필터{" "}
              <span
                onClick={handleFilterReset}
                className="text-sm text-gray-500 underline cursor-pointer ml-4"
              >
                초기화
              </span>
            </StyleForm>
            {filterBluePrint.map((bluePrint, i) => (
              <React.Fragment key={i}>
                {formGenerator({
                  property: filterObj,
                  setProperty: setFilterObj,
                  ...bluePrint,
                })}
              </React.Fragment>
            ))}
          </StyleForm>
        </StyleForm>
      </div>
      <div
        onClick={handleUpdateChanges}
        className="fixed bottom-0 w-full max-w-[500px]
          flex justify-center items-center bg-blue-800 text-white text-lg py-3 cursor-pointer z-10"
      >
        변경사항 저장
      </div>
    </div>
  );
}

export default FilterPage;
