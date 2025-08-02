// File: app/zustand/userStore.tsx
// Mục đích: Quản lý trạng thái profile với Zustand, dùng cookie và initial data.
import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
interface ProfileState {
  isLoading: boolean;
  error: string | null;
  profileUser: ProfileUser | null;
  fetchProfile: (force?: boolean) => Promise<void>;
  initialize: (initialData: ProfileUser | null) => void; // Hàm khởi tạo từ server
}
export const useProfileStore = create<ProfileState>((set) => {
  // Lấy profile từ cookie khi khởi tạo
  const storedProfile = Cookies.get("profileUser");
  let initialProfile: ProfileUser | null = null; // Biến tạm để lưu profile parse.
  let initialRoles: string[] | null = null;
  if (storedProfile) {
    // Parse string từ cookie thành object.
    try {
      initialProfile = JSON.parse(storedProfile);
    } catch (error) {
      console.error("Lỗi parse profile từ cookie:", error);
      Cookies.remove("profileUser");
    }
    // Nếu lỗi (string không phải JSON), log lỗi và xóa cookie để tránh lặp lại.
  }

  return {
    //Khởi tạo state ban đầu với profileUser từ cookie.
    profileUser: initialProfile,
    isLoading: false,
    error: null,
    initialize: (initialData: ProfileUser | null) => {
      if (initialData) {
        set({ profileUser: initialData, isLoading: false, error: null });
        Cookies.set("profileUser", JSON.stringify(initialData));
      }
    },
    //Hàm để set profile từ dữ liệu ban đầu (từ server). Set state và lưu vào cookie với JSON.stringify(initialData).

    fetchProfile: async (force = false) => {
      set({ isLoading: true, error: null });
      try {
        let profile: ProfileUser | null = null;

        if (force || !initialProfile) {
          const token = Cookies.get("authToken");
          if (!token) throw new Error("No token found");

          const response = await axios.get(
            "http://localhost:3000/api/user/profile",
            {
              headers: {
                Cookie: `authToken=${token}`,
              },
            }
          );

          if (response.status !== 200) {
            throw new Error("Failed to fetch profile");
          }

          profile = response.data;
          Cookies.set("profileUser", JSON.stringify(profile));
        } else {
          profile = initialProfile;
        }

        set({ profileUser: profile, isLoading: false });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
        Cookies.remove("profileUser");
      }
    },

    //Hàm async để fetch profile
  };
});
