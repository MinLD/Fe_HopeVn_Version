"use client";
import { LayoutDashboard, LogOut, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { useStateStore } from "@/app/context/StoreProvider";
type Props = {
  isSidebarOpen: boolean;
  data: {
    title: string;
    label: {
      id: string;
      name: string;
      icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
    }[];
  }[];
};

function Sibar({ isSidebarOpen, data }: Props) {
  const router = useRouter();
  const { setTypeSibar, isTypeSibar } = useStateStore();
  return (
    <div>
      <div
        className={`h-screen bg-[#1a202c] text-white  transition-all duration-300 flex flex-col ${
          isSidebarOpen
            ? "translate-x-0 w-70"
            : "-translate-x-full w-0 overflow-hidden"
        }`}
      >
        <div className="flex items-center justify-center w-full h-[80px] border-b-1 border-gray-600">
          <span className="text-xl font-bold">COREUI REACT.JS</span>
        </div>
        <div className="flex-1 mt-5 overflow-y-auto ">
          <div
            className="flex gap-2 items-center p-3 bg-[#2a303d] rounded px-2 -y-1 hover:cursor-pointer"
            onClick={() => router.push("/")}
          >
            <LayoutDashboard /> <p>Dashboard</p>
          </div>

          <div className="flex flex-col gap-2 p-2 mt-4">
            {data.map((i) => (
              <div key={i.title}>
                <div className="text-xs font-medium uppercase text-gray-400 mb-2">
                  {i.title}
                </div>

                {i.label.map((j) => (
                  <div
                    onClick={() => setTypeSibar(j?.id)}
                    key={j.id}
                    className=" gap-2 flex items-center  w-full  border-gray-600 hover:bg-[#2a303d] rounded hover:cursor-pointer"
                  >
                    <div className="mt-2 space-y-1 ">
                      <div className="gap-4 flex items-center justify-between w-full p-2 ">
                        <span>
                          <j.icon />
                        </span>
                        <span>{j.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center w-full h-[50px] border-t-1 border-gray-600 px-7  ">
          {" "}
          <span className="text-xl font-bold  ml-auto">
            <form action="/api/logout" method="POST">
              <button type="submit" className="hover:cursor-pointer">
                <LogOut size={25} />
              </button>
            </form>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Sibar;
