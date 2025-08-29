import Login from "@/app/components/login/Login";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Đăng nhập",
};

function page() {
  return <Login />;
}

export default page;
