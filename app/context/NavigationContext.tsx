"use client";

import { usePathname } from "next/navigation";
import { createContext, useState, useEffect, ReactNode } from "react";

interface NavState {
  setOpenMenuHeaderTop: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenMenuHeaderTop: boolean;
  closeAll: () => void;
}

export const NavContext = createContext<NavState | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
  const [isOpenMenuHeaderTop, setOpenMenuHeaderTop] = useState<boolean>(false);
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const closeAll = () => {
    if (isOpenMenuHeaderTop) {
      setOpenMenuHeaderTop(false);
    }
  };

  useEffect(() => {
    closeAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <NavContext.Provider
      value={{
        isOpenMenuHeaderTop,
        setOpenMenuHeaderTop,
        closeAll,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}
