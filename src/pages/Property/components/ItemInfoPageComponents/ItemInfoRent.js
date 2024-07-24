const ItemInfoRent = ({ property }) => {
  return (
    <div className="rentInfo my-6">
      <div className="mb-2 text-gray-500">
        주소: {property.buildingInfo.address}
      </div>
      <div className="mb-2 text-gray-500">
        건물명: {property.buildingInfo.buildingName}
      </div>
      <div className="mb-2 text-gray-500">
        보증금: {property.rentInfo.deposit}
      </div>
      <div className="mb-2 text-gray-500">
        월세: {property.rentInfo.monthlyRent}
      </div>
    </div>
  );
};

export default ItemInfoRent;
