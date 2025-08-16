import Spanning from "@/app/components/Spanning";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { CreateJobsCategory } from "@/app/service/employer";

type Props = {
  setClose: () => void;
  token: string;
  handleGetAllCategories: () => void;
};

function EmployerCreateCategory({
  setClose,
  token,
  handleGetAllCategories,
}: Props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Tên danh mục",
      disabled: false,
    },
    {
      id: 2,
      name: "description",
      type: "textarea",
      placeholder: "Mô tả",
      disabled: false,
    },
  ];

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!formData.name || !formData.description) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      setLoading(false);
      return;
    }

    try {
      const response = await CreateJobsCategory(token, formData);

      if (response.status !== 200) {
        toast.error(response?.data?.message || "Có lỗi xảy ra!");
        console.error(response);
      }
      await handleGetAllCategories();
      toast.success("Thêm danh mục thành công!");
      setClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Có lỗi xảy ra!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Thêm danh mục công việc</h2>
        <X
          size={35}
          color="#afacac"
          strokeWidth={0.5}
          onClick={() => setClose()}
          className="hover:cursor-pointer"
        />
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-1 gap-2">
        {inputs.map((input) => (
          <div key={input.id} className="relative">
            {input.type === "textarea" ? (
              <textarea
                name={input.name}
                placeholder={input.placeholder}
                value={formData[input.name as keyof typeof formData]}
                className="h-[100px] p-2 pt-6 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
                onChange={(e) => handleChange(input.name, e.target.value)}
                disabled={input.disabled}
              />
            ) : (
              <input
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                value={formData[input.name as keyof typeof formData]}
                className="h-[50px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
                onChange={(e) => handleChange(input.name, e.target.value)}
                disabled={input.disabled}
              />
            )}
            <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
              {input.name === "name" ? "Tên danh mục" : "Mô tả"}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-5 gap-2 items-center">
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

export default EmployerCreateCategory;
