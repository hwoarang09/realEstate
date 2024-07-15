import { useState } from "react";

function PropertyItem({ property, onEdit }) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="book-show">
      <img alt="books" src={property.images.exterior[0].url} />
      {property.id} {property.buildingInfo.address}
    </div>
  );
}

export default PropertyItem;
