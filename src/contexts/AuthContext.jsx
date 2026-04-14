import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.log("Error parsing user data:", e);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("Login successful:", data.user);
        return { success: true };
      } else {
        console.log("Login failed:", data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.log("Login error:", error);
      return { success: false, error: "Ошибка подключения к серверу" };
    }
  };

  const signup = async (username, password, telegramUsername = null) => {
    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, telegramUsername }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("Signup successful:", data.user);
        return { success: true };
      } else {
        console.log("Signup failed:", data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.log("Signup error:", error);
      return { success: false, error: "Ошибка подключения к серверу" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

