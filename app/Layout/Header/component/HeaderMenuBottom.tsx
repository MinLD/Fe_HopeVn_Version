"use client";
import { useState } from "react";
import MyLayout from "../../../Layout/MyLayOut";
import logo from "../../../../public/logo/logoanhiu1.png";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { useStateStore } from "@/app/context/StoreProvider";

import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
function HeaderMenuBottom() {
  const navigate = useRouter();
  const data: { name: string; id: number }[] = [
    { id: 1, name: "Giới Thiệu" },
    { name: "Tuyển dụng", id: 2 },
    { name: "Giúp đỡ", id: 3 },
    { name: "Huân chương", id: 5 },
  ];
  // const menuChild: { name: string; id: number }[] = [
  //   { id: 4, name: "Bài đăng sẻ chia" },
  //   { name: "Bài đăng hoàn vốn", id: 5 },
  // ];
  // const MenuUser: { name: string; id: number; icon: any }[] = [
  //   { id: 1, name: "CV của tôi", icon: <FileText /> },
  //   { id: 2, name: "Nạp tiền vào hệ thống", icon: <FileText /> },
  //   { id: 3, name: "Việc làm đã lưu", icon: <Heart /> },
  //   { id: 4, name: "Bài đăng hoàn vốn", icon: <Signpost /> },
  //   { id: 5, name: "Việc làm đã ứng tuyển", icon: <Briefcase /> },
  //   { id: 13, name: "Đổi mật khẩu", icon: <Lock /> },
  //   { id: 14, name: "Đăng xuất", icon: <LogOut /> },
  // ];
  const storeProvider = useStateStore();
  const { setIsOpenMenu } = storeProvider;

  const [isShowMenuChild, setShowMenuChild] = useState<boolean>(false);

  const [hover, setHover] = useState<any>(false);

  const handleReturnComponent = (id: any) => {
    if (id === 0) {
      navigate.push("/");
    }
    if (id === 1) {
      navigate.push("/recruitment");
    }
    if (id === 2) {
      navigate.push("/help");
    }

    window.scrollTo(0, 0);
  };

  return (
    <div className="flex h-[62px] w-full items-center justify-center bg-[#fff] shadow">
      <MyLayout>
        <div className="flex items-center  justify-between   sm:px-4 px-2 w-full">
          <div className="flex items-center justify-center gap-6 md:gap-10 lg:gap-15">
            {/* logo */}
            <span
              onClick={() => {
                navigate.push("/");
                window.scrollTo(0, 0);
              }}
              className="cursor-pointer flex items-center justify-center"
            >
              <Image
                src={logo}
                alt="logo"
                width={50}
                height={58}
                className="h-[48px] w-[40px] md:w-[50px] md:h-[58px] cursor-pointer"
              />
            </span>

            {/* menu */}
            <div
              className="md:flex hidden gap-10"
              onMouseLeave={() => setHover("")}
            >
              {data.map((item, k) => (
                <div
                  key={item.id}
                  onClick={() => handleReturnComponent(k)}
                  className="relative cursor-pointer"
                  onMouseEnter={() => setHover(k)}
                >
                  <h1
                    className="text-[16px] font-medium line-clamp-1 max-w-[100px] "
                    onClick={() => {
                      if (item.name === "Giúp đỡ") {
                        setShowMenuChild(!isShowMenuChild);
                      }
                    }}
                  >
                    {item.name}
                  </h1>

                  {item.name && (
                    <>
                      <div
                        className={`absolute bottom-0 left-0 h-[3px] transform rounded-4xl bg-[#00b14f] transition-all duration-450 ${
                          hover === k ? "w-full scale-x-50" : "w-0 scale-x-0"
                        }`}
                      ></div>
                    </>
                  )}
                  {/* {item.name === "Giúp đỡ" && (
                    <>
                      <div
                        className={` bg-[#fff] shadow-2xl transition-all duration-500  h-auto w-[200px] pl-4 p-2 rounded-2xl absolute flex flex-col gap-2 
                          ${
                            hover === k || isShowMenuChild
                              ? "opacity-[100%]"
                              : "opacity-0 "
                          }
                          
                          `}
                      >
                        {menuChild.map((i, k) => (
                          <div
                            key={k}
                            className="text-md relative hover:text-[#00b14f] cursor-pointer"
                            onClick={() => handleReturnComponent(i.id)}
                          >
                            {" "}
                            {i.name}
                          </div>
                        ))}
                      </div>
                    </>
                  )} */}
                </div>
              ))}
            </div>
          </div>

          {/* ShowMenu mobile */}
          <div
            className="text-3xl  hover:cursor-pointer md:hidden"
            onClick={() => setIsOpenMenu(true)}
          >
            <AiOutlineMenu />
          </div>
          <div className="items-center gap-4 justify-center hidden md:flex">
            <div className="s:flex hidden flex-col gap-1 ">
              <p className="text-[11px] text-[#c5c5c5]">Bạn là Đối Tác?</p>
              <Link href="/register/partner">
                <div className="flex cursor-pointer items-center gap-1 text-[14px] hover:text-[#00b14f]">
                  <p className="text-[14px] font-medium">Đăng ký ngay</p>
                  <IoIosArrowForward />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </MyLayout>
    </div>
  );
}

export default HeaderMenuBottom;
