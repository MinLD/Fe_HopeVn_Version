import { useState } from "react";
import MyLayout from "../../../Layout/MyLayOut";
import { IoIosArrowDown } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import MyButton from "@/app/components/Button";
import { useStateStore } from "@/app/context/StoreProvider";
function HeaderMenuTop() {
  const data: {
    id: number;
    name: string;
  }[] = [
    { id: 1, name: "Giới Thiệu" },
    { name: "Tuyển dụng", id: 2 },
    { name: "Bài đăng", id: 3 },
    { id: 4, name: "Cửa hàng" },
  ];
  const icons: { name: any; id: number }[] = [
    { name: <FaFacebookSquare />, id: 1 },
    { name: <FaInstagram />, id: 1 },
    { name: <FaYoutube />, id: 1 },
  ];
  const menuChild: { name: string; id: number }[] = [
    { id: 4, name: "Bài đăng sẻ chia" },
    { name: "Bài đăng hoàn vốn", id: 5 },
  ];
  const storeProvider = useStateStore();
  const { IsOpenMenu, setIsOpenMenu } = storeProvider;
  const navigate = useRouter();
  const token = Cookies.get("token");
  const [isShowMenuSub, setIsShowMenuSub] = useState<boolean>(false);
  const [hover, setHover] = useState<any>(false);
  const [isShowMenuChild, setShowMenuChild] = useState(false);
  const handleReturnToLoggin = (id: number) => {};

  return (
    <div className="flex h-[50px] w-full items-center justify-center bg-[#013035]">
      <MyLayout>
        <div className="flex items-center justify-between text-[#fff] sm:gap-0">
          <div className="flex items-center gap-8 xl:gap-20">
            {/* info */}
            <div className="flex items-center gap-1">
              <svg
                width="20"
                height="20"
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
              <p className="text-[16px]">0918607139</p>
            </div>

            {/* menu */}
            <div className="lg:hidden">
              <div
                className="hidden gap-2 sm:flex"
                onMouseLeave={() => setHover("")}
              >
                {data.map((item, k) => (
                  <div
                    key={k}
                    className="relative cursor-pointer"
                    onMouseEnter={() => setHover(k)}
                  >
                    <h1
                      className="text-[16px] font-medium"
                      onClick={() => {
                        item.name === "Bài đăng" &&
                          setShowMenuChild(!isShowMenuChild);
                      }}
                    >
                      {item.name}
                    </h1>
                    {item.name !== "Bài đăng" && (
                      <>
                        <div
                          className={`absolute bottom-0  left-0 h-[3px] transform rounded-4xl bg-[#00b14f] transition-all duration-450 ${
                            hover === k ? "w-full scale-x-50" : "w-0 scale-x-0"
                          }`}
                        ></div>
                      </>
                    )}
                    {item.name === "Bài đăng" && (
                      <>
                        <div
                          className={`z-[99]  bg-[#fff] shadow-2xl transition-all duration-500  h-auto w-[200px] pl-4 p-2 rounded-2xl absolute flex flex-col gap-2 
                          ${
                            hover === k || isShowMenuChild
                              ? "opacity-[100%]"
                              : "opacity-0 "
                          }
                          `}
                        >
                          <div className="text-[#333] flex flex-col gap-2">
                            {menuChild.map((i, k) => (
                              <div
                                key={k}
                                className="cursor-pointer text-[16px] font-medium hover:text-[#00b14f] "
                              >
                                {i.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Loggin -pc*/}
            <div className="flex items-center justify-center gap-1">
              <div className="flex gap-2">
                {icons.map((item, k) => (
                  <div key={k} className="cursor-pointer text-2xl">
                    {item.name}
                  </div>
                ))}
              </div>

              <div className="mddd:flex hidden items-center gap-1">
                {token ? (
                  ""
                ) : (
                  <div className="flex items-center gap-1">
                    <div onClick={() => handleReturnToLoggin(1)}>
                      <MyButton content={"Đăng nhập"} isColor="bg-[#00b14f]" />
                    </div>
                    <div onClick={() => handleReturnToLoggin(2)}>
                      <MyButton content={"Đăng ký"} />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ant-dropdown-trigger ml-2 hidden w-8 cursor-pointer md:block"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="31"
                    height="31"
                    rx="3.5"
                    stroke="white"
                  ></rect>
                  <path
                    d="M22.8236 20.1766C23.5948 18.9202 24.002 17.4743 24 16.0001L24 16L24 15.9999C24.002 14.5256 23.5948 13.0798 22.8236 11.8234L22.8192 11.8165C22.1037 10.6504 21.1012 9.68721 19.9073 9.01904C18.7134 8.35086 17.3682 8.00001 16 8C14.6319 7.99999 13.2866 8.35084 12.0928 9.019C10.8989 9.68717 9.89631 10.6503 9.18083 11.8165L9.17639 11.8234C8.4071 13.0807 8.00001 14.526 8 16C7.99999 17.4739 8.40708 18.9193 9.17635 20.1766L9.18087 20.1836C9.89636 21.3497 10.8989 22.3129 12.0928 22.981C13.2867 23.6492 14.6319 24 16 24C17.3682 24 18.7134 23.6491 19.9073 22.981C21.1011 22.3128 22.1037 21.3497 22.8192 20.1835L22.8236 20.1766ZM17.0226 22.6289C16.8701 22.776 16.6947 22.8972 16.5031 22.9877C16.3459 23.0624 16.1741 23.1011 16 23.1011C15.8259 23.1011 15.6541 23.0624 15.4969 22.9877C15.1324 22.8015 14.8203 22.5269 14.5893 22.189C14.1175 21.5073 13.7679 20.7487 13.5561 19.9471C14.3699 19.897 15.1845 19.8715 16 19.8706C16.8151 19.8706 17.6298 19.8961 18.4441 19.9471C18.3268 20.3593 18.1804 20.7625 18.0058 21.1538C17.7759 21.7042 17.4421 22.205 17.0226 22.6289V22.6289ZM8.91452 16.4494H12.1413C12.1623 17.3498 12.2599 18.2468 12.433 19.1306C11.551 19.2083 10.6711 19.3149 9.79356 19.4505C9.27967 18.5285 8.97927 17.503 8.91452 16.4494ZM9.79355 12.5495C10.6708 12.6855 11.5509 12.7921 12.434 12.8694C12.2605 13.7532 12.1627 14.6502 12.1416 15.5506H8.91452C8.97927 14.497 9.27966 13.4715 9.79355 12.5495H9.79355ZM14.9774 9.37108C15.1299 9.22399 15.3053 9.1028 15.4969 9.01232C15.6541 8.93762 15.8259 8.89887 16 8.89887C16.1741 8.89887 16.3459 8.93762 16.5031 9.01232C16.8676 9.1985 17.1797 9.47308 17.4107 9.81094C17.8825 10.4927 18.2321 11.2513 18.4439 12.0529C17.6301 12.1029 16.8155 12.1284 16 12.1294C15.1849 12.1294 14.3702 12.1039 13.5559 12.0528C13.6732 11.6407 13.8196 11.2375 13.9942 10.8462C14.2241 10.2958 14.5579 9.795 14.9774 9.37108ZM23.0855 15.5506H19.8587C19.8377 14.6502 19.7401 13.7532 19.567 12.8694C20.4491 12.7917 21.3289 12.6851 22.2065 12.5495C22.7203 13.4715 23.0207 14.497 23.0855 15.5506ZM13.3371 19.0608C13.1613 18.2008 13.062 17.3269 13.0404 16.4494H18.9597C18.9383 17.3269 18.8392 18.2008 18.6635 19.0608C17.7767 19.0026 16.8888 18.9729 16 18.9717C15.1118 18.9717 14.2242 19.0014 13.3371 19.0608ZM18.6629 12.9392C18.8387 13.7992 18.938 14.6731 18.9596 15.5506H13.0403C13.0617 14.6731 13.1608 13.7992 13.3365 12.9392C14.2233 12.9974 15.1112 13.0271 16 13.0283C16.8882 13.0283 17.7758 12.9986 18.6629 12.9392V12.9392ZM19.8584 16.4494H23.0855C23.0207 17.503 22.7203 18.5285 22.2064 19.4505C21.3292 19.3145 20.4491 19.2079 19.566 19.1306C19.7395 18.2468 19.8373 17.3498 19.8584 16.4494ZM21.6675 11.7222C20.9005 11.8329 20.1312 11.9205 19.3597 11.985C19.221 11.4687 19.0421 10.9641 18.8248 10.4757C18.6263 10.0262 18.3765 9.60123 18.0805 9.20911C19.5111 9.64786 20.7666 10.5274 21.6675 11.7222ZM10.9787 10.9787C11.7994 10.1573 12.809 9.5497 13.9191 9.20922C13.9023 9.23103 13.8849 9.25188 13.8683 9.27414C13.2978 10.0955 12.8821 11.0143 12.642 11.9852C11.8704 11.9198 11.1005 11.8322 10.3325 11.7222C10.5306 11.4598 10.7465 11.2114 10.9787 10.9787ZM10.3325 20.2778C11.0995 20.1671 11.8688 20.0795 12.6403 20.015C12.779 20.5313 12.9579 21.0359 13.1752 21.5243C13.3737 21.9738 13.6235 22.3988 13.9195 22.7909C12.4889 22.3521 11.2334 21.4726 10.3325 20.2778V20.2778ZM21.0213 21.0213C20.2006 21.8427 19.191 22.4503 18.0809 22.7908C18.0977 22.769 18.115 22.7481 18.1317 22.7259C18.7022 21.9045 19.1179 20.9857 19.358 20.0148C20.1296 20.0802 20.8995 20.1678 21.6675 20.2778C21.4694 20.5402 21.2535 20.7886 21.0213 21.0213V21.0213Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
            </div>
            {/* Loggin-mb */}
            {token ? (
              ""
            ) : (
              <>
                <div className="mddd:hidden flex items-center justify-center gap-2">
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
                          onClick={() => handleReturnToLoggin(1)}
                        >
                          Đăng nhập
                        </p>
                        <p
                          className="h-[24px] w-[198px] cursor-pointer text-[16px] text-[#0b4d8d]"
                          onClick={() => handleReturnToLoggin(2)}
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
            <div
              className="text-2xl sm:hidden hover:cursor-pointer"
              onClick={() => setIsOpenMenu(true)}
            >
              <AiOutlineMenu />
            </div>
          </div>
        </div>
      </MyLayout>
    </div>
  );
}

export default HeaderMenuTop;
