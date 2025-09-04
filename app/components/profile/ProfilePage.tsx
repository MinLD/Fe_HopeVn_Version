"use client";
import React, { useEffect, useState } from "react";
import { ProfileHeader } from "@/app/components/ProfileHeader";
import { ProfileInformation } from "@/app/components/ProfileInformation";
import { QuickActions } from "@/app/components/QuickActions";

import { toast } from "sonner";
import { updateProfile } from "@/app/actions/updateProfile";
import CVBuilder from "@/app/components/BuilderCV";
import { Ty_Cv, Ty_User } from "@/app/types/UserList";
import { useProfileStore } from "@/app/zustand/userStore";

type ProfilePageProps = {
  initialCv?: Ty_Cv | null;
  initialUser?: Ty_User | null;
  token: string | null;
};
// Main Profile Page Component
const ProfilePage = ({ token }: ProfilePageProps) => {
  const [isTypeShowPage, setIsTypeShowPage] = useState<"profile" | "cv">(
    "profile"
  );
  const { profileUser, fetchProfile } = useProfileStore();
  const initialUser = profileUser;
  const [isLoadingUpdateProfile, setIsLoadingUpdateProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  // State để lưu danh sách CV từ API
  // const [cvList, setCvList] = useState<Ty_Cv[]>([]);
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
    await fetchProfile();

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

  // Hàm này sẽ được gọi từ CVBuilder để tạo mới CV
  // const handleCreateCv = async (
  //   newCvData: Omit<Ty_Cv, "id" | "createdAt" | "updatedAt">
  // ) => {
  //   try {
  //     setIsLoadingCv(true);
  //     const response = await CreateCv(token || "", newCvData as Ty_Cv); // Backend sẽ tự tạo ID và timestamp

  //     if (response.status !== 201 && response.status !== 200) {
  //       // Thường tạo mới trả về 201
  //       toast.error(response.data.message || "Failed to create CV");
  //       return;
  //     }

  //     toast.success(response.data.message || "CV created successfully!");

  //     // Sau khi tạo thành công, gọi lại API để lấy danh sách CV mới nhất
  //     await handleGetAllCv();
  //   } catch (error: any) {
  //     toast.error(error.response?.data?.message || "An error occurred");
  //   } finally {
  //     setIsLoadingCv(false);
  //   }
  // };
  // 2. Bọc hàm handleGetAllCv trong useCallback
  //    Hàm này sẽ chỉ được tạo lại khi `token` thay đổi.
  // const handleGetAllCv = useCallback(async () => {
  //   if (!token) return; // Thêm kiểm tra token cho an toàn
  //   try {
  //     const response = await getAllCv(token);
  //     if (response.status !== 200) {
  //       toast.error(response.data.message);
  //       return;
  //     }
  //     // Giả sử bạn có state setFormDataCv để lưu CV
  //     setCvList(response.data.result.data || []);
  //   } catch (error: any) {
  //     console.log(error.response.data.message);
  //   }
  // }, [token]); // Phụ thuộc vào token
  useEffect(() => {
    // Nếu initialUser có dữ liệu (sau khi fetch xong)
    if (initialUser) {
      // Cập nhật lại state của form cho khớp với dữ liệu mới
      setFormData({
        email: initialUser.email || "",
        fullName: initialUser.profile?.fullName || "",
        phone: initialUser?.phone || "",
        dob: initialUser.profile?.dob || "",
        address: initialUser.profile?.address || "",
        city: initialUser.profile?.city || "",
        bio: initialUser.profile?.bio || "",
        gender: initialUser.profile?.gender || "",
        profilePicture: initialUser.profile?.profilePicture?.url || "",
      });
    }
  }, [initialUser]);

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
            {isTypeShowPage === "cv" && <CVBuilder token={token || ""} />}
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
