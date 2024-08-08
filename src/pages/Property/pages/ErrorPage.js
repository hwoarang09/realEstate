// ErrorPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-40">
      <h1>404 - Page Not Found</h1>
      <p>존재하지 않는 페이지입니다.</p>
      <button onClick={() => navigate("/")}>돌아가기</button>
    </div>
  );
};

export default ErrorPage;
