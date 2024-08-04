import React, { useState, useEffect, useRef, useCallback } from "react";
import PropertyList from "../components/PropertyListComponents/PropertyList";
import Header from "../components/HeaderComponents/Header"; // 수정된 경로
import { Outlet } from "react-router-dom";
import { useFetchPropertiesQuery } from "../../../store";
import PropertyMenu from "../components/PropertyListComponents/PropertyMenu";
import FilterPage from "../components/FilterComponents/FilterPage"; // 수정된 경로
import { useSelector } from "react-redux";

function PropertyPage() {
  const [page, setPage] = useState(1);
  const [allProperties, setAllProperties] = useState([]);

  const isList = useSelector((state) => state.isList);
  const searchQuery = useSelector((state) => state.searchFilter.keyword); // Redux 스토어에서 검색어 가져오기

  const { data, error, isLoading } = useFetchPropertiesQuery({
    is_verified: true,
    page,
    limit: 10,
    keyword: searchQuery,
  });
  const observer = useRef();

  useEffect(() => {
    // 검색어가 변경될 때 페이지와 데이터를 초기화합니다.
    setPage(1);
    setAllProperties([]);
  }, [searchQuery]);

  useEffect(() => {
    if (data?.contents) {
      if (page === 1) {
        setAllProperties(data.contents);
      } else {
        setAllProperties((prevProperties) => {
          const newPropertyIds = new Set(data.contents.map((p) => p.id));
          const filteredPrevProperties = prevProperties.filter(
            (existingProperty) => !newPropertyIds.has(existingProperty.id)
          );
          return [...filteredPrevProperties, ...data.contents];
        });
      }
    }
  }, [data, page]);

  const lastPropertyElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );



  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {/* <Header onSearch={handleSearch} setIsList={setIsList} /> */}
      {isList && (
        <>
          <PropertyMenu add={"add"} countData={data.count} />
          <PropertyList
            properties={allProperties}
            lastPropertyElementRef={lastPropertyElementRef}
            isLoading={isLoading}
            error={error}
          />
        </>
      )}
      {!isList && <FilterPage />}
      <Outlet />
      {/* <MapViewTab /> */}
    </>
  );
}

export default PropertyPage;
