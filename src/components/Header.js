import React from "react";

const Header = () => {
  return (
    <header>
      <div className="menu-icon">-</div>
      <div>
        <div>매물관리</div>
        <div>즐겨찾기</div>
      </div>
      <button className="add-property-btn">+ 매물등록</button>
    </header>
  );
};

export default Header;
