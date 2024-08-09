import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";
import { CardWithForm } from "./CardWithForm";
const LoginPage = () => {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("opndoctor2023!");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  console.log(
    "LoginPage.js, process.env.REACT_APP_API_URL:",
    process.env.REACT_APP_API_BASE_URL
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/property");
    }
  }, [isAuthenticated, navigate]);

  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseURL + "auth/signin", {
        email,
        password,
      });
      login(response.data.access_token, response.data.refresh_token);
      alert("로그인 성공");
      console.log("LoginPage.js, response.data:", response.data);
      navigate("/property");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <CardWithForm email={email} password={password} onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
