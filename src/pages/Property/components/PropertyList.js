// import React from "react";
import PropertyItem from "../components/PropertyItem";
import axios from "axios";
import { useState, useEffect } from "react";

import useModal from "../../../hooks/use-modal";

function PropertyList() {
  const { showModal } = useModal({ caller: "PropertyList" });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  const fetchProperties = async () => {
    try {
      console.log("property list 1..fetching try");
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "list"
      );
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

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 출력할 내용
  }

  if (error) {
    return <div>Error: {error.message}</div>; // 에러 발생 시 출력할 내용
  }

  console.log("property list 2, properties ", properties);
  const renderedProperties = properties.map((property) => {
    return (
      <PropertyItem
        showModal={showModal}
        property={property}
        key={property.id}
      />
    );
  });

  return <div className="property-list">{renderedProperties}</div>;
}
// export default React.memo(PropertyList);
export default PropertyList;
