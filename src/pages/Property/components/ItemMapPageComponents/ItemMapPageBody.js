import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";

import markerIcon from "./Images/markerIcon.svg";
import { useEffect, useState } from "react";

const CustomMapMarker = ({ title, windowWidth }) => {
  const iconUrl = markerIcon;
  const mobileContentArray = [
    `<div style="margin: 0; display: table; padding: 0.5rem; table-layout: auto; border-radius: 2.3rem; border: 0.2rem solid #1D4ED8; background: white; cursor: pointer; position: relative; z-index: 2">`,
    `<div style="display: table-cell; display: inline-block; width: 2.5rem; height: 2.5rem; background-image: url(${iconUrl}); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>`,
    '<span style="position: absolute; border-style: solid; border-width: 1rem 1rem 0 1rem; border-color: #ffffff transparent; display: block; width: 0; z-index: 1; top: 3.1rem; left: 0.75rem;"></span>',
    '<span style="position: absolute; border-style: solid; border-width: 1rem 1rem 0 1rem; border-color: #1D4ED8 transparent; display: block; width: 0; z-index: 0; top: 3.80rem; left: 0.75rem;"></span>',
    "</div>",
  ];
  const PCContentArray = [
    '<div style="margin: 0; display: table; padding: 0.5rem; table-layout: auto; border-radius: 2.3rem; border: 0.2rem solid var(--color--darkgreen); background: white; cursor: pointer; position: relative; z-index: 2">',
    `<div style="display: table-cell; display: inline-block; width: 4rem; height: 4rem; background-image: url(${iconUrl}); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>`,
    '<div style="max-width: 23rem; height: 4rem; padding: 0 0.8rem 0 0.8rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: table-cell; vertical-align: middle; cursor: pointer; font-size: 1.5rem; letter-spacing: -0.04rem; font-weight: 600; line-height: 4rem;">',
    title,
    "</div>",
    '<span style="position: absolute; border-style: solid; border-width: 1.2rem 1rem 0 1rem; border-color: #ffffff transparent; display: block; width: 0; z-index: 1; top: 4.8rem; left: 1.4rem;"></span>',
    '<span style="position: absolute; border-style: solid; border-width: 1.2rem 1rem 0 1rem; border-color: #1D4ED8 transparent; display: block; width: 0; z-index: 0; top: 5.05rem; left: 1.4rem;"></span>',
    "</div>",
  ];
  if (windowWidth < 768) return mobileContentArray.join("");

  return PCContentArray.join("");
};

const handleClick = (viewportWidth) => {
  alert(`Marker Clicked , ${viewportWidth}`);
};

function MyMap({ mapCenter }) {
  // instead of window.naver.maps
  const navermaps = useNavermaps();
  const { lat, lon } = mapCenter;
  const name = "test";
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <NaverMap defaultCenter={new navermaps.LatLng(lat, lon)} defaultZoom={15}>
      <Marker
        onClick={() => handleClick(viewportWidth)}
        position={new navermaps.LatLng(lat, lon)}
        icon={{
          content: `<div style="width: ${viewportWidth}px;">${CustomMapMarker({
            title: name,
            windowWidth: viewportWidth,
          })}</div>`,
          anchor: new navermaps.Point(16, 32),
        }}
      />
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
