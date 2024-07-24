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
  const [formData, setFormData] = useState(null);
  // const [formData, setFormData] = useState({
  //   id: "",
  //   openableCategories: [],
  //   recommendedCategories: [],
  //   tags: [],
  //   buildingInfo: {
  //     address: "",
  //     buildingName: "",
  //     scale: {
  //       groundFloors: "",
  //       totalFloors: "",
  //     },
  //     completionDate: "",
  //     elevators: "",
  //     parkingSpots: "",
  //     HC_Availability: "",
  //     totalRentableFloors: "",
  //     SMSAvailability: "",
  //     SMSAvailabilityInput: "",
  //     disabledFacilities: {
  //       elevator: "",
  //       parkingSpots: "",
  //       ramp: "",
  //       restroom: "",
  //     },
  //   },
  //   rentInfo: {
  //     deposit: "",
  //     monthlyRent: "",
  //     maintenanceFee: "",
  //     rentalFloor: {
  //       rentalFloorInput: "",
  //       rentalType: "",
  //     },
  //     exclusiveArea: "",
  //     rentalArea: "",
  //     moveIn: {
  //       moveInASAP: "",
  //       moveInDate: "",
  //     },
  //     freeParking: "",
  //     visitorParking: "",
  //     transferOfLease: "",
  //     keyMoney: "",
  //   },
  //   images: {
  //     main: [],
  //     exterior: [],
  //     interior: [],
  //     floorPlan: [],
  //   },
  //   memo: {
  //     text: "",
  //     contact: {
  //       agencyName: "",
  //       representative: "",
  //       phone: "",
  //     },
  //   },
  //   contactInfo: [
  //     {
  //       role: "",
  //       type: "",
  //       agency: "",
  //       name: "",
  //       phone: "",
  //       company: "",
  //     },
  //   ],
  //   settings: {
  //     shopTypes: [],
  //     level: "",
  //     progress: "",
  //     openApp: false,
  //     propertySecured: false,
  //   },
  //   contractInfo: {
  //     completed: false,
  //     openDoctorMediated: false,
  //     registrationDate: "",
  //     modificationDate: "",
  //   },
  // });

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

  useEffect(() => {
    if (properties.length > 0) {
      const propertyId = modalPath.split("property/")[1];
      const property = properties.find(
        (propert) => Number(propert.id) === Number(propertyId)
      );
      if (property) {
        setFormData(property);
      }
    }
  }, [properties, modalPath]);

  const handleSaveChanges = (event) => {
    console.log("Updated FormData:", formData);
    event.preventDefault();
    closeModal();
  };

  const handleDeleteProperty = (event) => {
    console.log("Deleting Property ID:", formData.id);
    event.preventDefault();
    closeModal();
  };
  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 출력할 내용
  }

  if (error) {
    return <div>Error: {error.message}</div>; // 에러 발생 시 출력할 내용
  }
  console.log("property", formData);
  return (
    <div className="p-4 w-[448px] h-[1200px] overflow-y-auto">
      <ItemInfoHeader onClick={closeModal} />
      <form className="mt-10">
        <ItemInfoCate property={formData} setProperty={setFormData} />
        <ItemInfoTag property={formData} setProperty={setFormData} />
        <ItemInfoBuilding property={formData} setProperty={setFormData} />
        <ItemInfoRegist property={formData} setProperty={setFormData} />
        <div className="flex justify-end mt-5">
          <Button primary onClick={handleSaveChanges}>
            저장
          </Button>
          <Button danger onClick={handleDeleteProperty} className="ml-2">
            삭제
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyItemInfoModal;
