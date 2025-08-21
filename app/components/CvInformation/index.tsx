// File: CvInformation.tsx
import Spanning from "@/app/components/Spanning";
import { dataUpdateCv } from "@/app/data";
import {
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ClipboardList,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  Sprout,
} from "lucide-react";

import React from "react";
import { FaWheelchair } from "react-icons/fa";

// Định nghĩa kiểu cho props của component
interface CvInformationProps {
  isEditing: boolean;
  formData: CvData;
  setFormData: React.Dispatch<React.SetStateAction<CvData>>;
  handleSave: (value: any) => void;
  handleCancel: () => void;
  isLoadingUpdateProfile: boolean;
}
export interface CvData {
  name: string;
  phone: string;
  email: string;
  address: string;
  dob: string; // Giữ kiểu string để tương thích với input type="date"
  skill: string;
  exp: string;
  education: string;
  typeOfDisability: string;
  typeOfJob: string;
}

export const CvInformation: React.FC<CvInformationProps> = ({
  isEditing,
  formData,
  setFormData,
  handleSave,
  handleCancel,
  isLoadingUpdateProfile,
}) => {
  // Gõ kiểu cho sự kiện onChange để nhận được gợi ý code
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: CvData) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Thông tin hồ sơ ứng viên
      </h2>

      {isEditing ? (
        // ================= CHẾ ĐỘ CHỈNH SỬA (Không thay đổi) =================
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataUpdateCv.map((item) => (
              <div key={item.id}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {item.label}
                </label>
                <input
                  type={item.type}
                  name={item.name}
                  value={formData[item.name as keyof CvData] || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1  gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kỹ năng
              </label>
              <textarea
                rows={3}
                name="skill"
                value={formData.skill || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kinh nghiệm
              </label>
              <textarea
                rows={3}
                name="exp"
                value={formData.exp || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Học vấn
              </label>
              <textarea
                rows={3}
                name="education"
                value={formData.education || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại khuyết tật (nếu có)
              </label>
              <textarea
                rows={3}
                name="typeOfDisability"
                value={formData.typeOfDisability || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại công việc mong muốn
              </label>
              <textarea
                rows={3}
                name="typeOfJob"
                value={formData.typeOfJob || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex space-x-4 pt-4 ">
            <button
              type="button"
              onClick={handleSave}
              className="hover:cursor-pointer  flex items-center  space-x-2  px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
            >
              {isLoadingUpdateProfile ? (
                <span className="flex items-center justify-center">
                  <Spanning />
                </span>
              ) : (
                <div className="flex items-center gap-2 justify-center">
                  <Save className="h-4 w-4" /> Lưu thay đổi
                </div>
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="hover:cursor-pointer flex items-center  space-x-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
              <span>Hủy bỏ</span>
            </button>
          </div>
        </form>
      ) : (
        // ================= CHẾ ĐỘ XEM THÔNG TIN (Đã cập nhật) =================

        <>
          {formData.email ? (
            <div className="space-y-4">
              {/* Thông tin cá nhân cơ bản */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  icon={<User />}
                  label="Họ và tên"
                  value={formData.name}
                />
                <InfoItem
                  icon={<Mail />}
                  label="E-mail"
                  value={formData.email}
                />
                <InfoItem
                  icon={<Phone />}
                  label="Số điện thoại"
                  value={formData.phone}
                />
                <InfoItem
                  icon={<MapPin />}
                  label="Địa chỉ"
                  value={formData.address}
                />
                <InfoItem
                  icon={<Calendar />}
                  label="Ngày sinh"
                  value={formData.dob}
                />
              </div>

              {/* Thông tin chuyên môn */}
              <div className="pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  icon={<ClipboardList />}
                  label="Kỹ năng"
                  value={formData.skill}
                  isTextArea
                />
                <InfoItem
                  icon={<Briefcase />}
                  label="Kinh nghiệm"
                  value={formData.exp}
                  isTextArea
                />
                <InfoItem
                  icon={<GraduationCap />}
                  label="Học vấn"
                  value={formData.education}
                  isTextArea
                />
                <InfoItem
                  icon={<FaWheelchair />}
                  label="Loại khuyết tật"
                  value={formData.typeOfDisability}
                  isTextArea
                />
                <InfoItem
                  icon={<HeartHandshake />}
                  label="Loại công việc mong muốn"
                  value={formData.typeOfJob}
                  isTextArea
                />
              </div>
            </div>
          ) : (
            <>
              {" "}
              <div className="flex flex-col justify-center items-center text-center p-10 bg-gray-50 rounded-lg">
                <Sprout
                  size={80}
                  color="#10B981"
                  strokeWidth={1.5}
                  className="mb-4 text-emerald-500"
                />
                <h2 className="text-2xl font-semibold text-gray-700">
                  Bạn chưa cập nhật hồ sơ xin việc
                </h2>
                <p className="text-gray-500 mt-2">
                  Vui lòng cập nhật thông tin để ứng tuyển việc làm.
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

// Định nghĩa kiểu cho props của component phụ InfoItem
interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string | null; // Value có thể là null hoặc undefined
  isTextArea?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({
  icon,
  label,
  value,
  isTextArea = false,
}) => (
  <div
    className={`flex space-x-3 ${isTextArea ? "col-span-1 md:col-span-2" : ""}`}
  >
    <div className="flex-shrink-0 h-5 w-5 text-gray-400">{icon}</div>
    <div className="w-full">
      <p className="text-sm text-gray-600">{label}</p>
      <p
        className={`font-medium text-gray-900 ${
          isTextArea ? "whitespace-pre-wrap" : ""
        }`}
      >
        {value || "Chưa cập nhật"}
      </p>
    </div>
  </div>
);
