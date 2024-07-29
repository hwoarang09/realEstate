const ItemInfoImages = ({ property, setProperty }) => {
  if (!property) {
    return;
  }
  return (
    <div className="my-6">
      <div className="mb-2 ">
        <div className="text-blue-600 text-base font-bold mb-2">사진</div>
      </div>
    </div>
  );
};

export default ItemInfoImages;
