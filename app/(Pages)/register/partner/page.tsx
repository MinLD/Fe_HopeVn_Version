import CompanyForm from "@/app/components/ComponentForm";
import { Metadata } from "next";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "Đối tác",
};
async function page() {
  const token = (await cookies()).get("authToken")?.value;
  return (
    <div>
      <CompanyForm token={token || ""} />
    </div>
  );
}

export default page;
