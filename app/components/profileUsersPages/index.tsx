"use client";
import { ProfileHeader } from "@/app/components/ProfileHeader";
import { ProfileInformation } from "@/app/components/ProfileInformation";
import { Ty_User } from "@/app/types/UserList";
import { useState } from "react";

type Props = {
  initialProfile: Ty_User | null;
  token: string | null;
};
function ProfileUsersPages({ initialProfile, token }: Props) {
  console.log("initialProfile", initialProfile);
  const initialUser = initialProfile;
  const [formData, setFormData] = useState({
    email: initialUser?.email || "",
    fullName: initialUser?.profile?.fullName || "",
    phone: initialUser?.profile?.phone || "",
    dob: initialUser?.profile?.dob || "",
    address: initialUser?.profile?.address || "",
    city: initialUser?.profile?.city || "",
    bio: initialUser?.profile?.bio || "",
    gender: initialUser?.profile?.gender || "",

    profilePicture: initialUser?.profile?.profilePicture?.url || "",
  });
  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 `}>
        <ProfileHeader
          formData={formData}
          currentUser={initialUser || null}
          setFormData={setFormData}
          type="profileUsers"
          token={token || ""}
        />

        <div className="">
          <ProfileInformation formData={formData} />
        </div>
      </div>
    </div>
  );
}

export default ProfileUsersPages;
