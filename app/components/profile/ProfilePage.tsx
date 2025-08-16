"use client";
import React, { useState } from "react";
import { Shield, Award, Heart, DollarSign } from "lucide-react";
import { ProfileHeader } from "@/app/components/ProfileHeader";
import { ProfileInformation } from "@/app/components/ProfileInformation";
import { Achievements } from "@/app/components/Achievements";
import { Statistics } from "@/app/components/Statistics";
import { QuickActions } from "@/app/components/QuickActions";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/app/actions/updateProfile";

// Mock fake data for user profile
const mockUser = {
  id: "user123",
  name: "John Doe",
  email: "john.doe@example.com",
  role: "patient",
  verified: true,
  createdAt: "2024-01-01T00:00:00Z",
};

// Additional fake data for statistics
const mockUserStats = {
  totalContributions: 15,
  totalDonated: 1250.75,
  helpRequestsCreated: 3, // For patient role
  jobsPosted: 0, // For business role
  productsListed: 12, // For patient role
  peopleHelped: 23,
  joinDate: "2024-01-01T00:00:00Z",
};

// Fake achievements data
const mockAchievements = [
  {
    icon: Heart,
    title: "Compassionate Helper",
    description: "Made 10+ contributions",
    earned: true,
  },
  {
    icon: DollarSign,
    title: "Generous Donor",
    description: "Donated over $1,000",
    earned: true,
  },
  {
    icon: Award,
    title: "Community Champion",
    description: "Helped 20+ people",
    earned: true,
  },
  {
    icon: Shield,
    title: "Trusted Member",
    description: "Account verified",
    earned: true,
  },
  {
    icon: Heart,
    title: "Newbie Helper",
    description: "Made first contribution",
    earned: true,
  }, // Added extra fake achievement
  {
    icon: Award,
    title: "Super Helper",
    description: "Helped 50+ people",
    earned: false,
  }, // Added extra fake achievement
];

type ProfilePageProps = {
  initialUser: Ty_User | null;
  token: string | null;
};
// Main Profile Page Component
const ProfilePage = ({ initialUser, token }: ProfilePageProps) => {
  const [isLoadingUpdateProfile, setIsLoadingUpdateProfile] = useState(false);
  console.log("Initial User:", initialUser);
  const currentUser = initialUser || mockUser;
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: initialUser?.email || "",
    fullName: initialUser?.profile?.fullName || "",
    phone: initialUser?.phone || "",
    dob: initialUser?.profile?.dob || "",
    address: initialUser?.profile?.address || "",
    city: initialUser?.profile?.city || "",
    bio: initialUser?.profile?.bio || "",
    gender: initialUser?.profile?.gender || "",

    profilePicture: initialUser?.profile?.profilePicture?.url || "",
  });
  const userStats = mockUserStats; // Use fake stats
  const achievements = mockAchievements; // Use fake achievements

  const handleSave = async (img?: string | "") => {
    const formDataUpdated = new FormData();
    formDataUpdated.append("fullName", formData.fullName);
    formDataUpdated.append("phone", formData.phone);
    formDataUpdated.append("dob", formData.dob);
    formDataUpdated.append("address", formData.address);
    formDataUpdated.append("city", formData.city);
    formDataUpdated.append("bio", formData.bio);
    formDataUpdated.append("gender", formData.gender);

    formDataUpdated.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    setIsLoadingUpdateProfile(true);
    // Gọi Server Action
    // Nếu dùng Server Action:
    const result = await updateProfile(formDataUpdated);

    if (!result.success) {
      console.error("Update profile failed:", result.message);
      toast.error(result.message);
      setIsLoadingUpdateProfile(false);
      return;
    }

    toast.success(result.message);
    setIsEditing(false);
    setIsLoadingUpdateProfile(false);
    router.refresh(); // Trigger refetch
    console.log("Đã gọi router.refresh()");
    window.location.reload();

    // await fetch("/api/user/update-profile", {
    //   method: "PUT",
    //   body: formDataUpdated,
    //   headers: { Authorization: `Bearer ${token || ""}` },
    //   credentials: "include", // Thêm dòng này để bao gồm cookie
    // })
    //   .then((response) => {
    //     console.log(response);
    //     setIsLoadingUpdateProfile(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setIsLoadingUpdateProfile(false);
    //   });
  };
  const handleCancel = () => {
    setFormData({
      email: initialUser?.email || "",
      fullName: initialUser?.profile?.fullName || "",
      phone: initialUser?.phone || "",
      dob: initialUser?.profile?.dob || "",
      address: initialUser?.profile?.address || "",
      city: initialUser?.profile?.city || "",
      bio: initialUser?.profile?.bio || "",
      gender: initialUser?.profile?.gender || "",

      profilePicture: initialUser?.profile?.profilePicture?.url || "",
    });
    setIsEditing(false);
  };
  if (isLoadingUpdateProfile) {
    console.log("Loading...");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader
          formData={formData}
          currentUser={initialUser || null}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setFormData={setFormData}
          handleSave={() => handleSave()}
          handleCancel={handleCancel}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProfileInformation
              isLoadingUpdateProfile={isLoadingUpdateProfile}
              isEditing={isEditing}
              formData={formData}
              setFormData={setFormData}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
            <Achievements achievements={achievements} />
          </div>

          <div className="lg:col-span-1">
            <Statistics currentUser={currentUser} userStats={userStats} />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
