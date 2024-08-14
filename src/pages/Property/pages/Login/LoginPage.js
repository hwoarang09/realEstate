import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/use-auth";
import { CardWithForm } from "../../components/LoginComponents/CardWithForm";
const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/property");
    }
  }, [isAuthenticated, navigate]);

  const baseURL = process.env.REACT_APP_API_BASE_URL;
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
      <CardWithForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
