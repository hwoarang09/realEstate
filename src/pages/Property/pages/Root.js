import Header from "../components/Header";
import PropertyMenu from "../components/Menu";

import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="w-[414px]">
      <Header />
      <PropertyMenu add={true} />
      <Outlet />
    </div>
  );
}
