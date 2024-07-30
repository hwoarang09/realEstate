import PropertyItem from "../components/PropertyItem";
import useModal from "../../../hooks/use-modal";
import { useFetchPropertiesQuery } from "../../../store";

function PropertyList() {
  const { showModal } = useModal({ caller: "PropertyList" });
  const {
    data: { contents: properties = [] } = {},
    error,
    isLoading,
  } = useFetchPropertiesQuery({ is_verified: true, page: 1, limit: 10 });

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 출력할 내용
  }

  if (error) {
    return <div>Error: {error.message}</div>; // 에러 발생 시 출력할 내용
  }

  console.log("property list 2, properties ", properties);
  const renderedProperties = properties.map((property) => {
    return (
      <PropertyItem
        showModal={showModal}
        property={property}
        key={property.id}
      />
    );
  });

  return <div className="property-list">{renderedProperties}</div>;
}
// export default React.memo(PropertyList);
export default PropertyList;
