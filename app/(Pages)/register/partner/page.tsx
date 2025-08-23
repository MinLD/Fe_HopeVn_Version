import CompanyForm from "@/app/components/ComponentForm";
import { cookies } from "next/headers";

async function page() {
  const token = (await cookies()).get("authToken")?.value;
  return (
    <div>
      <CompanyForm token={token || ""} />
    </div>
  );
}

export default page;
