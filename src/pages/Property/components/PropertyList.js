import PropertyItem from "../components/PropertyItem";
import axios from "axios";
import { useState, useEffect } from "react";

const URL = "http://localhost:3002/opn";
function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  const fetchProperties = async () => {
    try {
      const response = await axios.get(URL);
      setProperties(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); // 로딩 완료
    }
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

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 출력할 내용
  }

  if (error) {
    return <div>Error: {error.message}</div>; // 에러 발생 시 출력할 내용
  }

  console.log("in list", properties);
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
