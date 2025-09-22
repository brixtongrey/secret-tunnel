import { createContext, use, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");
  const [error, setError] = useState("");

  // TODO: signup
async function signup() {
  setError("");
  try {
    const { token } = await signup() // entrance()
    setToken(token)
    localStorage.setItem("token", token);
  } catch (error) {
    setError(error.message || "Sign up failed. Please try again.");
  }
}

  // TODO: authenticate
  async function authenticateUser() {
    setError("");
    try {
      if (!token) {throw new Error("No token found!");
      }
      await authenticateUser(token); // tablet()
    } catch (error) {
      setError(error.message || "Authentication failed. Please try again.");
    }
  }

  const value = { location };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
