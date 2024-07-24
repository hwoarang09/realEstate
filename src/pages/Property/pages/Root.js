import Header from "../components/Header";

import { Outlet } from "react-router-dom";

export default function Root() {
  console.log("Root");
  return (
    <div className="w-[448px]">
      <Header />

      <Outlet />
    </div>
  );
}
