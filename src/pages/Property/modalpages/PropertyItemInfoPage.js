import React, { useState, useEffect } from "react";
import Button from "../../../commonComponents/Button";

import ItemInfoRegist from "../components/ItemInfoPageComponents/ItemInfoRegist";
import ItemInfoCate from "../components/ItemInfoPageComponents/ItemInfoCate";
import ItemInfoHeader from "../components/ItemInfoPageComponents/ItemInfoHeader";
import ItemInfoRent from "../components/ItemInfoPageComponents/ItemInfoRent";
import ItemInfoTag from "../components/ItemInfoPageComponents/ItemInfoTag";
import ItemInfoBuilding from "../components/ItemInfoPageComponents/ItemInfoBuilding";
import axios from "axios";

const URL = "http://localhost:3002/opn";

const PropertyItemInfoModal = ({ modalPath, closeModal }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(URL);

      setProperties(response.data);
      setLoading(false); // 로딩 완료
    } catch (error) {
      setError(error);
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
  const propertyId = modalPath.split("property/")[1];
  const property = properties.find(
    (propert) => Number(propert.id) === Number(propertyId)
  );

  return (
    <div className="p-4 w-[448px] h-[1200px]">
      <ItemInfoHeader onClick={closeModal} />
      <div className="mt-10">
        <ItemInfoCate property={property} />
        <ItemInfoTag property={property} />
        <ItemInfoBuilding property={property} />
        <ItemInfoRegist property={property} />
      </div>
      {/* <div className="flex justify-end mt-5">
        <Button primary onClick={closeModal}>
          뒤로가기
        </Button>
      </div> */}
    </div>
  );
};

export default PropertyItemInfoModal;
