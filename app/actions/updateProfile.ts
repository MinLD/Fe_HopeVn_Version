// actions/updateProfile.ts
"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { UpdateProfileUser, profileCache } from "@/app/service/User"; // Import thêm profileCache nếu cần

export async function updateProfile(formData: FormData) {
  const token = (await cookies()).get("authToken")?.value;
  if (!token) {
    return { success: false, message: "No auth token found" };
  }
  console.log("Token trong updateProfile: actions", token);

  try {
    const response = await UpdateProfileUser(formData, token); // Gọi trực tiếp, bỏ fetch
    console.log(
      "Response từ UpdateProfileUser:",
      JSON.stringify(response.data)
    );

    profileCache.delete(token); // Xóa cache ở đây
    revalidatePath("/profile"); // Revalidate nếu cần

    return {
      success: true,
      message: "Profile updated successfully",
      data: response.data, // Giả sử response có data
    };
  } catch (error: any) {
    console.error("Lỗi update:", error.message);
    return { success: false, message: "Update failed" };
  }
}
