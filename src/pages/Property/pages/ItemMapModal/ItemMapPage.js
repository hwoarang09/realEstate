import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ItemInfoHeader from "../../components/FormComponents/FormHeader";
const ItemMapPage = ({ closeModal }) => {
  const navigate = useNavigate();
  console.log("ItemMapPage");
  return (
    <div className="w-full h-[1200px] overflow-y-auto">
      <ItemInfoHeader onCloseModal={closeModal} />
      <form className="mt-10">
        <div className="px-4 pt-4 ">
          <h1>ItemMapPage</h1>
          <button onClick={() => navigate("/property")}>Go to Property</button>
        </div>
      </form>
    </div>
  );
};

export default ItemMapPage;
