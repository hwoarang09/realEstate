import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleIsList,
  setIsList,
  setLeft,
  setSearch,
} from "../../../../store/slices/headerSlice";

import Button from "../../../../commonComponents/Button";

import {
  notNullValue,
  renderCategoryButtons,
  handleChange,
  parseFormInt,
} from "../../../../utils/formUtils";
import { Input } from "../../../../@/components/ui/input";
import StyleForm from "../../../../commonComponents/FormStyle";
import { formGenerator, ToggleButton } from "../../../../utils/formGenerator";
import { addDays, subDays, startOfWeek, subMonths, format } from "date-fns";
import {
  setKeyword,
  setFilters,
} from "../../../../store/slices/searchFilterSlice";

const sortOrderOption = ["updated_at", "created_at"];
const mappedSortOrder = {
  updated_at: "수정한 날짜",
  created_at: "업로드 날짜",
};
const sortDateOption = ["어제", "지난주", "지난달"];
const areaOption = ["역세권", "유통권", "주거권"];
const gradeOption = ["상", "중", "하"];
const cateOption = ["치과", "미용", "감기", "통증", "한의원"];
const activeOption = ["노출 O", "노출 X"];
const ownOption = ["확보 O", "확보 X"];

function FilterPage() {
  const dispatch = useDispatch();
  const { keyword, from_area, to_area } = useSelector(
    (state) => state.searchFilter
  );

  const [filterObj, setFilterObj] = useState({
    order: "desc",
  });
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
      console.log("tmpSortDate is empty?", tmpSortDate);
      setFilterObj((prevObj) => ({
        ...prevObj,
        from_updated_date: null,
        to_updated_date: null,
      }));
    }
  }, []);

  useEffect(() => {
    // if (filterObj.tmpSortDate) {
    //   updateFilterDates(filterObj.tmpSortDate);
    // }
    updateFilterDates(filterObj.tmpSortDate);
  }, [filterObj.tmpSortDate, updateFilterDates]);

  const handleUpdateChanges = () => {
    dispatch(
      setFilters({
        ...filterObj,
      })
    );
    dispatch(setLeft(false));
    dispatch(setSearch(false));
    dispatch(setIsList(true));
    console.log("변경사항 저장", filterObj);
  };

  const sortOrderBtns = renderCategoryButtons(
    sortOrderOption,
    ["sort"],
    "single",
    filterObj,
    setFilterObj,
    mappedSortOrder
  );
  const sortDateBtns = renderCategoryButtons(
    sortDateOption,
    ["tmpSortDate"],
    "single",
    filterObj,
    setFilterObj
  );
  const areaBtns = renderCategoryButtons(
    areaOption,
    ["area"],
    "multi",
    filterObj,
    setFilterObj
  );
  const sortBluePrint = [
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
      ],
    },
  ];
  const filterBluePrint = [
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
            labelText: "전용면적(평)",
          },
        ],
        [
          {
            type: "range",
            slider: null,
          },
        ],
      ],
    },
  ];
  return (
    <div className="mt-16 w-full max-w-[500px] justify-center items-center rounded-xl">
      <div className="border-2 border-gray-100 p-4">
        <h2 className="text-xl mb-4">필터</h2>
        <StyleForm mainWrapper>
          <StyleForm tabWrapper>
            <StyleForm menuTitle>정렬 및 날짜</StyleForm>
            {sortBluePrint.map((bluePrint, i) => (
              <React.Fragment key={`ft1_${i}`}>
                {formGenerator({
                  property: filterObj,
                  setProperty: setFilterObj,
                  ...bluePrint,
                })}
              </React.Fragment>
            ))}
          </StyleForm>
          <StyleForm tabWrapper>
            <StyleForm menuTitle>필터</StyleForm>
            {filterBluePrint.map((bluePrint, i) => (
              <React.Fragment key={`ft2_${i}`}>
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
          flex justify-center items-center bg-blue-800 text-white text-lg py-3 cursor-pointer"
      >
        변경사항 저장
      </div>
    </div>
  );
}

export default FilterPage;
