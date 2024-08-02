import React, { useState, useEffect, useRef, useCallback } from "react";
import PropertyItem from "../components/PropertyItem";
import useModal from "../../../hooks/use-modal";
import { useFetchPropertiesQuery } from "../../../store";

function PropertyList() {
  const { showModal } = useModal({ caller: "PropertyList" });
  const [page, setPage] = useState(1);
  const [allProperties, setAllProperties] = useState([]);
  const { data, error, isLoading } = useFetchPropertiesQuery({
    is_verified: true,
    page,
    limit: 10,
  });

  const observer = useRef();

  useEffect(() => {
    if (data?.contents) {
      console.log("Fetched data:", data.contents);
      setAllProperties((prevProperties) => {
        // 새로운 데이터의 id 목록
        const newPropertyIds = new Set(data.contents.map((p) => p.id));

        // 중복 항목을 제거한 기존 데이터
        const filteredPrevProperties = prevProperties.filter(
          (existingProperty) => !newPropertyIds.has(existingProperty.id)
        );

        // 새로운 데이터를 기존 데이터에 추가
        return [...filteredPrevProperties, ...data.contents];
      });
    }
  }, [data]);

  const lastPropertyElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("Intersection detected, fetching next page...");
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) {
        console.log("Observing", node);
        observer.current.observe(node);
      }
    },
    [isLoading]
  );

  if (isLoading && page === 1) {
    return <div>Loading...</div>; // 첫 페이지 로딩 중일 때 출력할 내용
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error: {error.message}</div>; // 에러 발생 시 출력할 내용
  }

  const renderedProperties = allProperties.map((property, index) => {
    if (allProperties.length === index + 1) {
      return (
        <PropertyItem
          ref={lastPropertyElementRef}
          showModal={showModal}
          property={property}
          key={property.id}
        />
      );
    } else {
      return (
        <PropertyItem
          showModal={showModal}
          property={property}
          key={property.id}
        />
      );
    }
  });

  console.log("Rendered properties:", allProperties);

  return <div className="max-w-[500px]">{renderedProperties}</div>;
}

export default PropertyList;
