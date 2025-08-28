import { DepositPage } from "@/app/components/deposit/DepositPage";
import MyLayout from "@/app/Layout/MyLayOut";
import { cookies } from "next/headers";

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
