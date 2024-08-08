import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";

const LoginPage = () => {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("opndoctor2023!");
  const navigate = useNavigate();
  const { login } = useAuth();

  console.log(
    "LoginPage.js, process.env.REACT_APP_API_URL:",
    process.env.REACT_APP_API_BASE_URL
  );
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseURL + "auth/signin", {
        email,
        password,
      });
      login(response.data.access_token, response.data.refresh_token);
      console.log("LoginPage.js, response.data:", response.data);
      navigate("/property");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
