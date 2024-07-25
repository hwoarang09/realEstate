const ItemInfoTag = ({ property, setProperty }) => {
  if (!property) {

    return;
  }
  return (
    <div className="TagInfo my-6">
      <div className="cateHeader text-blue-600 text-base font-bold mb-2">
        태그
      </div>
    </div>
  );
};

export default ItemInfoTag;
