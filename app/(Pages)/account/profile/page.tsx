import ProfilePage from "@/app/components/profile/ProfilePage";
import { getDataCv, getInitialProfile } from "@/app/service/User";
import { Ty_Cv, Ty_User } from "@/app/types/UserList";
import { cookies } from "next/headers";

const page = async () => {
  const token = (await cookies()).get("authToken")?.value;
  let initialUser: Ty_User | null = null;
  let initialCv: Ty_Cv | null = null;
  try {
    const [user, cv] = await Promise.all([
      getInitialProfile(token),
      getDataCv(token || ""),
    ]);

    initialUser = (await user) || null;
    initialCv = (await cv.data.result.data) || null;
  } catch (error) {
    console.log(error);
  }

  // const profileUser: Ty_User | null = await getInitialProfile(token);
  // initialUser = (await profileUser) || null;

  return (
    <>
      <ProfilePage
        initialUser={initialUser || null}
        token={token || null}
        initialCv={initialCv}
      />
    </>
  );
};

export default page;
