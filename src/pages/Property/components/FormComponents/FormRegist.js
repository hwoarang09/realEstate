import { formatDate } from "../../../../utils/dateHelper";

const FormRegist = ({ property }) => {
  if (!property) {
    return;
  }
  return (
    <div className="registInfo my-6 text-sm">
      <div className="mb-2 ">매물 ID: {property.id}</div>
      <div className="mb-2 ">등록일시: {formatDate(property.created_at)}</div>
      <div className="mb-2 ">수정일시: {formatDate(property.updated_at)}</div>
    </div>
  );
};

export default FormRegist;
