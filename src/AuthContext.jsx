import { createContext, use, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
const signup = async () => {
  try {
    const response = await fetch(`${API}/signup`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
    });
    const result = await response.json();
    setToken(result.token);
    setLocation("TABLET");
  } catch (error) {
    console.error("Error during sign up", error);
  }
}

  // TODO: authenticate
const authenticate = async() => {
  try {
    if (!token) throw Error("No token found.");
    const response = await fetch(`{API}/authenticate`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    if (!response.ok) throw Error(`Authentication failed: ${response.status}`);
    setLocation("TUNNEL");
  } 
  catch (error) {
    console.error("Error during authentication", error);
  }
}

  const value = { signup, authenticate, location };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
