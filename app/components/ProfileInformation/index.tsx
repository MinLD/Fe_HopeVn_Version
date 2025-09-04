import Spanning from "@/app/components/Spanning";
import { dataUpdateProfile } from "@/app/data";
import {
  Building2,
  Cake,
  Calendar,
  Mail,
  MapPinHouse,
  Save,
  Transgender,
  User,
  X,
} from "lucide-react";

export const ProfileInformation: React.FC<{
  isLoadingUpdateProfile?: boolean;
  isEditing?: boolean;
  formData: any;
  setFormData?: (value: any) => void;
  handleSave?: () => void;
  handleCancel?: () => void;
  type?: string;
}> = ({
  isEditing = false,
  formData,
  setFormData = () => {},
  handleSave = () => {},
  handleCancel = () => {},
  isLoadingUpdateProfile,
}) => {
  const dataGender = [
    {
      id: 0,
      label: "Nam",
    },
    {
      id: 1,
      label: "Nữ",
    },
    {
      id: 2,
      label: "Khác",
    },
  ];
  console.log("formData", formData);
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Thông tin hồ sơ
      </h2>

      {isEditing ? (
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataUpdateProfile.map((item) => (
              <div key={item?.id}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {item?.label}
                </label>
                {item.id !== 6 ? (
                  <>
                    <input
                      disabled={item.id === 1 ? true : false}
                      type={item?.type}
                      value={formData[item.name]}
                      onChange={(e) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          [item.name]: e.target.value,
                        }))
                      }
                      className={`${
                        item.id === 1 ? "cursor-not-allowed" : ""
                      } w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500`}
                    />
                  </>
                ) : (
                  <div className="flex space-x-3">
                    {dataGender.map((gender) => (
                      <div
                        key={gender.id}
                        className="flex items-center gap-1 hover:cursor-pointer"
                      >
                        <input
                          type="radio" // Đảm bảo type là radio
                          id={gender.label}
                          name={item.name}
                          value={gender.label} // Sử dụng gender.label làm value
                          checked={formData[item.name] === gender.label}
                          onChange={(e) =>
                            setFormData((prev: any) => ({
                              ...prev,
                              [item.name]: e.target.value,
                            }))
                          }
                          className="hover:cursor-pointer w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                        />
                        <label
                          htmlFor={gender.label}
                          className="hover:cursor-pointer"
                        >
                          {gender.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}{" "}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả
            </label>
            <textarea
              rows={4}
              value={formData["bio"]}
              onChange={(e) =>
                setFormData((prev: any) => ({ ...prev, bio: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Lưu thay đổi */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={handleSave}
              className="hover:cursor-pointer flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
            >
              <span>
                {isLoadingUpdateProfile ? (
                  <>
                    {" "}
                    <Spanning />{" "}
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    {" "}
                    <Save className="h-4 w-4" /> Lưu thay đổi
                  </div>
                )}{" "}
              </span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="hover:cursor-pointer flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
              <span>Hủy bỏ</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Họ và tên đầy đủ</p>
                <p className="font-medium text-gray-900">{formData.fullName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">E-mail</p>
                <p className="font-medium text-gray-900">{formData.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Điện thoại</p>
                <p className="font-medium text-gray-900">{formData.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Transgender className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Giới tính</p>
                <p className="font-medium text-gray-900">{formData.gender}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Cake className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Ngày sinh</p>
                <p className="font-medium text-gray-900">{formData.dob}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPinHouse className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Địa chỉ</p>
                <p className="font-medium text-gray-900">{formData.address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Building2 className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Thành phố</p>
                <p className="font-medium text-gray-900">{formData.city}</p>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Mô tả</p>
            <p className="text-gray-900">{formData.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
};
