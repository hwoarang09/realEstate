import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ItemInfoHeader from "../../components/FormComponents/FormHeader";
import MapDemo from "../../components/ItemMapPageComponents/ItemMapPageBody";
const ItemMapPage = ({ closeModal, modalPath, mapCenter }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[1200px] overflow-y-auto">
      <ItemInfoHeader onCloseModal={closeModal} />
      <form className="mt-16">
        <div className="p-4 ">
          <div>위도 : {mapCenter.lat}</div>
          <div>경도 : {mapCenter.lon}</div>
          <button onClick={() => navigate("/property")}>Go to Property</button>
        </div>
      </form>
      <MapDemo mapCenter={mapCenter} />
    </div>
  );
};

export default ItemMapPage;
