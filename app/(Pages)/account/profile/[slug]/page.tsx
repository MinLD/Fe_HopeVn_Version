import ProfileUsersPages from "@/app/components/profileUsersPages";
import MyLayout from "@/app/Layout/MyLayOut";
import { GetProfileUsers } from "@/app/service/User";
import { Ty_User } from "@/app/types/UserList";
import { cookies } from "next/headers";

type Props = {
  params: { slug: string };
};
async function page({ params }: Props) {
  const token = await (await cookies()).get("authToken")?.value;
  const { slug } = params;
  const id = slug.split(".").pop();
  let userProfile: Ty_User | null = null;
  // Lấy dữ liệu trực tiếp trong Server Component
  try {
    const response = await GetProfileUsers(id as string);
    if (response.status === 200) {
      // Giả sử dữ liệu trả về nằm trong response.data.result
      // Dựa trên code của bạn, có thể là response.data.result.data
      userProfile = response.data.result;
    }
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    // Nếu có lỗi khi gọi API, cũng coi như không tìm thấy
  }

  return (
    <div>
      <MyLayout>
        <ProfileUsersPages initialProfile={userProfile} token={token || ""} />
      </MyLayout>
    </div>
  );
}

export default page;
