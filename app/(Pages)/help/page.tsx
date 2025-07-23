'use client';
import { HelpRequestsPage } from "@/app/componentsPostHelp/HelpRequestPages/HelpRequestsPage";
import PostNews from "@/app/componentsPostHelp/PostNews/PostNews";
import MyLayout from "@/app/Layout/MyLayOut";

function pages() {
  return (
    <div className=" bg-gray-50">
      <MyLayout>
        <HelpRequestsPage />
        <div className="border-1-[#e1e1e1] s:px-6 h-auto w-full rounded-2xl border px-3 shadow-2xl lg:px-5 xl:px-5 pt-5">
          <PostNews />
        </div>
      </MyLayout>
    </div>
  );
}

export default pages;
