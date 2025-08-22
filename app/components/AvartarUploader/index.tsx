"use client";

import { updateProfile } from "@/app/actions/updateProfile";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
  handleSave: (value?: string | "") => void;
  handleClose: () => void;
  setFormData: (value: any) => void;
  formData: any;
};

const AvatarUploader = ({
  children,
  handleClose,
  setFormData,
  formData,
}: Props) => {
  const [image, setImage] = useState<string | null>(null);
  const [isLoadingUpdateProfile, setIsLoadingUpdateProfile] = useState(false);

  const router = useRouter();

  const handleCropComplete = async () => {
    const formDataUpdated = new FormData();

    // Append form fields
    formDataUpdated.append("fullName", formData.fullName);
    formDataUpdated.append("phone", formData.phone);
    formDataUpdated.append("dob", formData.dob);
    formDataUpdated.append("address", formData.address);
    formDataUpdated.append("city", formData.city);
    formDataUpdated.append("bio", formData.bio);
    formDataUpdated.append("gender", formData.gender);

    // Append the actual File object (not the blob URL)
    if (formData.profilePicture instanceof File) {
      formDataUpdated.append("profilePicture", formData.profilePicture);
    }

    // Debugging: Log FormData entries
    formDataUpdated.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    setIsLoadingUpdateProfile(true);

    try {
      // Call Server Action
      const result = await updateProfile(formDataUpdated);

      if (!result.success) {
        console.error("Update profile failed:", result.message);
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.refresh(); // Trigger refetch
      console.log("Called router.refresh()");
      window.location.reload();
      handleClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoadingUpdateProfile(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              // Store the File object in formData
              setFormData({
                ...formData,
                profilePicture: file, // Store the File object, not the blob URL
              });
              // Create a blob URL for previewing the image
              setImage(URL.createObjectURL(file));
            }
          }}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        {children}
      </div>

      {image && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center relative max-w-md w-full">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Chọn ảnh đại diện
              </h2>
            </div>
            <button
              onClick={() => setImage(null)}
              className="absolute top-4 right-4 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
            >
              <X size={24} color="black" />
            </button>

            <Image
              width={600}
              height={600}
              src={image}
              alt="Crop"
              className="max-w-full w-[600px] h-auto"
            />

            <div className="flex justify-end gap-3 mt-4 w-full">
              <button
                onClick={handleCropComplete}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={isLoadingUpdateProfile}
              >
                {isLoadingUpdateProfile ? "Đang cập nhật" : "Gửi"}
              </button>

              <button
                onClick={() => setImage(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarUploader;
