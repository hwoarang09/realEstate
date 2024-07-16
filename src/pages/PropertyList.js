import PropertyItem from "./PropertyItem";

function PropertyList({ properties, onEdit }) {
  const renderedProperties = properties.map((property) => {
    console.log(property);
    return (
      <PropertyItem onEdit={onEdit} property={property} key={property.id} />
    );
  });
  return <div className="property-list">{renderedProperties}</div>;
}

export default PropertyList;
