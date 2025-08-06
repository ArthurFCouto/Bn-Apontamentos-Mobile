import { createContext, ReactNode, useEffect, useState } from "react";
import { authClient } from "../clients/auth";
import { User } from "../types/user";

type AuthStatus = "loading" | "auth" | "unauth";

interface AuthContextType {
  status: AuthStatus;
  setStatus: (newStatus: AuthStatus) => void;
  user?: User;
  checkAuthStatus: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<User>();
  const checkAuthStatus = async () => {
    const response = await authClient.getUser();
    setStatus(response.error ? "unauth" : "auth");
    setUser(response.user);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const contextValue = {
    status,
    setStatus,
    user,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
