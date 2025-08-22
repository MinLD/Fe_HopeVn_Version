import Spanning from "@/app/components/Spanning";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export interface Ty_Company {
  id: string;
  name: string;
  description: string;
  industry: string;
  website: string;
  phoneNumber: string;
  email: string;
  address: string;
  size: "Small" | "Medium" | "Large";
  companyImage?: string; // URL của hình ảnh công ty
  taxCode: string;
  registrationDate: string; // Ngày đăng ký, ví dụ: '09/08/2025'
  isLoading: boolean;
  handeActive: (value: string) => void;
}

export interface Ty_PostVolunteer {
  like: number;
  id: number;
  title: string;
  content: string;
  location: string;
  fund: string;
  status: string;
  totalAmount: number;
  createAt: string;
  stk: string;
  bankName: string;
  files: [
    {
      url: string;
    }
  ];
  active: boolean;
  userId: string;
  userPic: string;
  name: string;
}

const PendingCompanyCard = ({
  id,
  isLoading,
  name,
  description,
  industry,
  website,
  phoneNumber,
  email,
  address,
  size,
  companyImage,
  taxCode,
  registrationDate,
  handeActive,
}: Ty_Company) => {
  const handleApprove = () => {
    handeActive(id);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between ">
        <h2 className="text-lg font-bold text-gray-900 sm:text-xl">{name}</h2>
        <span className="px-2 py-2 bg-red-100 text-red-600 text-xs font-medium rounded-full mb-2 text-center">
          Đang chờ xét duyệt
        </span>
      </div>
      <div className="mt-2 flex flex-col sm:flex-row sm:items-center text-sm text-gray-600">
        <span className="mr-2 mb-2 sm:mb-0">{industry}</span>
        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
          Quy mô:{" "}
          {size === "Small" ? "Nhỏ" : size === "Medium" ? "Trung bình" : "Lớn"}
        </span>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
        {companyImage && (
          <Image
            width={100}
            height={100}
            src={companyImage}
            alt={`Hình ảnh ${name}`}
            className="w-16 h-16 object-cover rounded-md sm:w-20 sm:h-20"
          />
        )}
        <div className="flex-1">
          <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
          <div className="mt-2 text-sm text-gray-600 space-y-1">
            <p>
              <strong>Website:</strong> {website || "Chưa có"}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {phoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {address}
            </p>
            <p>
              <strong>Mã số thuế:</strong> {taxCode}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <span>📍 {address.split(", ").pop() || "Hà Nội"}</span>
        <span className="sm:mx-2">🗓 {registrationDate}</span>
        {/* <span>📝 0 hồ sơ chờ duyệt khác</span> */}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700">Yêu cầu xét duyệt:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            Thông tin đầy đủ
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            Mã số thuế hợp lệ
          </span>
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleApprove}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <Spanning />
          ) : (
            <>
              {" "}
              <CheckCircleIcon className="h-5 w-5" />
            </>
          )}
          Phê duyệt
        </button>

        {/* <button
          onClick={handleSave}
          className="flex-1 px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50 focus:outline-none"
        >
          Lưu
        </button>
        <button
          onClick={handleShare}
          className="flex-1 px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50 focus:outline-none"
        >
          Chia sẻ
        </button> */}
      </div>
    </div>
  );
};

export default PendingCompanyCard;
