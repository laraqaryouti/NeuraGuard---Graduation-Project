import React, { createContext, useContext, useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));

  const login = async (credentials) => {
    try {
      const response = await api.post("/auth/token", formBody.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const token = response.data.access_token;
      if (token) {
        localStorage.setItem("token", token);
        setAuthToken(token);
        return token;
      }
      throw new Error("Authentication failed");
    } catch (error) {
      console.error("Login failed:", error.response.data.detail);
      alert(error.response.data.detail);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
