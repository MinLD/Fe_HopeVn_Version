import React, { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  FileUser,
} from "lucide-react";
import Button from "@/app/ui/Button";
import Card from "@/app/ui/Card";
import Badge from "@/app/ui/Badge";
import { Ty_Cv } from "@/app/types/UserList";
import { CreateCv, getAllCv } from "@/app/service/User";
import { toast } from "sonner";
import { ApplyCompany } from "@/app/service/employer";
import Spanning from "@/app/components/Spanning";
// --- MẢNG CẤU HÌNH CHO FORM ---
const formFields = [
  {
    name: "name",
    label: "Họ và Tên *",
    type: "text",
    placeholder: "Nhập họ và tên",
    required: true,
  },
  {
    name: "phone",
    label: "Số điện thoại *",
    type: "tel",
    placeholder: "+84 123 456 789",
    required: true,
  },
  {
    name: "email",
    label: "Địa chỉ Email *",
    type: "email",
    placeholder: "your.email@example.com",
    required: true,
  },
  {
    name: "address",
    label: "Địa chỉ",
    type: "text",
    placeholder: "Địa chỉ của bạn",
  },
  { name: "dob", label: "Ngày sinh", type: "date" },
  {
    name: "typeOfJob",
    label: "Loại công việc",
    type: "select",
    options: [
      { value: "", label: "Chọn loại công việc" },
      { value: "Full-time", label: "Full-time" },
      { value: "Part-time", label: "Part-time" },
      { value: "Remote", label: "Remote" },
    ],
  },
  {
    name: "skill",
    label: "Kỹ năng",
    type: "textarea",
    rows: 3,
    placeholder: "Liệt kê các kỹ năng của bạn",
    fullWidth: true,
  },
  {
    name: "exp",
    label: "Kinh nghiệm làm việc",
    type: "textarea",
    rows: 4,
    placeholder: "Mô tả kinh nghiệm làm việc",
    fullWidth: true,
  },
  {
    name: "education",
    label: "Học vấn",
    type: "textarea",
    rows: 3,
    placeholder: "Liệt kê học vấn, bằng cấp",
    fullWidth: true,
  },
  {
    name: "typeOfDisability",
    label: "Dạng khuyết tật (Không bắt buộc)",
    type: "text",
    placeholder: "Nếu có, vui lòng ghi rõ để được hỗ trợ",
    fullWidth: true,
  },
];

type CVBuilderProps = {
  // Giữ nguyên props của bạn nếu cần
  idCompany?: number | null;
  token: string | null;
};

const CVBuilder = ({ token, idCompany = null }: CVBuilderProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [cvList, setCvList] = useState<Ty_Cv[]>([]);
  const [isLoadingCv, setIsLoadingCv] = useState(false);
  console.log(isLoadingCv);
  const [isLoadingApply, setIsLoadingApply] = useState(false);
  const initialFormState: Ty_Cv = {
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    dob: "",
    skill: "",
    exp: "",
    education: "",
    typeOfDisability: "",
    typeOfJob: "",
  };

  const [formData, setFormData] = useState<Ty_Cv>(initialFormState);

  // Hàm này sẽ được gọi từ CVBuilder để tạo mới CV
  const handleCreateCv = async (
    newCvData: Omit<Ty_Cv, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      setIsLoadingCv(true);
      const response = await CreateCv(token || "", newCvData as Ty_Cv); // Backend sẽ tự tạo ID và timestamp

      if (response.status !== 201 && response.status !== 200) {
        // Thường tạo mới trả về 201
        toast.error(response.data.message || "Failed to create CV");
        return;
      }

      toast.success(response.data.message || "CV created successfully!");

      // Sau khi tạo thành công, gọi lại API để lấy danh sách CV mới nhất
      await handleGetAllCv();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoadingCv(false);
    }
  };
  // 2. Bọc hàm handleGetAllCv trong useCallback
  //    Hàm này sẽ chỉ được tạo lại khi `token` thay đổi.
  const handleGetAllCv = useCallback(async () => {
    if (!token) return; // Thêm kiểm tra token cho an toàn
    try {
      const response = await getAllCv(token);
      if (response.status !== 200) {
        toast.error(response.data.message);
        return;
      }
      // Giả sử bạn có state setFormDataCv để lưu CV
      setCvList(response.data.result.data || []);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  }, [token]); // Phụ thuộc vào token

  const handleInputChange = (field: keyof Ty_Cv, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setViewingId(null);
    setFormData(initialFormState);
  };
  const handleDelete = (id: string) => {
    cvList.filter((cv) => cv.id !== id);
  };

  const handleSave = () => {
    // Logic lưu của bạn (ví dụ: gọi API) sẽ ở đây
    console.log("Saving CV:", formData);
    handleCreateCv(formData);
    setIsCreating(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setViewingId(null);
  };

  const viewingCV = viewingId ? cvList.find((cv) => cv.id === viewingId) : null;
  const handleEdit = (cv: Ty_Cv) => {
    setEditingId(cv.id || "");

    setIsCreating(false);

    setViewingId(null);

    setFormData({
      name: cv.name,

      phone: cv.phone,

      email: cv.email,

      address: cv.address,

      dob: cv.dob,

      skill: cv.skill,

      exp: cv.exp,

      education: cv.education,

      typeOfDisability: cv.typeOfDisability,

      typeOfJob: cv.typeOfJob,
    });
  };
  const handleApply = async (idJob: number) => {
    setIsLoadingApply(true);
    try {
      const response = await ApplyCompany(
        token || "",
        idCompany || 0,
        idJob || 0
      );
      if (response.status !== 200) {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
      toast.success("Apply successfully!");
      console.log(response.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoadingApply(false);
    }
  };

  const handleView = (cv: Ty_Cv) => {
    setViewingId(cv.id || "");

    setIsCreating(false);

    setEditingId(null);
  };
  useEffect(() => {
    handleGetAllCv();
  }, [handleGetAllCv]);
  console.log(cvList);
  return (
    <div className="min-h-auto bg-gray-50">
      <div className="max-w-full mx-auto py-2">
        {/* Header */}
        <div className="flex   mb-2 flex-col gap-2 ">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý CV</h1>
            <p className="text-gray-600">
              Tạo, chỉnh sửa và quản lý CV của bạn
            </p>
          </div>
          {!isCreating && !editingId && !viewingId && (
            <div className="max-w-md">
              <Button onClick={handleCreate} icon={Plus}>
                Tạo CV mới
              </Button>
            </div>
          )}
        </div>
        {/* --- FORM TẠO/SỬA (ĐÃ LÀM GỌN) --- */}
        {(isCreating || editingId) && (
          <Card className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingId ? "Chỉnh sửa CV" : "Tạo CV mới"}
              </h2>
              <div className="flex space-x-2">
                <Button onClick={handleSave} icon={Save}>
                  Lưu CV
                </Button>
                <Button onClick={handleCancel} variant="outline" icon={X}>
                  Hủy
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.map((field) => (
                <div
                  key={field.name}
                  className={field.fullWidth ? "md:col-span-2" : ""}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      rows={field.rows}
                      value={formData[field.name as keyof Ty_Cv]}
                      onChange={(e) =>
                        handleInputChange(
                          field.name as keyof Ty_Cv,
                          e.target.value
                        )
                      }
                      placeholder={field.placeholder}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={formData[field.name as keyof Ty_Cv]}
                      onChange={(e) =>
                        handleInputChange(
                          field.name as keyof Ty_Cv,
                          e.target.value
                        )
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      required={field.required}
                      value={formData[field.name as keyof Ty_Cv]}
                      onChange={(e) =>
                        handleInputChange(
                          field.name as keyof Ty_Cv,
                          e.target.value
                        )
                      }
                      placeholder={field.placeholder}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}
        {viewingCV && (
          <Card className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                CV Details
              </h2>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleEdit(viewingCV)}
                  variant="outline"
                  icon={Edit}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => setViewingId(null)}
                  variant="outline"
                  icon={X}
                >
                  Close
                </Button>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="text-center mb-8 pb-6 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {viewingCV.name}
                </h1>
                <div className="flex flex-wrap justify-center gap-4 text-gray-600">
                  {viewingCV.phone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" /> {viewingCV.phone}
                    </div>
                  )}

                  {viewingCV.email && (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {viewingCV.email}
                    </div>
                  )}
                  {viewingCV.address && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {viewingCV.address}
                    </div>
                  )}
                  {viewingCV.dob && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {viewingCV.dob}
                    </div>
                  )}
                </div>
              </div>
              {viewingCV.typeOfJob && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Seeking Position
                  </h3>

                  <Badge variant="info">{viewingCV.typeOfJob}</Badge>
                </div>
              )}
              {viewingCV.skill && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Skills
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {viewingCV.skill}
                  </p>
                </div>
              )}
              {viewingCV.exp && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Work Experience
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {viewingCV.exp}
                  </p>
                </div>
              )}
              {viewingCV.education && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Education
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {viewingCV.education}
                  </p>
                </div>
              )}
              {viewingCV.typeOfDisability && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Heart className="w-5 h-5 mr-2" /> Accessibility Information
                  </h3>

                  <p className="text-gray-700 leading-relaxed">
                    {viewingCV.typeOfDisability}
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}
        {/* --- DANH SÁCH CV (ĐÃ LÀM GỌN BẰNG DỮ LIỆU MẪU) --- */}
        {!isCreating && !editingId && !viewingId && (
          <Card padding="none" className="p-2 sm:p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Danh sách CV của bạn ({cvList.length})
            </h2>
            {!cvList[0] ? (
              <div className="text-center py-2">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium">Chưa có CV nào được tạo</h3>
                <Button onClick={handleCreate} icon={Plus} className="mt-4">
                  Tạo CV đầu tiên
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 overflow-y-auto max-h-[320px] ">
                {cvList &&
                  cvList?.map((cv) => (
                    <Card
                      key={cv.id}
                      className="hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-semibold truncate">
                          {cv.name}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {cv.email}
                        </p>
                        {cv.typeOfJob && (
                          <Badge variant="info" size="sm" className="mt-2">
                            {cv.typeOfJob}
                          </Badge>
                        )}
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          <b>Kỹ năng:</b> {cv.skill}
                        </p>
                      </div>
                      <div className="flex space-x-2 pt-4 mt-auto">
                        <div className="flex  pt-2 flex-col gap-2 sm:flex-row">
                          {idCompany && (
                            <Button
                              onClick={() => handleApply(Number(cv.id) || 0)}
                              variant="primary"
                              size="sm"
                              icon={FileUser}
                              className="flex-1"
                            >
                              {isLoadingApply ? <Spanning /> : "Chọn"}
                            </Button>
                          )}
                          <Button
                            onClick={() => handleView(cv)}
                            variant="primary"
                            size="sm"
                            icon={Eye}
                            className="flex-1"
                          >
                            Xem
                          </Button>

                          <Button
                            onClick={() => handleEdit(cv)}
                            variant="outline"
                            size="sm"
                            icon={Edit}
                          >
                            Sửa
                          </Button>

                          <Button
                            onClick={() => handleDelete(cv.id || "")}
                            variant="danger"
                            size="sm"
                            icon={Trash2}
                          >
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default CVBuilder;
