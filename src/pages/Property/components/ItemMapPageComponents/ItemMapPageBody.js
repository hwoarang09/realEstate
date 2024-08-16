import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";

function MyMap({ mapCenter }) {
  // instead of window.naver.maps
  const navermaps = useNavermaps();
  const { lat, lon } = mapCenter;
  return (
    <NaverMap defaultCenter={new navermaps.LatLng(lat, lon)} defaultZoom={15}>
      <Marker defaultPosition={new navermaps.LatLng(lat, lon)} />
    </NaverMap>
  );
}

const MapDemo = ({ mapCenter }) => {
  console.log("MapDemo");
  return (
    <MapDiv
      style={{
        width: "100%",
        height: "600px",
      }}
    >
      <MyMap mapCenter={mapCenter} />
    </MapDiv>
  );
};

export default MapDemo;
