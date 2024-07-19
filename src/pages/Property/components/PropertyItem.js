//import { useState } from "react";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoMdDownload } from "react-icons/io";
import Button from "../../../components/Button";
import useModal from "../../../hooks/use-modal";

function PropertyItem({ property, onEdit }) {
  //const [showEdit, setShowEdit] = useState(false);
  const { isOpen, openModal, closeModal, ModalComponent } = useModal();

  const modal = (
    <ModalComponent>
      <div className="p-5">
        <h1 className="text-xl font-bold">매물 정보</h1>

        <div className="text-xl font-bold mb-4">
          <div>
            <Button primary onClick={closeModal}>
              뒤로가기
            </Button>
          </div>

          <div className="text-gray-500">{property.id}</div>
          <div className="text-gray-500">{property.buildingInfo.address}</div>
          <div className="text-gray-500">
            {property.buildingInfo.buildingName}
          </div>
          <div className="text-gray-500">{property.rentInfo.deposit}</div>
          <div className="text-gray-500">{property.rentInfo.monthlyRent}</div>
        </div>
      </div>
    </ModalComponent>
  );
  return (
    <div className="bg-white p-4 shadow-md rounded mb-1 pb-20">
      <img
        src={property.images.main[0].url}
        alt="Listing"
        className="w-full h-48 object-cover rounded p-2"
      />
      <div className="mt-2">
        <div className="flex items-center space-x-5 text-lg">
          <a onClick={openModal} className="text-blue-600">
            {property.id}
          </a>
          {isOpen && modal}
          <CiBookmarkPlus></CiBookmarkPlus>
          <IoMdDownload></IoMdDownload>
        </div>

        <div className="flex flex-col justify-between">
          <p className="text-sm">{property.buildingInfo.address}</p>
          <div className="flex justify-end mt-2 space-x-4">
            <span className="text-sm">
              <span className="font-bold">전용</span>{" "}
              {property.rentInfo.exclusiveArea}평
            </span>
            <span className="text-sm">
              <span className="font-bold">임대</span>
              {property.rentInfo.rentalArea}평
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyItem;
