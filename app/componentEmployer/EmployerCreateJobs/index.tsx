import { JobCategory } from "@/app/componentEmployer/JobCategories";
import Spanning from "@/app/components/Spanning";
import { CreatePostJob, GetAllJobCategory } from "@/app/service/employer";
import {
  X,
  Briefcase,
  FileText,
  List,
  CheckSquare,
  Gift,
  Accessibility,
  Clock,
  MapPin,
  DollarSign,
  Calendar,
  Tag,
} from "lucide-react";
import { useState, useEffect } from "react"; // Added useEffect
import { toast } from "sonner";

type Props = {
  setClose: () => void;
  token: string;
  handleGetAllJobs: () => void;
};

function EmployerCreateJob({ setClose, token, handleGetAllJobs }: Props) {
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [customCategory, setCustomCategory] = useState(""); // State for custom category name
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    responsibilities: "",
    benefits: "",
    suitableForDisability: "",
    jobType: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    applicationDeadline: "",
    categoryId: "",
  });

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoadingCategories(true);
      const response = await GetAllJobCategory(token);
      if (response.status === 200) {
        setCategories(response.data.result);
      } else {
        toast.error(response.data.message || "Không thể tải danh mục!");
      }
    } catch (error) {
      toast.error("Lỗi khi tải danh mục!");
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: value,
    }));
    // Reset custom category if "Khác" is not selected
    if (
      value !== categories.find((cat) => cat.name === "Khác")?.id.toString()
    ) {
      setCustomCategory("");
    }
  };

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "requirements",
      "responsibilities",
      "benefits",
      "jobType",
      "location",
      "salaryMin",
      "salaryMax",
      "applicationDeadline",
      "categoryId",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast.warning("Vui lòng nhập đầy đủ thông tin!");
        setLoading(false);
        return;
      }
    }

    // Validate custom category if "Khác" is selected
    const otherCategory = categories.find((cat) => cat.name === "Khác");
    if (
      otherCategory &&
      formData.categoryId === otherCategory.id.toString() &&
      !customCategory
    ) {
      toast.warning("Vui lòng nhập tên danh mục tùy chỉnh!");
      setLoading(false);
      return;
    }

    // Validate salary
    if (Number(formData.salaryMin) > Number(formData.salaryMax)) {
      toast.error("Mức lương tối thiểu không thể lớn hơn mức lương tối đa!");
      setLoading(false);
      return;
    }

    // Validate application deadline
    const deadline = new Date(formData.applicationDeadline);
    if (deadline < new Date()) {
      toast.error("Hạn nộp hồ sơ phải là ngày trong tương lai!");
      setLoading(false);
      return;
    }

    try {
      const response = await CreatePostJob(token, {
        ...formData,
        salaryMin: Number(formData.salaryMin),
        salaryMax: Number(formData.salaryMax),
        categoryId: Number(formData.categoryId),
      });

      await handleGetAllJobs();
      console.log({ ...formData });
      console.log(response);
      toast.success("Tạo bài đăng tuyển dụng thành công!");
      setClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Đã xảy ra lỗi!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const inputs = [
    {
      id: 1,
      name: "title",
      type: "textarea",
      placeholder: "Nhập tiêu đề công việc",
      label: "Tiêu đề công việc",
      icon: Briefcase,
      disabled: false,
    },
    {
      id: 2,
      name: "description",
      type: "textarea",
      placeholder: "Nhập mô tả công việc",
      label: "Mô tả công việc",
      icon: FileText,
      disabled: false,
    },
    {
      id: 3,
      name: "requirements",
      type: "textarea",
      placeholder: "Nhập yêu cầu công việc",
      label: "Yêu cầu công việc",
      icon: List,
      disabled: false,
    },
    {
      id: 4,
      name: "responsibilities",
      type: "textarea",
      placeholder: "Nhập trách nhiệm công việc",
      label: "Trách nhiệm công việc",
      icon: CheckSquare,
      disabled: false,
    },
    {
      id: 5,
      name: "benefits",
      type: "textarea",
      placeholder: "Nhập quyền lợi",
      label: "Quyền lợi",
      icon: Gift,
      disabled: false,
    },
    {
      id: 6,
      name: "suitableForDisability",
      type: "textarea",
      placeholder: "Nhập thông tin phù hợp cho người khuyết tật",
      label: "Phù hợp cho người khuyết tật",
      icon: Accessibility,
      disabled: false,
    },
    {
      id: 7,
      name: "jobType",
      type: "textarea",
      placeholder: "Nhập loại công việc",
      label: "Loại công việc",
      icon: Clock,
      disabled: false,
    },
    {
      id: 8,
      name: "location",
      type: "textarea",
      placeholder: "Nhập địa điểm làm việc",
      label: "Địa điểm làm việc",
      icon: MapPin,
      disabled: false,
    },
    {
      id: 9,
      name: "salaryMin",
      type: "number",
      placeholder: "Nhập mức lương tối thiểu",
      label: "Mức lương tối thiểu",
      icon: DollarSign,
      disabled: false,
    },
    {
      id: 10,
      name: "salaryMax",
      type: "number",
      placeholder: "Nhập mức lương tối đa",
      label: "Mức lương tối đa",
      icon: DollarSign,
      disabled: false,
    },
    {
      id: 11,
      name: "applicationDeadline",
      type: "date",
      placeholder: "Chọn hạn nộp hồ sơ",
      label: "Hạn nộp hồ sơ",
      icon: Calendar,
      disabled: false,
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-h-[90vh] overflow-y-scroll">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#3c3c3c]">
          Tạo bài đăng tuyển dụng
        </h2>
        <X
          size={35}
          color="#afacac"
          strokeWidth={0.5}
          onClick={() => setClose()}
          className="hover:cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inputs.map((input) => (
          <div key={input.id} className="relative">
            <div className="flex items-center border border-[#8e8e8e] rounded-md w-full bg-white">
              <div className="pl-3 py-3">
                <input.icon size={20} color="#8e8e8e" />
              </div>
              {input.type === "textarea" ? (
                <textarea
                  name={input.name}
                  placeholder={input.placeholder}
                  value={formData[input.name as keyof typeof formData]}
                  className="h-[100px] p-3 w-full text-[#3c3c3c] text-[16px] border-none focus:ring-0"
                  onChange={(e) => handleChange(input.name, e.target.value)}
                  disabled={input.disabled}
                />
              ) : (
                <input
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  value={formData[input.name as keyof typeof formData]}
                  className="h-[50px] p-3 w-full text-[#3c3c3c] text-[16px] border-none focus:ring-0"
                  onChange={(e) => handleChange(input.name, e.target.value)}
                  disabled={input.disabled}
                />
              )}
            </div>
            <label className="absolute -top-2 left-3 bg-white px-1 text-[#8e8e8e] text-[12px]">
              {input.label}
            </label>
          </div>
        ))}
        {/* Category Dropdown */}
        <div className="relative">
          <div className="flex items-center border border-[#8e8e8e] rounded-md w-full bg-white">
            <div className="pl-3 py-3">
              <Tag size={20} color="#8e8e8e" />
            </div>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="h-[50px] p-3 w-full text-[#3c3c3c] text-[16px] border-none focus:ring-0"
              disabled={isLoadingCategories}
            >
              <option value="" disabled>
                Chọn danh mục
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <label className="absolute -top-2 left-3 bg-white px-1 text-[#8e8e8e] text-[12px]">
            Danh mục công việc
          </label>
        </div>
        {/* Custom Category Input for "Khác" */}
        {categories.find((cat) => cat.name === "Khác")?.id.toString() ===
          formData.categoryId && (
          <div className="relative">
            <div className="flex items-center border border-[#8e8e8e] rounded-md w-full bg-white">
              <div className="pl-3 py-3">
                <Tag size={20} color="#8e8e8e" />
              </div>
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Nhập tên danh mục tùy chỉnh"
                className="h-[50px] p-3 w-full text-[#3c3c3c] text-[16px] border-none focus:ring-0"
              />
            </div>
            <label className="absolute -top-2 left-3 bg-white px-1 text-[#8e8e8e] text-[12px]">
              Tên danh mục tùy chỉnh
            </label>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6 gap-3 items-center">
        <button
          className="text-[#3c3c3c] px-4 py-2 rounded-md hover:bg-gray-100"
          onClick={setClose}
        >
          Hủy
        </button>
        <button
          className="bg-[#3c3c3c] text-white px-4 py-2 rounded-md hover:bg-[#2a2a2a] flex items-center"
          onClick={handleSubmit}
        >
          {loading ? <Spanning /> : "Lưu"}
        </button>
      </div>
    </div>
  );
}

export default EmployerCreateJob;
