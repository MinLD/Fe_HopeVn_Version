import StompChat from "@/app/components/StompChat";
import { cookies } from "next/headers";

async function page() {
  const token = (await cookies()).get("authToken")?.value;
  return (
    <>
      {/* <RecruitmentPage token={token || ""} /> */}
      <StompChat token={token || ""} />
    </>
  );
}

export default page;
