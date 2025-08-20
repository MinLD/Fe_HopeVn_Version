"use client";
import { ComponentType, SVGProps, useEffect, useState } from "react";
import MyLayout from "../../../Layout/MyLayOut";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import MyButton from "@/app/components/Button";
import * as React from "react";

import { Bell,  Search } from "lucide-react";

import { IoSearchSharp } from "react-icons/io5";
import { useProfileStore } from "@/app/zustand/userStore";
import AvatarProfile from "@/app/components/AvatarProfile";

import { useNav } from "@/app/hooks/useNav";
import HeaderTopMenuDropdown from "@/app/components/HeaderTopMenuDropdown";

type Props = {
  token?: string | null;
};
function HeaderMenuTop({ token = "" }: Props) {
  const navigate = useRouter();
  const { setOpenMenuHeaderTop, isOpenMenuHeaderTop } = useNav();
  // const displayProfile = await initialProfile;
  // const { profileUser, isLoading } = useAutoFetchProfile();
  const { fetchProfile, profileUser, isLoading } = useProfileStore();
  useEffect(() => {
    fetchProfile();
  }, []);

  const icons: { name: ComponentType<SVGProps<SVGSVGElement>>; id: number }[] =
    [
      { id: 1, name: Bell },
      { id: 2, name: Search },
    ];

  const [isShowMenuSub, setIsShowMenuSub] = useState<boolean>(false);

  const handleReturn = (id: number) => {
    if (id === 1) {
      navigate.push("/authenticate/loggin");
    }
    if (id === 2) {
      navigate.push("/authenticate/loggin");
    }
    if (id === 3) {
      navigate.push("/");
    }
    if (id === 4) {
      navigate.push("/account/profile");
    }
    if (id === 5) {
      navigate.push("/");
    }
  };
  return (
    <div className="flex h-[50px] w-full items-center justify-center bg-[#013035]">
      <MyLayout>
        <div className="flex items-center justify-between text-[#fff] sm:gap-0">
          <div className="flex items-center gap-5 lg:gap-10 xl:gap-20 flex-1 w-full">
            {/* info */}
            <div className="flex  gap-2 md:items-center md:gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1534_7)">
                  <path
                    d="M12.4323 9.46033C12.4297 9.45776 12.4273 9.4552 12.4247 9.45264C12.4236 9.45154 12.4223 9.4502 12.4209 9.44897L11.5249 8.55298C11.2731 8.30103 10.9382 8.16235 10.582 8.16235C10.228 8.16235 9.89491 8.29944 9.64357 8.54846C9.64174 8.55017 9.64003 8.552 9.6382 8.55371L9.162 9.03003L6.96901 6.83691L7.44509 6.36072C7.44692 6.35901 7.44863 6.35718 7.45033 6.35547C7.96584 5.83521 7.96449 4.99255 7.44594 4.474L6.55129 3.57922C6.54958 3.57751 6.54799 3.57593 6.5464 3.57434C6.29457 3.323 5.95998 3.18457 5.60427 3.18457C5.24965 3.18457 4.91615 3.32214 4.66469 3.57178C4.66127 3.5752 4.65785 3.57861 4.65456 3.58215L4.24367 3.99292C4.02748 4.20911 3.86159 4.375 3.85512 4.38159C3.2206 5.01599 3.07228 6.02734 3.43752 7.22937C3.77199 8.33032 4.50795 9.4884 5.50966 10.4902C6.9081 11.8887 8.62074 12.7573 9.97902 12.7573C10.6508 12.7573 11.2178 12.5455 11.6165 12.1467C11.6248 12.1385 11.8541 11.9092 12.1265 11.6368L12.4247 11.3386C12.4252 11.3381 12.4257 11.3376 12.4263 11.337C12.9386 10.823 12.9435 9.98938 12.4402 9.46912C12.4376 9.46606 12.4348 9.46301 12.4323 9.46033ZM11.7652 10.6722C11.7623 10.675 11.7595 10.6779 11.7567 10.6808L11.4636 10.9739C11.1959 11.2416 10.9699 11.4677 10.9553 11.4821C10.7312 11.7062 10.4027 11.8198 9.97902 11.8198C8.87709 11.8198 7.38307 11.0377 6.17262 9.82739C5.27773 8.9325 4.62502 7.91309 4.33449 6.95679C4.07839 6.11414 4.14528 5.41711 4.51833 5.04407L4.90651 4.65588L5.32387 4.23853C5.32546 4.23694 5.32692 4.23547 5.32839 4.23389C5.40273 4.16174 5.50038 4.12207 5.60427 4.12207C5.70864 4.12207 5.8069 4.16223 5.88149 4.23523C5.88246 4.23633 5.88356 4.23743 5.88478 4.23853L6.78298 5.13684C6.9374 5.29126 6.9374 5.54248 6.78298 5.6969C6.78273 5.69714 6.78249 5.69751 6.78212 5.69775V5.69788L5.9745 6.50549C5.79152 6.6886 5.79152 6.98535 5.9745 7.16846L8.83058 10.0244C8.91847 10.1124 9.03774 10.1617 9.162 10.1617C9.28639 10.1617 9.40566 10.1123 9.49355 10.0244L10.296 9.22168C10.299 9.21899 10.3018 9.21606 10.3046 9.21326C10.3792 9.14014 10.4776 9.09985 10.582 9.09985C10.6878 9.09985 10.7871 9.14111 10.862 9.21582L11.7578 10.1116L11.7598 10.1136C11.7608 10.1146 11.7617 10.1156 11.7626 10.1166C11.9149 10.2698 11.9157 10.5179 11.7652 10.6722Z"
                    fill="white"
                  ></path>
                  <path
                    d="M13.6569 2.34314C12.1459 0.832153 10.137 0 8 0C5.86304 0 3.85413 0.832153 2.34314 2.34314C0.832153 3.85425 0 5.86316 0 8C0 10.1368 0.832153 12.1459 2.34314 13.6569C3.85413 15.1678 5.86316 16 8 16C10.1368 16 12.1458 15.1678 13.6569 13.6569C15.1678 12.1459 16 10.137 16 8C16 5.86316 15.1678 3.85425 13.6569 2.34314ZM8 15.0625C4.10571 15.0625 0.9375 11.8942 0.9375 8C0.9375 4.10583 4.10571 0.937622 8 0.9375C11.8943 0.937622 15.0625 4.10583 15.0625 8C15.0624 11.8943 11.8942 15.0625 8 15.0625Z"
                    fill="white"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_1534_7">
                    <rect width="16" height="16" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
              <p className="text-[15px]">0918607139</p>
            </div>

            {/* thanh search */}
            <div className="hidden md:block relative  w-full flex-1 max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] transition-all ease-in-out duration-300">
              <input
                placeholder="Tìm kiếm..."
                type="text"
                className="pl-3 p-1  w-full flex-1 border rounded-[10px] border-[#fff] placeholder:text-[14px] text-[#fff] outline-none"
              />
              <span className="absolute top-2 right-2">
                <IoSearchSharp size={20} />
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-1">
            {/* Loggin -pc*/}
            <div className="flex items-center justify-center gap-3 md:gap-2 ">
              <div className="md:flex hidden items-center gap-2">
                {token ? (
                  <>
                    {icons.map((item) => {
                      const IconComponent = item.name;
                      return (
                        <div key={item.id}>
                          <IconComponent
                            className={`w-[20px] h-[20px md:w-[25px] md:h-[25px] ${
                              item.id === 2 && "md:hidden"
                            }`}
                          />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-[14px]">
                    <div onClick={() => handleReturn(1)}>
                      <MyButton content={"Đăng nhập"} isColor="bg-[#00b14f]" />
                    </div>
                    <div onClick={() => handleReturn(2)}>
                      <MyButton content={"Đăng ký"} />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Loggin-mb */}

            {token && token ? (
              <div className="relative">
                <div onClick={() => setOpenMenuHeaderTop(!isOpenMenuHeaderTop)}>
                  <div className="flex items-center gap-1 hover:cursor-pointer">
                    <AvatarProfile
                      name={profileUser?.profile?.fullName || "?"}
                      url={profileUser?.profile?.profilePicture?.url}
                    />
                    {/* {isLoading ? (
                      <>
                        {" "}
                        <Skeleton animation="wave" height={52} width={48} />
                      </>
                    ) : (
                      <>
                        {" "}
                        <span>{profileUser?.result.profile.fullName}</span>
                      </>
                    )} */}
                    <svg viewBox="0 0 24 24" width="1.2em" height="1.2em">
                      <path fill="currentColor" d="m12 16l-6-6h12z"></path>
                    </svg>
                  </div>
                </div>
                {isOpenMenuHeaderTop && <HeaderTopMenuDropdown />}
              </div>
            ) : (
              <>
                <div className="md:hidden flex items-center justify-center gap-2">
                  <div className="relative">
                    <IoIosArrowDown
                      size={25}
                      color="white"
                      className="cursor-pointer"
                      onClick={() => setIsShowMenuSub(!isShowMenuSub)}
                    />

                    {isShowMenuSub && (
                      <div
                        className={`position } z-[] absolute top-10 right-1 flex h-auto w-auto scale-100 transform flex-col gap-2 rounded-lg bg-[#ffff] p-2 font-medium shadow-md transition-all duration-300 ease-in-out`}
                      >
                        <p
                          className="h-[24px] w-[198px] cursor-pointer text-[16px] text-[#0b4d8d]"
                          onClick={() => handleReturn(1)}
                        >
                          Đăng nhập
                        </p>
                        <p
                          className="h-[24px] w-[198px] cursor-pointer text-[16px] text-[#0b4d8d]"
                          onClick={() => handleReturn(2)}
                        >
                          Đăng ký
                        </p>
                        <div className="flex h-[24px] w-[198px] justify-between text-[16px] text-[#333] md:hidden">
                          <p>Ngôn ngữ</p>
                          <p className="cursor-pointer hover:text-[#0b4d8d]">
                            Tiếng Việt {">"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            {/* ShowMenu mobile */}
            {/* <div
              className="text-2xl sm:hidden hover:cursor-pointer"
              onClick={() => setIsOpenMenu(true)}
            >
              <AiOutlineMenu />
            </div> */}
          </div>
        </div>
      </MyLayout>
    </div>
  );
}

export default HeaderMenuTop;
