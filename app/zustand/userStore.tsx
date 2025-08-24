"use client";
import { create } from "zustand";
import axios from "axios";
import { useEffect } from "react";
import { Ty_User } from "@/app/types/UserList";

interface ProfileState {
  isLoading: boolean;
  error: string | null;
  profileUser: Ty_User | null;
  fetchProfile: () => Promise<void>;
  initialize: (initialData: Ty_User | null) => void;
  refreshToken: () => Promise<void>; // Thêm hàm refresh
}

// Hàm khởi tạo store từ bên ngoài (dùng trong layout)
let store: any;

export const useProfileStore = create<ProfileState | any>((set) => {
  const state = {
    profileUser: null,
    isLoading: false,
    error: null,
    initialize: (initialData: Ty_User) => {
      if (initialData) {
        set({ profileUser: initialData, isLoading: false, error: null });
      }
    },
    fetchProfile: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.get("/apiFe/user/profile", {
          // API tự lấy token từ cookie
        });
        if (response.status !== 200) {
          if (response.status === 401) {
            // Tự động refresh nếu 401
            await state.refreshToken();
            // Fetch lại sau refresh
            const retryResponse = await axios.get("/apiFe/user/profile");
            if (retryResponse.status !== 200) {
              throw new Error("Failed to fetch profile after refresh");
            }
            set({ profileUser: retryResponse.data, isLoading: false });
          } else {
            throw new Error("Failed to fetch profile");
          }
        }
        set({ profileUser: response.data, isLoading: false });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },
    refreshToken: async () => {
      try {
        const response = await axios.post("/apiFe/refresh", {});
        if (response.status !== 200) {
          throw new Error("Refresh token failed");
        }
        console.log("Token refreshed");
      } catch (error: any) {
        console.error("Refresh token error:", error.message);
      }
    },
  };
  store = state; // Lưu trữ state để khởi tạo từ layout
  return state;
});

// Hàm khởi tạo store từ layout (SSR)
export const initializeProfileStore = (initialData: Ty_User | null) => {
  if (store && store.initialize) {
    store.initialize(initialData);
  }
};

// // Hook để tự động fetch khi mount
export const useAutoFetchProfile = () => {
  const { fetchProfile, profileUser, isLoading } = useProfileStore();
  useEffect(() => {
    if (!profileUser && !isLoading) {
      fetchProfile();
    }
  }, [fetchProfile, profileUser, isLoading]);
  return { profileUser, isLoading };
};
