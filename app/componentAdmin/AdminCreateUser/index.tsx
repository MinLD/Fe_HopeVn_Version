import Spanning from "@/app/components/Spanning";
import { CreateUsers } from "@/app/service/admin";
import { Eye, EyeClosed, X } from "lucide-react";
import { useState } from "react";

import { toast } from "sonner";

type Props = {
  setClose: () => void;
  token: string;
  handleGetAllUsers: () => void;
};

function AdminCreateUser({ setClose, token, handleGetAllUsers }: Props) {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    role: "USER",
  });
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "email",
      disabled: false,
    },
    {
      id: 2,
      name: "fullName",
      type: "text",
      placeholder: "Họ và tên",
      disabled: false,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Mật khẩu",
      disabled: false,
    },
  ];
  const [loading, setLoading] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<string>("password");
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Kiểm tra độ dài mật khẩu
    if (
      !formData.email ||
      !formData.fullName ||
      !formData.password ||
      !formData.role
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      setLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      toast.error("mật khẩu phải ít nhất 8 ký tự");
      setLoading(false);
      return;
    }

    if (Object.keys(formData).length > 0) {
      setLoading(true);
      console.log(formData);
      await CreateUsers(token as string, formData)
        .then(async (res) => {
          await handleGetAllUsers();
          console.log(res);
          toast.success("Thêm người dùng thành công!");
          setClose();
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          console.log(error);
          setLoading(false);
        });
    } else {
      toast.warning("No changes made.");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between ">
        {" "}
        <h2 className="text-xl font-bold ">Thêm người dùng</h2>
        <X
          size={35}
          color="#afacac"
          strokeWidth={0.5}
          onClick={() => setClose()}
          className="hover:cursor-pointer"
        />
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 ">
        {inputs.map((input) => (
          <div key={input.id} className="relative">
            <input
              type={input?.type === "password" ? isShow : input.type}
              name={input.name}
              placeholder={input.placeholder}
              value={formData[input.name as keyof typeof formData]}
              className="h-[50px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
              onChange={(e) => handleChange(input.name, e.target.value)}
              disabled={input.disabled}
            />
            <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
              {input.name}
            </p>

            {input?.type === "password" && (
              <div className="absolute top-[50%] right-3 -translate-y-[50%] transform">
                {isShow === "password" ? (
                  <span
                    className="cursor-pointer"
                    onClick={() => setIsShow("text")}
                  >
                    <EyeClosed />
                  </span>
                ) : (
                  <span
                    className="cursor-pointer"
                    onClick={() => setIsShow("password")}
                  >
                    <Eye />
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
        <div className="relative">
          <select
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            className="h-[50px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
          >
            <option value="USER">USER</option>
            <option value="SELLER">SELLER</option>
            <option value="EMPLOYER">EMPLOYER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
            Chọn Roles
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-5 gap-2 items-center  ">
        <div className="text-[#3c3c3c] hover:cursor-pointer" onClick={setClose}>
          Cancel
        </div>
        <button
          className="bg-[#3c3c3c] text-white p-3 rounded-md hover:cursor-pointer"
          onClick={handleSubmit}
        >
          {loading ? <Spanning /> : "Save"}
        </button>
      </div>
    </div>
  );
}

export default AdminCreateUser;
