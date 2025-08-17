"use client";
import AvatarProfile from "@/app/components/AvatarProfile";
import { dataCategoryInHeaderTop } from "@/app/data";
import { useProfileStore } from "@/app/zustand/userStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../../public/logo/logoanhiu1.png";
import { useNav } from "@/app/hooks/useNav";
import { useEffect, useRef } from "react";
function HeaderTopMenuDropdown() {
  const { isOpenMenuHeaderTop, setOpenMenuHeaderTop } = useNav();
  const navigate = useRouter();
  const { profileUser } = useProfileStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  //useRef tạo một tham chiếu (reference) tới một phần tử DOM trong component, cụ thể là phần tử <div> của dropdown.
  // Xử lý nhấn ra ngoài
  //useRef tạo một tham chiếu (reference) tới một phần tử DOM trong component, cụ thể là phần tử <div> của dropdown.
  //Ban đầu, dropdownRef.current có giá trị null. Khi component được render, React sẽ gán phần tử DOM thực tế
  //  (thẻ <div> của dropdown) vào dropdownRef.current thông qua thuộc tính ref trong JSX.
  //Mục đích: dropdownRef được sử dụng để kiểm tra xem sự kiện nhấn chuột có xảy ra bên trong dropdown hay không.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Kiểm tra nếu nhấn ra ngoài dropdown và dropdown đang mở
      if (
        isOpenMenuHeaderTop &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenMenuHeaderTop(false);
      }
    };

    // Thêm sự kiện click vào document
    document.addEventListener("mousedown", handleClickOutside);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenMenuHeaderTop, isOpenMenuHeaderTop === false]);

  if (!isOpenMenuHeaderTop) return null;
  const handleReturn = (id: number) => {
    if (id === 4) {
      navigate.push("/account/profile");
    }
    if (id === 5) {
      navigate.push("/");
    }
  };
  return (
    <>
      <div
        ref={dropdownRef}
        className="text-[14px] text-[#272727]  border-1 border-[#f5f5f5] absolute top-10 right-0 w-auto min-w-[250px] flex-1  bg-[#ffff] flex flex-col gap-2 rounded-lg h-auto"
      >
        <div className="flex items-center gap-2 px-2 mt-4">
          <AvatarProfile
            name={profileUser?.profile?.fullName || "?"}
            url={profileUser?.profile?.profilePicture?.url}
          />
          <div className="flex flex-col">
            <span className="text-[15px] font-bold ">
              {profileUser?.profile?.fullName}
            </span>
            <span className="text-[12px] text-[#6e625e] font-medium ">
              Số tiền: {Number(profileUser?.fund)?.toLocaleString() || 0} VNĐ
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-1 px-1">
          {dataCategoryInHeaderTop.map((item, k) => {
            return (
              <div
                key={k}
                className="flex items-center gap-2 px-1 hover:cursor-pointer hover:bg-[#f5f5f5] py-2 rounded-md"
                onClick={() => handleReturn(item.id)}
              >
                {item.id === 5 ? (
                  <form action="/api/logout" method="POST">
                    <button type="submit">
                      <div
                        key={k}
                        className="flex items-center gap-2 px-1 hover:cursor-pointer hover:bg-[#f5f5f5] py-2 rounded-md"
                      >
                        {" "}
                        <span>{<item.icon />}</span>
                        <span>{item.name}</span>
                      </div>
                    </button>
                  </form>
                ) : (
                  <>
                    <span>{<item.icon />}</span>
                    <span>{item.name}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className="border-t-1 border-[#f5f5f5] mt-1 " />
        <span className="flex items-center  px-2 mb-2 justify-center">
          <span className="cursor-pointer flex items-center justify-center">
            <Image
              src={logo}
              alt="logo"
              width={50}
              height={58}
              className="h-[24px] w-[22px]  cursor-pointer"
            />
          </span>
          <span className="text-[16px] text-[#c7c7c7] font-medium shadow-2xl">
            {" "}
            Account
          </span>
        </span>
      </div>
    </>
  );
}

export default HeaderTopMenuDropdown;
