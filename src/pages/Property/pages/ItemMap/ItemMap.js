import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const ItemMapPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    try {
      // 로그인 구현은 했는데, 관리자 계정 보호를 위해 주석처리
      // const response = await axios.post(baseURL + "auth/signin", {
      //   email,
      //   password,
      // });
      // login(response.data.access_token, response.data.refresh_token);
      navigate("/property");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1>ItemMapPage</h1>
    </div>
  );
};

export default ItemMapPage;
