import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleIsList,
  setIsList,
  setLeft,
  setSearch,
} from "../../../../store/slices/headerSlice";
import { omit } from "lodash";
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
import _ from "lodash";
import { fromJSON } from "postcss";

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
  const filterParams = useSelector((state) => state.searchFilter);

  const [filterObj, setFilterObj] = useState({
    ...filterParams,
    order: "desc",
  });

  console.log("filterParams", filterParams, filterObj);
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
    ["area_type"],
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
            labelText: "상권(버튼만)",
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
          },
        ],
        [
          {
            type: "range",
            keyList: ["from_monthly_rent_by", "to_monthly_rent_by"],
          },
        ],
      ],
    },
  ];

  const handleUpdateChanges = () => {
    console.log("handleUpdateChanges", {
      ...filterObj,

      page: 1,
    });
    dispatch(
      setFilters({
        ...filterObj,
        //슬라이어에서 100찍으면 100억 이상으로 처리
        to_deposit: filterObj.to_deposit === 100 ? 99999 : filterObj.to_deposit,
        to_monthly_rent:
          filterObj.to_monthly_rent === 100 ? 99999 : filterObj.to_monthly_rent,
        to_monthly_rent_by:
          filterObj.to_monthly_rent_by === 100
            ? 99999
            : filterObj.to_monthly_rent_by,
        page: 1,
      })
    );
    dispatch(setIsList(true));
  };
  const handleDateSort = () => {
    const newProperty = {
      ...filterObj,
      sort: "",
      tmpSortDate: "",
      from_updated_date: "",
      to_updated_date: "",
    };
    setFilterObj(newProperty);
  };

  const handleFilter = () => {
    const newProperty = {
      ...filterObj,
      area_type: [],
      from_deposit: 0,
      to_deposit: 99999,
      from_monthly_rent: 0,
      to_monthly_rent: 99999,
      from_monthly_rent_by: 0,
      to_monthly_rent_by: 99999,
    };
    setFilterObj(newProperty);
  };

  const handleTest = () => {
    const newProperty = _.cloneDeep(filterObj);
    newProperty.test = !newProperty.test;
    setFilterObj(newProperty);
    console.log("handleTest", newProperty);
  };
  return (
    <div className="mt-16 w-full max-w-[500px] justify-center items-center rounded-xl">
      <div className="border-2 border-gray-100 p-4">
        <h2 className="text-xl mb-4">필터</h2>
        <div onClick={handleTest}>
          {" "}
          체크테스트 {filterObj.test ? "True" : "False"}
        </div>
        <StyleForm mainWrapper>
          <StyleForm tabWrapper>
            <StyleForm menuTitle>
              정렬 및 날짜
              <span
                onClick={handleDateSort}
                className="text-sm text-gray-500 underline cursor-pointer ml-4"
              >
                초기화
              </span>
            </StyleForm>
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
            <StyleForm menuTitle>
              필터{" "}
              <span
                onClick={handleFilter}
                className="text-sm text-gray-500 underline cursor-pointer ml-4"
              >
                초기화
              </span>
            </StyleForm>
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
