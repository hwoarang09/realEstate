// PublicRoot.js
import { Outlet } from "react-router-dom";
import Header from "../pages/Property/components/HeaderComponents/Header";

export default function PublicRoot() {
  return (
    <div className="">
      {/* 헤더는 원래 없어야함..관리자 계정 보호를 위해 뚫어둠 */}
      {/* <Header /> */}
      <Outlet />
    </div>
  );
}
