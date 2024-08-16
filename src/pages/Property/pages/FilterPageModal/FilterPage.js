import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsList } from "../../../../store/slices/headerSlice";
import { subDays, startOfWeek, subMonths, format } from "date-fns";
import { setFilters } from "../../../../store/slices/searchFilterSlice";

import Button from "../../../../commonComponents/Button";
import StyleForm from "../../../../commonComponents/FormStyle";
import { formGenerator } from "../../../../utils/formGenerator";
import GridComponent from "../../../../@/components/ui/myPyRangeSlider";

import {
  getSortBlueprint,
  getAreaBlueprint,
  getAccessibleBlueprint,
  getPriceBlueprint,
  getTypeBlueprint,
} from "../../components/FilterComponents/FilterBluePrints";

import {
  REACT_APP_PAGE_LIMIT as PAGE_LIMIT,
  REACT_APP_PAGE_ORDER as PAGE_ORDER,
  REACT_APP_PAGE_SORT as PAGE_SORT,
} from "../../../../constants/constants";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../@/components/ui/accordion";

function FilterPage() {
  const dispatch = useDispatch();
  const filterParams = useSelector((state) => state.searchFilter);
  const [filterObj, setFilterObj] = useState({
    ...filterParams,
    order: "desc",
  });
  const [activeItem, setActiveItem] = React.useState(null);

  useEffect(() => {
    console.log(
      "filterObj가 변경되었습니다:",
      filterObj,
      "params",
      filterParams
    );
  }, [filterObj, filterParams]);

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

  const handleReset = () => {
    handleFilterReset();
    handleDateSortReset();
  };

  const sortBluePrint = getSortBlueprint();
  const accesibleBluePrint = getAccessibleBlueprint();
  const priceBluePrint = getPriceBlueprint({
    customJSX: { myGridSlider },
  });
  const typeBluePrint = getTypeBlueprint();
  const areaBluePrint = getAreaBlueprint();

  return (
    <div className="w-full max-w-[500px] justify-center items-center rounded-xl z-60 h-[1200px] overflow-y-auto">
      <div className="border-t border-gray-100 px-4">
        <StyleForm mainWrapper>
          <StyleForm tabWrapper>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-sortDate">
                <AccordionTrigger>
                  {" "}
                  <StyleForm accordionTitle>정렬 및 날짜</StyleForm>
                </AccordionTrigger>
                <AccordionContent>
                  {sortBluePrint.map((bluePrint, i) => (
                    <React.Fragment key={`${i}`}>
                      {formGenerator({
                        property: filterObj,
                        setProperty: setFilterObj,
                        ...bluePrint,
                      })}
                    </React.Fragment>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-area">
                <AccordionTrigger>
                  {" "}
                  <StyleForm accordionTitle>상권 </StyleForm>
                </AccordionTrigger>
                <AccordionContent>
                  {areaBluePrint.map((bluePrint, i) => (
                    <React.Fragment key={i}>
                      {formGenerator({
                        property: filterObj,
                        setProperty: setFilterObj,
                        ...bluePrint,
                      })}
                    </React.Fragment>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-type">
                <AccordionTrigger>
                  {" "}
                  <StyleForm accordionTitle> 업종 </StyleForm>
                </AccordionTrigger>
                <AccordionContent>
                  {typeBluePrint.map((bluePrint, i) => (
                    <React.Fragment key={i}>
                      {formGenerator({
                        property: filterObj,
                        setProperty: setFilterObj,
                        ...bluePrint,
                      })}
                    </React.Fragment>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-price">
                <AccordionTrigger>
                  {" "}
                  <StyleForm accordionTitle> 가격 </StyleForm>
                </AccordionTrigger>
                <AccordionContent>
                  {priceBluePrint.map((bluePrint, i) => (
                    <React.Fragment key={i}>
                      {formGenerator({
                        property: filterObj,
                        setProperty: setFilterObj,
                        ...bluePrint,
                      })}
                    </React.Fragment>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-access">
                <AccordionTrigger>
                  {" "}
                  <StyleForm accordionTitle>노출&확보 </StyleForm>
                </AccordionTrigger>
                <AccordionContent>
                  {accesibleBluePrint.map((bluePrint, i) => (
                    <React.Fragment key={i}>
                      {formGenerator({
                        property: filterObj,
                        setProperty: setFilterObj,
                        ...bluePrint,
                      })}
                    </React.Fragment>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </StyleForm>
        </StyleForm>
      </div>
      <div
        className="fixed bottom-0 w-full max-w-[500px]
          flex justify-center items-center py-2 opacity-100 bg-white border-t z-10"
      >
        <div className="flex w-2/5 justify-center items-center">
          <span onClick={handleReset} className="cursor-pointer mx-4">
            초기화
          </span>
        </div>
        <div className="flex w-3/5 justify-center items-center px-2">
          <Button
            primary
            rounded
            className="text-lg py-2 cursor-pointer w-full "
            onClick={handleUpdateChanges}
          >
            변경사항 저장
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FilterPage;
