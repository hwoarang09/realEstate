import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ItemInfoHeader from "../../components/FormComponents/FormHeader";
import MapDemo from "../../components/ItemMapPageComponents/ItemMapPageBody";
const ItemMapPage = ({ closeModal, modalPath, mapCenter }) => {
  const navigate = useNavigate();
  console.log("ItemMapPage", mapCenter);
  return (
    <div className="w-full h-[1200px] overflow-y-auto">
      <ItemInfoHeader onCloseModal={closeModal} />
      <form className="mt-10">
        <div className="px-4 pt-4 ">
          <h1>ItemMapPage</h1>
          <div>{mapCenter.lat}</div>
          <div>{mapCenter.lon}</div>
          <button onClick={() => navigate("/property")}>Go to Property</button>
        </div>
      </form>
      <MapDemo mapCenter={mapCenter} />
    </div>
  );
};

export default ItemMapPage;
