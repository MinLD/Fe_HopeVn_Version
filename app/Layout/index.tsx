"use client";
import MyFooter from "@/app/Layout/Footer";
import MyHeader from "@/app/Layout/Header";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  token?: string | null;
};

export default function Layout({ token = "", children }: Props) {
  const pathname = usePathname();
  const excludedPages = ["/admin", "/employer"];
  const isExcludedPage = excludedPages.some(
    (page) => pathname === page || pathname.startsWith(page)
  );

  return (
    <>
      {!isExcludedPage && <MyHeader token={token} />}
      {children}
      {!isExcludedPage && <MyFooter />}
    </>
  );
}
