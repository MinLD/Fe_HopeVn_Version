"use client";

import { useProfileStore } from "@/app/zustand/userStore";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation"; // Thêm import
import { Ty_profile_User } from "@/app/types/UserList";

interface Props {
  initialProfile: Ty_profile_User | null;
  token: string | null;
}

export default function ProfileClient({ initialProfile, token }: Props) {
  const router = useRouter();

  const { profileUser, isLoading, error, initialize } = useProfileStore();

  useEffect(() => {
    if (!token) {
      router.push("/login"); // Redirect nếu không có token
      return;
    }
    if (initialProfile) {
      initialize(initialProfile);
    } else {
      // Truyền token từ props
    }
  }, [initialize, initialProfile, token, router]);

  const displayProfile = profileUser || initialProfile;

  if (error) return <div>Lỗi: {error}</div>;
  if (!displayProfile && isLoading) {
    return (
      <div className="p-4">
        <Skeleton height={32} width={192} className="mb-4" />
        <Skeleton height={24} width={256} className="mb-2" />
        <Skeleton height={24} width={128} />
        <Skeleton height={40} width={96} className="mt-4" />
      </div>
    );
  }
  if (!displayProfile) return <div>Chưa có dữ liệu profile</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">
        Chào, {displayProfile.result.profile.fullName}
      </h2>
      <p>Email: {displayProfile.result.email}</p>
      <p>ID: {displayProfile.result.id}</p>
      <form action="/apiFe/logout" method="POST">
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
