// File: app/profile/page.client.tsx
// Mục đích: Client Component quản lý profile với Zustand, dùng Skeleton UI.

"use client";

import { useProfileStore } from "@/app/zustand/userStore";
import { useEffect } from "react";

import Skeleton from "react-loading-skeleton"; // Import Skeleton
import "react-loading-skeleton/dist/skeleton.css"; // Import CSS của Skeleton

interface Props {
  initialProfile: ProfileUser | null;
}
// Giải thích: Định nghĩa kiểu props nhận từ Server Component (initialProfile). Vai trò: Nhận dữ liệu ban đầu từ server.

export default function ProfileClient({ initialProfile }: Props) {
  const { fetchProfile, profileUser, isLoading, error, initialize } =
    useProfileStore();

  useEffect(() => {
    if (initialProfile) {
      initialize(initialProfile);
    } else {
      fetchProfile();
    }
  }, [fetchProfile, initialize, initialProfile]);
  //Chạy khi component mount. Nếu có initialProfile từ server,
  // gọi initialize để set vào store. Nếu không, gọi fetchProfile
  //  để lấy từ API. Vai trò: Khởi tạo dữ liệu ngay, tránh nhấp nháy.

  const displayProfile = profileUser || initialProfile;

  if (error) return <div>Lỗi: {error}</div>;
  if (!displayProfile && isLoading) {
    return (
      <div className="p-4">
        <Skeleton height={32} width={192} className="mb-4" />{" "}
        {/* Skeleton cho tên */}
        <Skeleton height={24} width={256} className="mb-2" />{" "}
        {/* Skeleton cho email */}
        <Skeleton height={24} width={128} /> {/* Skeleton cho ID */}
        <Skeleton height={40} width={96} className="mt-4" />{" "}
        {/* Skeleton cho nút */}
      </div>
    );
  }
  if (!displayProfile) return <div>Chưa có dữ liệu profile</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">
        Chào, {displayProfile?.result?.profile?.fullName}
      </h2>
      <p>Email: {displayProfile?.result?.email}</p>
      <p>ID: {displayProfile?.result?.id}</p>
      <p>Roles: {displayProfile?.result?.roles[0]?.name}</p>
      <form action="/api/logout" method="POST">
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Đăng xuất
        </button>
      </form>
    </div>
  );
}
