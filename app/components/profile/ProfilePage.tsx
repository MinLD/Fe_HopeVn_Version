"use client";
import React, { useState } from "react";
import { ProfileHeader } from "@/app/components/ProfileHeader";
import { ProfileInformation } from "@/app/components/ProfileInformation";
import { QuickActions } from "@/app/components/QuickActions";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/app/actions/updateProfile";
import CVBuilder from "@/app/components/BuilderCV";
import { Ty_Cv, Ty_User } from "@/app/types/UserList";

type ProfilePageProps = {
  initialCv: Ty_Cv | null;
  initialUser: Ty_User | null;
  token: string | null;
};
// Main Profile Page Component
const ProfilePage = ({ initialUser, initialCv }: ProfilePageProps) => {
  const [isTypeShowPage, setIsTypeShowPage] = useState<"profile" | "cv">(
    "profile"
  );
  const [isLoadingUpdateProfile, setIsLoadingUpdateProfile] = useState(false);
  // const [isLoadingUpdateCv, setIsLoadingUpdateCv] = useState(false);
  console.log("Initial User:", initialUser);
  console.log("Initial Cv:", initialCv);
  const [isEditing, setIsEditing] = useState(false);

  // const [isEditingCv, setIsEditingCv] = useState(false);

  // console.log("isEditingCv", isEditingCv);

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
  // const [formDataCv, setFormDataCv] = useState<Ty_Cv>({
  //   name: initialCv?.name || "",
  //   phone: initialCv?.phone || "",
  //   email: initialCv?.email || "",
  //   address: initialCv?.address || "",
  //   dob: initialCv?.dob || "",
  //   skill: initialCv?.skill || "",
  //   exp: initialCv?.exp || "",
  //   education: initialCv?.education || "",
  //   typeOfDisability: initialCv?.typeOfDisability || "",
  //   typeOfJob: initialCv?.typeOfJob || "",
  // });

  // const userStats = mockUserStats; // Use fake stats
  // const achievements = mockAchievements; // Use fake achievements

  const handleSave = async () => {
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
  // const handleSaveCv = async () => {
  //   console.log(formDataCv);
  //   try {
  //     setIsLoadingUpdateCv(true);
  //     const response = await CreateCv(token || "", formDataCv);
  //     if (response.status !== 200) {
  //       toast.error(response.data.message);
  //       setIsEditingCv(false);
  //       setIsLoadingUpdateCv(false);
  //       return;
  //     }
  //     toast.success(response.data.message);
  //     setIsEditingCv(false);
  //     setIsLoadingUpdateCv(false);
  //     console.log(response);
  //   } catch (error: any) {
  //     console.log(error.response.data.message);
  //   } finally {
  //     setIsLoadingUpdateCv(false);
  //   }
  // };
  // const handleCancelCv = () => {
  //   setFormDataCv({
  //     name: initialCv?.name || "",
  //     phone: initialCv?.phone || "",
  //     email: initialCv?.email || "",
  //     address: initialCv?.address || "",
  //     dob: initialCv?.dob || "",
  //     skill: initialCv?.skill || "",
  //     exp: initialCv?.exp || "",
  //     education: initialCv?.education || "",
  //     typeOfDisability: initialCv?.typeOfDisability || "",
  //     typeOfJob: initialCv?.typeOfJob || "",
  //   });
  //   setIsEditingCv(false);
  // };
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
            {isTypeShowPage === "profile" && (
              <ProfileInformation
                isLoadingUpdateProfile={isLoadingUpdateProfile}
                isEditing={isEditing}
                formData={formData}
                setFormData={setFormData}
                handleSave={handleSave}
                handleCancel={handleCancel}
              />
            )}
            {isTypeShowPage === "cv" && <CVBuilder />}
            {/* <button
              onClick={() => setIsEditingCv(!isEditingCv)}
              className="mt-4 mb-5 sm:mt-0 flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Edit className="h-4 w-4" />
              <span>Chỉnh sửa hồ sơ ứng viên</span>
            </button> */}

            {/* <CvInformation
              isLoadingUpdateProfile={isLoadingUpdateCv}
              isEditing={isEditingCv}
              formData={formDataCv}
              setFormData={setFormDataCv as any}
              handleSave={handleSaveCv}
              handleCancel={handleCancelCv}
            /> */}
            {/* <Achievements achievements={achievements} /> */}
          </div>

          <div className="lg:col-span-1">
            {/* <Statistics currentUser={currentUser} userStats={userStats} /> */}
            <QuickActions setTypeShowPage={setIsTypeShowPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
