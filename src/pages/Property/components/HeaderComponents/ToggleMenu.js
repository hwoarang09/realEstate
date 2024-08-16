import * as React from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { blue } from "@mui/material/colors";

import { RiHospitalFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { MdChecklist } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoBookmarks } from "react-icons/io5";
import { TbBuildingSkyscraper } from "react-icons/tb";
export default function VerticalToggleButtons() {
  const [view, setView] = React.useState("list");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const buttonTextList = [
    ["홈", <FaHome className="w-6 h-6" />],
    ["매물정보", <TbBuildingSkyscraper className="w-6 h-6" />],
    ["의원정보", <RiHospitalFill className="w-6 h-6" />],
    ["체크리스트", <MdChecklist className="w-6 h-6" />],
    ["분석리포트", <TbReport className="w-6 h-6" />],
    ["공지사항", <IoIosNotificationsOutline className="w-6 h-6" />],
    ["즐겨찾기", <IoBookmarks className="w-6 h-6" />],
  ];

  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={view}
      exclusive
      onChange={handleChange}
      className="w-full "
    >
      {buttonTextList.map((text, i) => (
        <ToggleButton
          value={text[0]}
          aria-label={text[0]}
          key={i}
          sx={{
            width: "100%",
            border: "none",
            backgroundColor: "white",
            color: "black",
            textAlign: "left",
          }}
        >
          <div>{text[1]}</div>
          <div className="px-4 text-base w-full">{text[0]}</div>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
