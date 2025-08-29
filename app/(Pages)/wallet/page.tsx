import { DepositPage } from "@/app/components/deposit/DepositPage";
import MyLayout from "@/app/Layout/MyLayOut";
import { Metadata } from "next";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "Ví - Nạp tiền",
};
async function page() {
  const token = (await cookies()).get("authToken")?.value;
  return (
    <div>
      <MyLayout>
        {" "}
        <DepositPage token={token || ""} />;
      </MyLayout>
    </div>
  );
}

export default page;
