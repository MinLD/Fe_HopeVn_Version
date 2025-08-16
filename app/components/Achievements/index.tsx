export const Achievements: React.FC<{ achievements: any[] }> = ({
  achievements,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${
                achievement.earned
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.earned
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3
                    className={`font-medium ${
                      achievement.earned ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {achievement.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      achievement.earned ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
