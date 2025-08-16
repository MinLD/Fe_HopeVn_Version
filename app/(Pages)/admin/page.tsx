import AdminPage from "@/app/componentAdmin/AdminPage";
import { cookies } from "next/headers";

async function page() {
  const token = (await cookies()).get("authToken")?.value;
  return (
    <>
      <AdminPage token={token} />
    </>
  );
}

export default page;
