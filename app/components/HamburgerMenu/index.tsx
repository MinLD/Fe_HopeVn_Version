"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStateStore } from "@/app/context/StoreProvider";
import { useEffect } from "react";
import Image from "next/image";
import { DataCategory, DataMenuHamburger } from "@/app/types/MenuList";

function HamburgerMenu() {
  const { IsOpenMenu, setIsOpenMenu } = useStateStore();
  const router = useRouter();

  useEffect(() => {
    // Khi IsOpenMenu là true, thêm overflow: hidden để khóa scroll
    if (IsOpenMenu) {
      document.body.style.overflow = "hidden";
    } else {
      // Khi IsOpenMenu là false, bỏ khóa scroll
      document.body.style.overflow = "";
    }

    // Cleanup: đảm bảo bỏ overflow khi component unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [IsOpenMenu]);
  const handleReturnComponent = async (id: number) => {
    console.log(id);
  };

  return (
    <>
      <div
        className={` ${
          IsOpenMenu ? "" : "hidden"
        } fixed top-0  z-99 w-full h-screen bg-[#000000] opacity-50 `}
        onClick={() => setIsOpenMenu(false)}
      />
      <div
        className={`${
          IsOpenMenu ? "left-0" : "-left-full"
        } transition-all duration-600 fixed top-0 z-99`}
      >
        <div className=" w-[80vw] left-0 h-screen bg-[#ffffff] ">
          <div>
            <div
              className=" px-5 pt-3 relative "
              onClick={() => {
                router.push("/");
                setIsOpenMenu(false);
              }}
            >
              <Image
                className="cursor-pointer w-[45px] h-[55px]"
                width="59"
                height="59"
                src="/logo/logoanhiu1.png"
                alt="Allbirds logo"
              />
            </div>

            <div onClick={() => setIsOpenMenu(false)}>
              {" "}
              <X
                size={32}
                className="absolute top-2 right-5 hover:cursor-pointer"
                onClick={() => setIsOpenMenu(false)}
              />
            </div>
          </div>
          <div className="w-full h-[1px] bg-[#f1f1f1] mt-5" />

          <div className="px-3">
            {/* <div className="w-full h-[50px] bg-[#f5f5f5] mt-5 rounded-3xl">
              <div className="w-full h-full flex items-center justify-center gap-2">
                <div className="flex  gap-2 items-center">
                  <div>
                    <CircleUserRound size={30} />
                  </div>
                  <div className="">dodaangminhluan@mafaia.com</div>
                </div>
              </div>
            </div>
            <div className="relative mb-3 mt-3">
              <input
                type="text"
                className="w-full pl-10 border-0 rounded-2xl bg-[#f5f5f5]  h-[35px] text-[#000000] "
                placeholder="nhập từ khóa tìm kiếm"
              />
              <div className="absolute top-1/2 left-3 transform translate-y-[-50%] text-[#000000]">
                <Search size={20} strokeWidth={2.25} />
              </div>
            </div> */}
            {/* <div className="w-full h-[1px] bg-[#f1f1f1] mt-5" /> */}
            <h2 className="text-lg font-bold mt-2 text-[#272727]">Danh mục</h2>

            {DataCategory.map((item) => (
              <div
                key={item.id}
                className="hover:bg-[#f5f5f5] px-3 py-2 rounded-xl  hover:cursor-pointer"
                onClick={() => handleReturnComponent(item.id)}
              >
                {item.name}
              </div>
            ))}

            <div className="overflow-y-scroll  max-h-[400px] ">
              {DataMenuHamburger.map((item) => (
                <div
                  key={item.id}
                  className="hover:bg-[#f5f5f5] px-3 py-2 rounded-xl  hover:cursor-pointer"
                  onClick={() => handleReturnComponent(item.id)}
                >
                  {item.name}
                </div>
              ))}
            </div>

            {/* <div className="w-full h-[1px] bg-[#f1f1f1] mt-2" /> */}
            {/* <p className="text-center mt-2">
              <span className="text-[#272727] font-bold ">Allbirds</span> &copy;
              2025
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default HamburgerMenu;
