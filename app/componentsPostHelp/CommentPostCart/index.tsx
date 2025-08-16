"use client";

import { CommentPost } from "@/app/service/User";
import { X, Send, FileText } from "lucide-react";
import React, { useEffect } from "react";

type CommentPostCardProps = {
  children: React.ReactNode;
  onClose: () => void;
  authorName: string;
  id: number;
  token: string;
};

function CommentPostCard({
  children,
  onClose,
  authorName,
  id,
  token,
}: CommentPostCardProps) {
  const [isComment, setIsComment] = React.useState<string>("");
  const handleComment = () => {
    // await CommentPost(token, id, isComment || "")
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  // Xử lý đóng modal khi nhấn phím Escape
  // useEffect(() => {
  //   const handleEsc = (event: KeyboardEvent) => {
  //     if (event.key === "Escape") {
  //       // handleComment;
  //       // onClose();
  //     }
  //   };
  //   window.addEventListener("keydown", handleEsc);

  //   // Dọn dẹp event listener khi component bị hủy
  //   return () => {
  //     window.removeEventListener("keydown", handleEsc);
  //   };
  // }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm"
      onClick={onClose} // Đóng modal khi nhấp vào lớp phủ
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()} // Ngăn việc đóng modal khi nhấp vào nội dung bên trong
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Bài viết của {authorName}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 flex-grow">
          {children}
          <div className="mt-4 min-h-[100px] ">
            <div className="flex justify-center flex-col items-center">
              <svg
                viewBox="0 0 112 112"
                width="112"
                height="112"
                className="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq"
              >
                <defs>
                  <clipPath id="a">
                    <path
                      fill="none"
                      d="M94.38 98.59H21.51V11.18h44.55l28.32 23.45v63.96z"
                    ></path>
                  </clipPath>
                </defs>
                <g clipPath="url(#a) ">
                  <path
                    fill="#bcc0c4"
                    d="M94.38 98.59H21.51V11.18h44.55l28.32 23.45v63.96z"
                  ></path>
                  <path
                    fill="#009966"
                    d="M65.94 8.72h32.27v25.95H73a7 7 0 0 1-7-7V8.72h-.06z"
                  ></path>
                </g>
                <rect
                  width="57.1"
                  height="3.51"
                  x="29.39"
                  y="47.67"
                  fill="#fff"
                  rx="1.68"
                ></rect>
                <rect
                  width="57.1"
                  height="3.51"
                  x="29.39"
                  y="58.2"
                  fill="#fff"
                  rx="1.68"
                ></rect>
                <rect
                  width="57.1"
                  height="3.51"
                  x="29.39"
                  y="68.73"
                  fill="#fff"
                  rx="1.68"
                ></rect>
              </svg>
              <p className="text-[#B0B3B8] text-[20px]">
                Chưa có bình luận nào
              </p>
              <p className="text-[#B0B3B8] text-[17px]">
                Hãy là người đầu tiên bình luận.
              </p>
            </div>
          </div>
        </div>

        {/* Comment Input Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <form className="flex items-center space-x-3">
            <input
              // onChange={(e) => setIsComment(e.target.value || "")}
              type="text"
              placeholder="Viết bình luận của bạn..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <button
              // onClick={handleComment}
              className="bg-[#009966] text-white p-2 rounded-full hover:bg-[#009988] transition-transform active:scale-95"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* CSS cho animation */}
      <style jsx global>{`
        @keyframes fade-in-scale {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default CommentPostCard;
