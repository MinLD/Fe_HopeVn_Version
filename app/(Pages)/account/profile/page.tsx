import ProfilePage from "@/app/components/profile/ProfilePage";
import { getInitialProfile } from "@/app/service/User";
import { cookies } from "next/headers";

const page = async () => {
  const token = (await cookies()).get("authToken")?.value;
  let initialUser: Ty_User | null = null;

  const profileUser: Ty_User | null = await getInitialProfile(token);
  initialUser = (await profileUser) || null;

  return (
    <>
      <ProfilePage initialUser={initialUser || null}  token={token || null} />
    </>
  );
};

export default page;
