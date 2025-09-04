import AvatarUploader from "@/app/components/AvartarUploader";
import AvatarProfile from "@/app/components/AvatarProfile";
import { AddMessageBox } from "@/app/service/message";
import { Ty_User } from "@/app/types/UserList";
import Button from "@/app/ui/Button";
import { Camera, Edit, MessageCircleMore } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const ProfileHeader: React.FC<{
  currentUser: Ty_User | null;
  isEditing?: boolean;
  formData: any;
  setFormData: (value: any) => void;
  handleSave?: (value: string) => void;
  handleCancel?: () => void;
  setIsEditing?: (value: boolean) => void;
  type?: string;
  token?: string;
}> = ({
  currentUser,
  isEditing = false,
  setIsEditing = () => {},
  formData = {},
  setFormData = () => {},
  handleSave = () => {},
  handleCancel = () => {},
  type,
  token = "",
}) => {
  const router = useRouter();
  const handleAddMessagerBox = async () => {
    if (!token) {
      router.push("/authenticate/loggin");
      toast.warning("Vui lòng đăng nhập");
      return;
    }
    try {
      const response = await AddMessageBox(
        token as string,
        currentUser?.email || ""
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/message");
        return;
      }
      toast.error(response.data.message);
      return;
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-green-500 to-green-600 h-32"></div>
      <div className="relative px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
          <div className="relative -mt-16 mb-4 sm:mb-0">
            <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <AvatarProfile
                name={currentUser?.profile?.fullName || ""}
                url={currentUser?.profile?.profilePicture?.url || ""}
                width="full"
                height="full"
              />
            </div>
            {type !== "profileUsers" && (
              <div className=" hover:cursor-pointer absolute bottom-2 right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-200">
                <AvatarUploader
                  formData={formData}
                  handleClose={handleCancel || undefined}
                  handleSave={() => handleSave || undefined}
                  setFormData={setFormData}
                >
                  <Camera className="h-4 w-4" />
                </AvatarUploader>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {currentUser?.profile?.fullName}
                </h1>
                <p className="text-gray-600">{currentUser?.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      currentUser?.roles[0].name === "admin"
                        ? "bg-red-100 text-red-800"
                        : currentUser?.roles[0].name === "business"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {currentUser?.roles[0].name}
                  </span>
                  {currentUser && (
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                      Đã xác minh
                    </span>
                  )}
                </div>
              </div>

              {type !== "profileUsers" ? (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-4 sm:mt-0 flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Edit className="h-4 w-4" />
                  <span>Chỉnh sửa hồ sơ</span>
                </button>
              ) : (
                <Button
                  icon={MessageCircleMore}
                  variant="outline"
                  size="sm"
                  className="mt-4 sm:mt-0 cursor-pointer"
                  onClick={() => handleAddMessagerBox()}
                >
                  Nhắn tin
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
