import React, { createContext, useContext, useState } from "react";

// 인증 컨텍스트 생성
const AuthContext = createContext();

// 인증 컨텍스트 제공자 컴포넌트
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );
  
  const login = (accessToken, refreshToken) => {
    console.log("login, accessToken:", accessToken);
    console.log("login, refreshToken:", refreshToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 인증 컨텍스트 훅
export const useAuth = () => {
  return useContext(AuthContext);
};
