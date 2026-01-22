import { createContext, useState, useEffect } from "react";
import { loginUser, fetchProfile, fetchAccounts } from "../api/accounts";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );
  const [loading, setLoading] = useState(true); // wait for profile fetch

  // ✅ Fetch profile if token exists (refresh-safe)
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const profile = await fetchProfile(token);
          setUser(profile);
        } catch (err) {
          console.error("Failed to fetch profile:", err);
          setToken(null);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (username, password, rememberMe) => {
    const { ok, data } = await loginUser(username, password, rememberMe);
    if (!ok)
      return { success: false, message: data?.message || "Login failed" };

    setToken(data.token);
    localStorage.setItem("token", data.token);

    setUser(data.user);

    if (data.user.role === "admin") {
      await fetchAccounts({ page: 1, pageSize: 5 });
    }

    return { success: true, user: data.user };
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
