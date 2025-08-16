import EmployerPage from "@/app/componentEmployer/EmployerPage";
import { cookies } from "next/headers";

async function page() {
  const token = (await cookies()).get("authToken")?.value;
  return (
    <div>
      <EmployerPage token={token || ""} />
    </div>
  );
}

export default page;
