import { formatDate } from "../../../../utils/dateHelper";

const ItemInfoRegist = ({ property }) => {
  if (!property) {

    return;
  }
  return (
    <div className="registInfo my-6">
      <div className="mb-2 text-gray-500">매물 ID: {property.id}</div>
      <div className="mb-2 text-gray-500">
        등록일시: {formatDate(property.contractInfo.registrationDate)}
      </div>
      <div className="mb-2 text-gray-500">
        수정일시: {formatDate(property.contractInfo.modificationDate)}
      </div>
    </div>
  );
};

export default ItemInfoRegist;
