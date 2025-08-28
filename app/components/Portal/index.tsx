// components/Portal.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
type layoutProps = {
  children: React.ReactNode;
};
const Portal = ({ children }: layoutProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Trả về một hàm cleanup để unmount khi component bị hủy
    return () => setMounted(false);
  }, []);

  // Chỉ render portal ở phía client và sau khi component đã được mount
  return mounted
    ? createPortal(children, document.querySelector("#modal-root")!)
    : null;
};

export default Portal;
