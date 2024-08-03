import Header from "../components/HeaderComponents/Header";

import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="">
      <Header />

      <Outlet />
    </div>
  );
}
