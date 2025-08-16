export const Statistics: React.FC<{ currentUser: any; userStats: any }> = ({
  currentUser,
  userStats,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Thống kê</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tổng số đóng góp</span>
          <span className="font-semibold text-gray-900">
            {userStats.totalContributions}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tổng số tiền quyên góp</span>
          <span className="font-semibold text-green-600">
            ${userStats.totalDonated}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Mọi người đã giúp đỡ</span>
          <span className="font-semibold text-gray-900">
            {userStats.peopleHelped}
          </span>
        </div>

        {currentUser.role === "patient" && (
          <>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Help Requests</span>
              <span className="font-semibold text-gray-900">
                {userStats.helpRequestsCreated}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Products Listed</span>
              <span className="font-semibold text-gray-900">
                {userStats.productsListed}
              </span>
            </div>
          </>
        )}

        {currentUser.role === "business" && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Jobs Posted</span>
            <span className="font-semibold text-gray-900">
              {userStats.jobsPosted}
            </span>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Thành viên từ</span>
            <span className="font-semibold text-gray-900">
              {new Date(userStats.joinDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
