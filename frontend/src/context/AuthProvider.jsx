import { createContext, useState } from "react";
import { loginUser, fetchProfile } from "../api/accounts";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  const login = async (username, password) => {
    const { ok, data } = await loginUser(username, password);
    if (!ok) return;
  };
  return <div>AuthProvider</div>;
}

export default AuthProvider;
