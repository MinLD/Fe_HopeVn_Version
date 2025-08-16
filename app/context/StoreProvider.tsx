"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type ContextType = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  isVerify: boolean;
  setIsVerify: React.Dispatch<React.SetStateAction<boolean>>;
  emailVerify: string;
  setEmailVerify: React.Dispatch<React.SetStateAction<string>>;

  IsOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
  isTypeSibar: string;
  setTypeSibar: React.Dispatch<React.SetStateAction<string>>;

  clearVerifyState: () => void;
};

type Props = {
  children: ReactNode;
};

export const StoreContext = createContext<ContextType | undefined>(undefined);

export function StoreProvider({ children }: Props) {
  const [isTypeSibar, setTypeSibar] = useState<string>("d");
  const [user, setUser] = useState<string>("Ahihi");
  const [IsOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const [isVerify, setIsVerify] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isVerify") === "true";
    }
    return false;
  });
  const [emailVerify, setEmailVerify] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("email") || "";
    }
    return "";
  });

  // Đồng bộ trạng thái với LocalStorage khi isVerify hoặc email thay đổi
  useEffect(() => {
    localStorage.setItem("isVerify", JSON.stringify(isVerify));
  }, [isVerify]);

  useEffect(() => {
    localStorage.setItem("email", emailVerify);
  }, [emailVerify]);

  // Hàm để xóa trạng thái khi hoàn tất verify hoặc logout
  const clearVerifyState = () => {
    setIsVerify(false);
    setEmailVerify("");
    localStorage.removeItem("isVerify");
    localStorage.removeItem("email");
  };

  return (
    <StoreContext.Provider
      value={{
        user,
        setUser,
        isVerify,
        setIsVerify,
        emailVerify,
        setEmailVerify,
        IsOpenMenu,
        setIsOpenMenu,
        clearVerifyState,
        isTypeSibar,
        setTypeSibar,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStateStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useUser must be used within a ContextProvider");
  }
  return context;
};
