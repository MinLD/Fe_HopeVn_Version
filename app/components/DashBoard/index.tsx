"use client";

import HeaderDashBoard from "@/app/components/LayoutDashBoard/HeaderDashBoard";
import Sibar from "@/app/components/Sibar";
import React, { useState } from "react";

type Props = {
  data: {
    title: string;
    label: {
      id: string;
      name: string;
      icon: any;
    }[];
  }[];

  renderComponent: () => React.JSX.Element;
};
function DashBoard({ data, renderComponent }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-x-hidden">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "md:w-70 w-0" : "w-0"
        }   transition-all duration-300 fixed top-0 left-0 h-screen overflow-y-auto z-20`}
      >
        <Sibar isSidebarOpen={isSidebarOpen} data={data.length ? data : []} />
      </div>

      <div className={`md:hidden`}>
        <div
          className={`fixed inset-0 bg-gray-900 opacity-20 z-30 ${
            isSidebarOpen ? "block" : "hidden"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        <div
          className={`fixed inset-0 z-30 transition-all duration-300  ${
            isSidebarOpen ? "translate-x-0 w-70" : "-translate-x-full"
          }`}
        >
          <Sibar isSidebarOpen={isSidebarOpen} data={data.length ? data : []} />
        </div>
      </div>
      {/* Nội dung chính */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "md:ml-70 ml-0" : "ml-0"
        }`}
      >
        {/* Header: Cố định ở đầu */}
        <div
          className={`fixed top-0 ${
            isSidebarOpen ? "md:left-70 left-0" : "left-0"
          } right-0 z-10 bg-white shadow transition-all duration-300 `}
        >
          <HeaderDashBoard
            isOpenSibar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>

        {/* Nội dung chính: Cuộn độc lập */}
        <div className="pt-35 px-2 bg-gray-100 flex-1 overflow-y-auto mt-2">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
