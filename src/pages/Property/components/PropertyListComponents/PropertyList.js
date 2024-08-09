import React from "react";
import PropertyItem from "./PropertyItem";
import useModal from "../../../../hooks/use-modal";

const PropertyList = ({
  properties,
  setProperties,
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

  // const newProperties = properties.map((property) => {
  //   return;
  // });
  const renderedProperties = properties.map((property, index) => {
    if (properties.length === index + 1) {
      console.log('red chck', properties.length, index + 1, property.id);
      return (
        <PropertyItem
          ref={lastPropertyElementRef}
          showModal={showModal}
          property={property}
          setProperties={setProperties}
          key={property?.group_id ? property.group_id : property.id }
        />
      );
    } else {
      return (
        <PropertyItem
          property={property}
          showModal={showModal}
          setProperties={setProperties}
          key={property?.group_id ? property.group_id : property.id }
        />
      );
    }
  });

  return <div className="max-w-[500px]">{renderedProperties}</div>;
};

export default PropertyList;
