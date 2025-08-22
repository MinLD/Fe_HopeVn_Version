"use client";
import Spanning from "@/app/components/Spanning";
import { Post, PostVolunteer } from "@/app/service/User";
import Card from "@/app/ui/Card";
import { useFormik } from "formik";
import { CreditCard, MapPinHouse, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

interface PostFormData {
  title: string;
  location: string;
  content: string;
  stk: string;
  bankName: string;
  images: File[];
  type: string;
}

const CATEGORIES = [
  "Tự do",
  "Trao tặng / Góp sức",
  "Yêu cầu Hỗ trợ",
  "Hoàn vốn",
];

const BANK_OPTIONS = [
  "Vietcombank",
  "VietinBank",
  "BIDV",
  "Agribank",
  "Techcombank",
  "MB Bank",
  "ACB",
  "VPBank",
  "Sacombank",
  "SHB",
];

type CreatePostProps = {
  onClose: () => void;
  token: string | "";
};

// --- Component ---

function CreatePost({ onClose, token }: CreatePostProps) {
  const navigator = useRouter();
  const [isLoading, setLoading] = useState(false);

  // --- Formik and Yup Validation ---

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "Tiêu đề cần ít nhất 5 ký tự")
      .required("Tiêu đề là bắt buộc"),
    content: Yup.string()
      .min(20, "Nội dung cần ít nhất 20 ký tự")
      .required("Nội dung là bắt buộc"),
    type: Yup.string().required("Vui lòng chọn một danh mục"),
    // Conditional validation using Yup.when()
    stk: Yup.string().when("type", {
      is: "Hoàn vốn",
      then: (schema) =>
        schema
          .matches(/^[0-9]+$/, "Số tài khoản chỉ được chứa số")
          .required("Số tài khoản là bắt buộc khi yêu cầu 'Hoàn vốn'"),
      otherwise: (schema) => schema.notRequired(),
    }),
    bankName: Yup.string().when("type", {
      is: "Hoàn vốn",
      then: (schema) =>
        schema.required("Tên ngân hàng là bắt buộc khi yêu cầu 'Hoàn vốn'"),
      otherwise: (schema) => schema.notRequired(),
    }),
    location: Yup.string(), // Optional field
    images: Yup.array().of(Yup.mixed()), // Allow any file type for simplicity
  });

  const formik = useFormik<PostFormData>({
    initialValues: {
      title: "",
      content: "",
      images: [],
      location: "",
      type: "Tự do",
      bankName: "Vietcombank",
      stk: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!token) {
        toast.warning("Vui lòng đăng nhập để được đăng bài viết!");
        return navigator.push("/authenticate/loggin");
      }
      setLoading(true);
      const formDataApi = new FormData();
      formDataApi.append("title", values.title);
      formDataApi.append("content", values.content);

      if (values.type === "Hoàn vốn") {
        formDataApi.append("stk", values.stk);
        formDataApi.append("bankName", values.bankName);
        formDataApi.append("location", values.location);
        values.images.forEach((file) => {
          formDataApi.append("files", file);
        });
        formDataApi.forEach((value, key) => {
          console.log(`${key}:`, value);
        });

        try {
          const response = await PostVolunteer(token, formDataApi);
          if (response.status == 200) {
            console.log(response);
            toast.success("Đăng bài viết thành công!");
            resetForm();
            onClose();
          } else {
            toast.error(response.data?.message || "Đã có lỗi xảy ra.");
          }
        } catch (error: any) {
          console.error("Submission Error:", error);
          toast.error(
            error.response?.data?.message ||
              "Không thể gửi bài viết. Vui lòng thử lại."
          );
        } finally {
          setLoading(false);
        }
        return;
      }

      values.images.forEach((file) => {
        formDataApi.append("images", file);
      });
      formDataApi.append("type", values.type);
      formDataApi.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      try {
        const response = await Post(token, formDataApi);
        if (response.status == 200) {
          console.log(response);
          toast.success("Đăng bài viết thành công!");
          resetForm();
          onClose();
        } else {
          toast.error(response.data?.message || "Đã có lỗi xảy ra.");
        }
      } catch (error: any) {
        console.error("Submission Error:", error);
        toast.error(
          error.response?.data?.message ||
            "Không thể gửi bài viết. Vui lòng thử lại."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  // --- Event Handlers ---

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      formik.setFieldValue("images", [...formik.values.images, ...files]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = formik.values.images.filter(
      (_, index) => index !== indexToRemove
    );
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50  ">
      <div
        className="absolute inset-0 z-50 bg-black opacity-60"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Tạo bài viết mới
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="p-6 space-y-6 overflow-y-auto flex-grow"
        >
          {/* Basic Information */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Thông tin cơ bản
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Ví dụ: Cần hỗ trợ sách vở cho trẻ em vùng cao"
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.title}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {CATEGORIES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nội dung chi tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={6}
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Hãy kể câu chuyện của bạn một cách chi tiết. Nêu rõ những gì bạn cần hoặc những gì bạn đang cung cấp..."
                />
                {formik.touched.content && formik.errors.content ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.content}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Cung cấp thông tin rõ ràng và trung thực sẽ giúp bạn nhận
                    được sự hỗ trợ tốt hơn.
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Banking Information (Conditional) */}
          {formik.values.type === "Hoàn vốn" && (
            <Card>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Thông tin nhận hỗ trợ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="stk"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Địa điểm <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPinHouse className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Nhập địa chỉ"
                    />
                  </div>
                  {formik.touched.location && formik.errors.location && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.location}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="stk"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Số tài khoản <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      id="stk"
                      name="stk"
                      type="text"
                      value={formik.values.stk}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Nhập số tài khoản"
                    />
                  </div>
                  {formik.touched.stk && formik.errors.stk && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.stk}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="bankName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ngân hàng <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="bankName"
                    name="bankName"
                    value={formik.values.bankName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {BANK_OPTIONS.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                  {formik.touched.bankName && formik.errors.bankName && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.bankName}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Lưu ý:</strong> Thông tin này là bắt buộc và sẽ được
                  dùng để mọi người hỗ trợ bạn. Vui lòng kiểm tra kỹ.
                </p>
              </div>
            </Card>
          )}

          {/* Images Upload */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Hình ảnh minh chứng
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="image-upload"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tải lên hình ảnh (Tùy chọn)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors duration-200">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 font-medium">
                      Nhấn để tải lên, hoặc kéo thả
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF (tối đa 5MB mỗi tệp)
                    </p>
                  </label>
                </div>
              </div>

              {formik.values.images.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Các ảnh đã chọn
                  </h4>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                    {formik.values.images.map((file, index) => (
                      <div key={file + "1"} className="relative group">
                        <Image
                          width={100}
                          height={100}
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                          onLoad={() => URL.revokeObjectURL(file.name)} // Clean up memory
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </form>

        {/* Footer with Actions */}
        <div className="flex space-x-4 p-5 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-6 border border-gray-300 text-gray-800 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-semibold"
          >
            Hủy
          </button>
          <button
            type="submit"
            onClick={() => formik.handleSubmit()} // Explicitly call handleSubmit
            className="flex justify-center items-center flex-1 py-3 px-6 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors duration-200 font-semibold shadow-md disabled:bg-emerald-300 disabled:cursor-not-allowed"
            disabled={isLoading || !formik.isValid || !formik.dirty}
          >
            {isLoading ? <Spanning /> : "Đăng bài viết"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
