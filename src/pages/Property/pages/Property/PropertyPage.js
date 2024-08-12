import React, { useState, useEffect, useRef, useCallback } from "react";
import PropertyList from "../../components/PropertyListComponents/PropertyList";
import { Outlet } from "react-router-dom";
import { useFetchPropertiesQuery } from "../../../../store";
import PropertyMenu from "../../components/PropertyListComponents/PropertyMenu";
import FilterPage from "../../components/FilterComponents/FilterPage";
import { useSelector } from "react-redux";
import Modal from "../../../../commonComponents/Modal";

const PAGE_LIMIT = process.env.REACT_APP_PAGE_LIMIT;

function PropertyPage() {
  const [page, setPage] = useState(1);
  const [allProperties, setAllProperties] = useState([]);

  const isList = useSelector((state) => state.isList.isList);
  const params = useSelector((state) => state.searchFilter);

  const { data, error, isLoading } = useFetchPropertiesQuery({
    is_verified: true,

    ...params,
    page,
  });

  const observer = useRef();

  useEffect(() => {
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
        if (entries[0].isIntersecting && data?.count?.filtered > PAGE_LIMIT) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, data]
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <PropertyMenu add={"add"} countData={data.count} />
      <PropertyList
        properties={allProperties}
        setProperties={setAllProperties}
        lastPropertyElementRef={lastPropertyElementRef}
        isLoading={isLoading}
        error={error}
      />
      {!isList && (
        <Modal isRouting={false}>
          <FilterPage />
        </Modal>
      )}
      <Outlet />
      {/* <MapViewTab /> */}
    </>
  );
}

export default PropertyPage;
