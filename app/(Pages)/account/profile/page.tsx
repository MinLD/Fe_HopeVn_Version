import ProfilePage from "@/app/components/profile/ProfilePage";
import { Metadata } from "next";

import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "Tài khoản",
};
const page = async () => {
  const token = (await cookies()).get("authToken")?.value;
  // let initialUser: Ty_User | null = null;
  // try {
  //   const [user, cv] = await Promise.all([
  //     getInitialProfile(token),
  //     getDataCv(token || ""),
  //   ]);

  //   initialUser = (await user) || null;
  //   initialCv = (await cv.data.result.data) || null;
  // } catch (error) {
  //   console.log(error);
  // }

  // const profileUser: Ty_User | null = await getInitialProfile(token);
  // initialUser = (await profileUser) || null;
  // console.log("initialUser", initialUser);

  return (
    <>
      <ProfilePage token={token || null} />
    </>
  );
};

export default page;
