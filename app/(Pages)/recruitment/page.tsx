import RecruitmentPage from "@/app/components/recruitmentPage";
import { cookies } from "next/headers";

async function page() {
  const token = (await cookies()).get("authToken")?.value;
  return (
    <>
      <RecruitmentPage token={token || ""} />
    </>
  );
}

export default page;
