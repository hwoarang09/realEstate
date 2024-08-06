import React, { useState, useEffect, useRef, useCallback } from "react";
import PropertyList from "../components/PropertyListComponents/PropertyList";
import Header from "../components/HeaderComponents/Header";
import { Outlet } from "react-router-dom";
import { useFetchPropertiesQuery } from "../../../store";
import PropertyMenu from "../components/PropertyListComponents/PropertyMenu";
import FilterPage from "../components/FilterComponents/FilterPage";
import { useSelector } from "react-redux";

function PropertyPage() {
  const [page, setPage] = useState(1);
  const [allProperties, setAllProperties] = useState([]);

  const isList = useSelector((state) => state.isList.isList);
  const params = useSelector((state) => state.searchFilter);
  const searchQuery = params.keyword;
  const { data, error, isLoading } = useFetchPropertiesQuery({
    is_verified: true,

    limit: 10,
    ...params,
    page,
  });
  const observer = useRef();

  useEffect(() => {
    setPage(1);
    setAllProperties([]);
  }, [searchQuery]);

  useEffect(() => {
    // params가 변경될 때 properties 초기화 및 페이지 번호 초기화
    setAllProperties([]);
    setPage(1);
  }, [params]);

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
  console.log("allProperties", allProperties.length);
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
