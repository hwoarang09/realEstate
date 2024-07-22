import PropertyItem from "../components/PropertyItem";
import axios from "axios";
import { useState, useEffect } from "react";

const URL = "http://localhost:3002/opn";
function PropertyList() {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    const response = await axios.get(URL);

    setProperties(response.data);
  };

  useEffect(() => {
    fetchProperties();
  }, []);
  const editPropertyById = async (id, formData) => {
    const response = await axios.put(URL + "/" + id, formData);

    const updatedProperties = properties.map((property) => {
      if (property.id === id) {
        return { ...property, ...response.data };
      }

      return property;
    });

    setProperties(updatedProperties);
  };

  const renderedProperties = properties.map((property) => {
    return (
      <PropertyItem
        onEdit={editPropertyById}
        property={property}
        key={property.id}
      />
    );
  });

  return <div className="property-list">{renderedProperties}</div>;
}
export default PropertyList;
