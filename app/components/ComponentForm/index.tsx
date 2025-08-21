"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import {
  BuildingOfficeIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  UserGroupIcon,
  PhotoIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { CreateCompany } from "@/app/service/employer";
import { toast } from "sonner";
import Spanning from "@/app/components/Spanning";
import { CompanyFormValues } from "@/app/types/employer";

const formFields = [
  {
    name: "name",
    label: "Tên công ty",
    placeholder: "Nhập tên công ty",
    type: "text",
    icon: BuildingOfficeIcon,
    validation: Yup.string().required("Vui lòng nhập tên công ty"),
  },
  {
    name: "description",
    label: "Giới thiệu công ty",
    placeholder: "Nhập mô tả công ty",
    type: "textarea",
    icon: DocumentTextIcon,
    validation: Yup.string().required("Vui lòng nhập mô tả công ty"),
  },
  {
    name: "industry",
    label: "Ngành nghề chính",
    placeholder: "Nhập ngành nghề chính",
    type: "text",
    icon: BriefcaseIcon,
    validation: Yup.string().required("Vui lòng nhập ngành nghề chính"),
  },
  {
    name: "website",
    label: "Website",
    placeholder: "Nhập URL website",
    type: "url",
    icon: GlobeAltIcon,
    validation: Yup.string()
      .url("URL không hợp lệ")
      .required("Vui lòng nhập website"),
  },
  {
    name: "phoneNumber",
    label: "Số điện thoại liên hệ",
    placeholder: "Nhập số điện thoại",
    type: "tel",
    icon: PhoneIcon,
    validation: Yup.string().required("Vui lòng nhập số điện thoại"),
  },
  {
    name: "email",
    label: "Email liên hệ",
    placeholder: "Nhập email liên hệ",
    type: "email",
    icon: EnvelopeIcon,
    validation: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
  },
  {
    name: "address",
    label: "Địa chỉ công ty",
    placeholder: "Nhập địa chỉ công ty",
    type: "text",
    icon: MapPinIcon,
    validation: Yup.string().required("Vui lòng nhập địa chỉ công ty"),
  },
  {
    name: "size",
    label: "Quy mô công ty",
    type: "select",
    icon: UserGroupIcon,
    options: [
      { value: "Small", label: "Nhỏ" },
      { value: "Medium", label: "Trung bình" },
      { value: "Large", label: "Lớn" },
    ],
    validation: Yup.string().required("Vui lòng chọn quy mô công ty"),
  },
  {
    name: "companyImage",
    label: "Hình ảnh công ty",
    type: "file",
    icon: PhotoIcon,
    accept: "image/*",
    validation: Yup.mixed().required("Vui lòng chọn hình ảnh công ty"),
  },
  {
    name: "taxCode",
    label: "Mã số thuế",
    placeholder: "Nhập mã số thuế",
    type: "text",
    icon: IdentificationIcon,
    validation: Yup.string().required("Vui lòng nhập mã số thuế"),
  },
];

const validationSchema = Yup.object().shape(
  formFields.reduce((acc, field) => {
    acc[field.name] = field.validation;
    return acc;
  }, {} as Record<string, any>)
);
type props = {
  token: string;
};

const CompanyForm = ({ token }: props) => {
  const [mode, setMode] = useState<"seller" | "employer">("employer");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik<CompanyFormValues>({
    initialValues: {
      name: "",
      description: "",
      industry: "",
      website: "",
      phoneNumber: "",
      email: "",
      address: "",
      size: "Small",
      companyImage: undefined,
      taxCode: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "companyImage" && values[key]) {
          formData.append(key, values[key]!);
        } else if (values[key as keyof CompanyFormValues]) {
          formData.append(
            key,
            values[key as keyof CompanyFormValues] as string
          );
        }
      });

      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      try {
        setIsLoading(true);
        const response = await CreateCompany(token, formData);
        if (response.status === 200) {
          toast.success("Tạo công ty thành công!");
          console.log("Response from CreateCompany:", response);
          setIsLoading(false);
          window.location.href = "/";
        } else {
          toast.error(response?.data?.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error from CreateCompany:", error);
        toast.error("Lỗi khi tạo công ty, vui lòng thử lại!");
        setIsLoading(false);
      }
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("companyImage", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {" "}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        {/* <Link
          href="/"
          className="flex items-center justify-center space-x-2 mb-8 mt-15"
        >
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" fill="currentColor" />
          </div>
          <span className="text-2xl font-bold text-green-600">HOPEvn</span>
        </Link> */}

        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
          {/* Mode Selector */}
          {/* <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setMode("employer")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === "employer"
                    ? "bg-white text-green-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Employer
              </button>
              <button
                onClick={() => setMode("seller")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === "seller"
                    ? "bg-white text-green-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Seller
              </button>
            </div>
          </div> */}
          {mode === "employer" && (
            <>
              <h1 className="text-2xl font-bold mb-6 text-center">
                Thông tin công ty
              </h1>
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {formFields.map(
                  ({
                    name,
                    label,
                    placeholder,
                    type,
                    icon: Icon,
                    options,
                    accept,
                  }) => (
                    <div key={name}>
                      <label
                        htmlFor={name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {label}
                      </label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Icon className="h-5 w-5 text-gray-400" />
                        </div>
                        {type === "textarea" ? (
                          <textarea
                            id={name}
                            name={name}
                            value={
                              formik.values[
                                name as keyof CompanyFormValues
                              ] as string
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`block w-full pl-10 pr-3 py-2 border ${
                              formik.touched[name as keyof CompanyFormValues] &&
                              formik.errors[name as keyof CompanyFormValues]
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500`}
                            placeholder={placeholder}
                            rows={4}
                          />
                        ) : type === "select" ? (
                          <select
                            id={name}
                            name={name}
                            value={
                              formik.values[
                                name as keyof CompanyFormValues
                              ] as string
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`block w-full pl-10 pr-3 py-2 border ${
                              formik.touched[name as keyof CompanyFormValues] &&
                              formik.errors[name as keyof CompanyFormValues]
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500`}
                          >
                            {options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : type === "file" ? (
                          <input
                            id={name}
                            name={name}
                            type={type}
                            accept={accept}
                            onChange={handleImageChange}
                            onBlur={formik.handleBlur}
                            className={`block w-full pl-10 pr-3 py-2 border ${
                              formik.touched[name as keyof CompanyFormValues] &&
                              formik.errors[name as keyof CompanyFormValues]
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500`}
                          />
                        ) : (
                          <input
                            id={name}
                            name={name}
                            type={type}
                            value={
                              formik.values[
                                name as keyof CompanyFormValues
                              ] as string
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`block w-full pl-10 pr-3 py-2 border ${
                              formik.touched[name as keyof CompanyFormValues] &&
                              formik.errors[name as keyof CompanyFormValues]
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500`}
                            placeholder={placeholder}
                          />
                        )}
                      </div>
                      {formik.touched[name as keyof CompanyFormValues] &&
                        formik.errors[name as keyof CompanyFormValues] && (
                          <p className="mt-1 text-sm text-red-500">
                            {formik.errors[name as keyof CompanyFormValues]}
                          </p>
                        )}
                      {name === "companyImage" && previewImage && (
                        <img
                          src={previewImage}
                          alt="Xem trước hình ảnh công ty"
                          className="mt-2 w-32 h-32 object-cover rounded-md"
                        />
                      )}
                    </div>
                  )
                )}
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Spanning />
                      </div>
                    ) : (
                      "Gửi"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyForm;
