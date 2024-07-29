const ItemInfoOther = ({ property, setProperty }) => {
  if (!property) {
    return;
  }
  return (
    <div className="my-6">
      <div className="mb-2 ">
        <div className="text-blue-600 text-base font-bold mb-2">기타 설정</div>
      </div>
    </div>
  );
};

export default ItemInfoOther;
