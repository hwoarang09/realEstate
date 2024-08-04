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
  const [searchQuery, setSearchQuery] = useState("");
  const isList = useSelector((state) => state.isList);

  const { data, error, isLoading } = useFetchPropertiesQuery({
    is_verified: true,
    page,
    limit: 10,
    keyword: searchQuery,
  });

  const observer = useRef();

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

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  return (
    <>
      {/* <Header onSearch={handleSearch} setIsList={setIsList} /> */}
      {isList && (
        <>
          <PropertyMenu add={"add"} searchQuery={searchQuery} />
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
