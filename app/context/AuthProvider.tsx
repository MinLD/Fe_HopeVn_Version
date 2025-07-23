"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,

} from "react";

type ContextType = {
  sessionToken: string;
  setSessionToken: React.Dispatch<React.SetStateAction<string>>;
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<ContextType | undefined>(undefined);

export function AuthProvider({ children }: Props) {
  const [sessionToken, setSessionToken] = useState<string>("");

  return (
    <AuthContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context1 = useContext(AuthContext);
  if (!context1) throw new Error("useAuth must be used within a AuthProvider");
  return context1;
}
