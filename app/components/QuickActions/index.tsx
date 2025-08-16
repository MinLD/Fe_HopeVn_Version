export const QuickActions: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Hành động nhanh
      </h2>
      <div className="space-y-3">
        <button className="w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200">
          Xem đóng góp của tôi
        </button>
        <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200">
          Tải xuống Biên lai
        </button>
        <button className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          Cài đặt quyền riêng tư
        </button>
        <button className="w-full text-left px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200">
          Xóa tài khoản
        </button>
      </div>
    </div>
  );
};
