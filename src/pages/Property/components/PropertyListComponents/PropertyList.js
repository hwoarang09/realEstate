import React from "react";
import PropertyItem from "./PropertyItem";
import useModal from "../../../../hooks/use-modal";

const PropertyList = ({
  properties,
  lastPropertyElementRef,
  isLoading,
  error,
}) => {
  const { showModal } = useModal();

  if (isLoading && properties.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Error: {error.message}</div>;
  }

  console.log("in PropertyLIst, properties : ", properties);
  const renderedProperties = properties.map((property, index) => {
    if (properties.length === index + 1) {
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
          property={property}
          showModal={showModal}
          key={property.id}
        />
      );
    }
  });

  return <div className="max-w-[500px]">{renderedProperties}</div>;
};

export default PropertyList;
