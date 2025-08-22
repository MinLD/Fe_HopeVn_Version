"use client";
import React, { ComponentType, SVGProps, useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import Logo from "../../../public/logo/logoanhiu1.png";
import Image from "next/image";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputBox from "@/app/components/InputBox";
import { toast } from "sonner";
import { OauthConfig } from "@/app/config/OauthConfig";
import axios from "axios";
import { useAuth } from "@/app/hooks/useAuth";
import { register_Api } from "@/app/service/auth";

type FormData = {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
};

type Form = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();

  const data: Form[] = [
    {
      label: "Họ và tên đầy đủ",
      type: "text",
      name: "name",
      placeholder: "Nhập tên đầy đủ của bạn",
      icon: User,
    },
    {
      label: "Email: ",
      type: "text",
      name: "email",
      placeholder: "Email",
      icon: Mail,
    },
    {
      label: "Mật khẩu: ",
      type: "password",
      name: "password",
      placeholder: "Nhập mật khẩu của bạn",
      icon: Lock,
    },
    {
      label: "Xác nhận mật khẩu: ",
      type: "password",
      name: "confirmPassword",
      placeholder: "Nhập lại mật khẩu của bạn",
      icon: Lock,
    },
  ];

  // Lọc input dựa trên trạng thái isLogin
  const filteredData = isLogin
    ? data.filter((item) => item.name === "email" || item.name === "password")
    : data;

  const validationSchema = Yup.object({
    // email: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
    password: Yup.string()
      .min(3, "Mật khẩu phải có ít nhất 3 ký tự")
      .required("Bắt buộc"),
    ...(isLogin
      ? {}
      : {
          email: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
          name: Yup.string()
            .min(3, "Họ tên phải có ít nhất 3 ký tự")
            .required("Bắt buộc"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
            .required("Bắt buộc"),
        }),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values: FormData) => {
      setIsLoading(true);
      console.log(values);
      if (isLogin) {
        axios
          .post(
            "/api/login",
            {
              email: values.email,
              password: values.password,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            setIsLoading(false);
            setAuth(res?.data?.token);
            toast.success("Đăng nhập thành công");
            window.location.href = "/";
          })
          .catch((err) => {
            console.log(err);
            toast.error("Email/Mật khẩu không chính xác");
            setIsLoading(false);
          });
      } else {
        setIsLoading(true);
        await register_Api(values.email, values.password, values.name || "")
          .then(() => {
            setIsLoading(false);
            toast.success("Đăng ký tài khoản thành công");
            setIsLogin(true);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            console.log(err);
            setIsLoading(false);
          });
      }
    },
  });
  const handleGoogleLogin = () => {
    // Lấy giá trị từ OAuthConfig
    const callbackUrl = OauthConfig.redirectUri;
    const authUrl = OauthConfig.authUri;
    const googleClientId = OauthConfig.clientId;

    if (!googleClientId) {
      console.error(
        "Google Client ID is not configured in OAuthConfig. Please check .env.local."
      );
      toast.error("Google login is not configured. Please contact support.");
      return;
    }

    // Đảm bảo các scope là đúng, bạn có thể cứng hóa hoặc lấy từ config nếu muốn
    const scopes = encodeURIComponent("openid profile email"); // Hoặc OAuthConfig.defaultScopes nếu bạn thêm vào

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=${scopes}&prompt=select_account`;

    console.log("Redirecting to Google:", targetUrl);
    window.location.href = targetUrl;
  };

  return (
    <div className="min-h-screen bg-[#e7fdee] flex justify-center py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-2">
        <div className="bg-white rounded-2xl shadow-xl py-4 px-6">
          {/* Logo */}
          <div className="text-center mb-4">
            <Link
              href="/"
              className="flex items-center justify-center space-x-2"
            >
              <Image src={Logo} alt="logo" width={60} height={50} />
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            {filteredData.map((item) => (
              <InputBox
                key={item.name}
                label={item.label}
                type={item.type}
                name={item.name}
                placeholder={item.placeholder}
                icon={item.icon}
                Formik={formik}
                id={item.name}
              />
            ))}

            {/* Remember me */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="text-[#16a34a] focus:ring-[#16a34a] border-gray-300 rounded outline-none"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Ghi nhớ mật khẩu
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#16a34a] hover:text-[#16a34a] font-medium"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            )}

            {/* Nút */}
            <button
              type="submit"
              disabled={isLoading}
              className="hover:cursor-pointer scale-100 hover:scale-101 w-full bg-[#16a34a] text-white py-3 rounded-lg hover:from-[#16a34a] hover:to-[#16a34a] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isLogin ? "Đang đăng nhập..." : "Đang đăng ký..."}
                </div>
              ) : isLogin ? (
                "Đăng nhập"
              ) : (
                "Đăng ký"
              )}
            </button>
          </form>

          {/* Toggle Form */}
          <div className="mt-6 text-center ">
            <p className="text-sm text-gray-600">
              {isLogin ? "Bạn chưa có tài khoản?" : "Bạn đã có tài khoản?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-[#16a34a] hover:text-[#16a34a] font-medium hover:cursor-pointer"
              >
                {isLogin ? "Đăng ký" : "Đăng nhập"}
              </button>
            </p>
          </div>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Hoặc tiếp tục với
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleGoogleLogin()}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
