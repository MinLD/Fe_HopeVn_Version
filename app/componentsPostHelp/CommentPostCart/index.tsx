"use client";

import CommentListCart from "@/app/componentsPostHelp/CommentListCart";
import {
  CommentPost,
  CommentPostVolunteer,
  getAllCommentsPost,
  getAllCommentsPostVolunteer,
} from "@/app/service/User";
import { Ty_dataCommentPost } from "@/app/types/post";
import { X, Send } from "lucide-react";
import React, { useEffect } from "react";

type CommentPostCardProps = {
  children: React.ReactNode;
  onClose: () => void;
  authorName: string;
  id: number;
  token: string;
  type?: string;
};

function CommentPostCard({
  children,
  onClose,
  authorName,
  id,
  token,
  type = "post",
}: CommentPostCardProps) {
  const [isComment, setIsComment] = React.useState<string>("");
  // const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  // const [hasNextPage, setHasNextPage] = useState(true);
  // const observer = useRef<IntersectionObserver>(null);
  const [dataComments, setDataComments] = React.useState<Ty_dataCommentPost[]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleGetAllCommentsPost = async () => {
    setIsLoading(true);
    if (type === "post") {
      await getAllCommentsPost(token, id)
        .then((res) => {
          console.log(res.data.result);
          setDataComments(res.data.result.data);
          setIsLoading(false);
          return;
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          return;
        });
      return;
    }

    await getAllCommentsPostVolunteer(token, id)
      .then((res) => {
        console.log(res.data.result);
        setDataComments(res.data.result.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const handleComment = async () => {
    setIsLoading(true);
    if (type === "post") {
      await CommentPost(token, id, isComment || "")
        .then(async (res) => {
          console.log(res);
          await handleGetAllCommentsPost();
          setIsLoading(false);
          return;
        })
        .catch((err) => {
          console.log(err);
          return;
        });
      return;
    }
    await CommentPostVolunteer(token, id, isComment || "")
      .then(async (res) => {
        console.log(res);
        await handleGetAllCommentsPost();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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

  useEffect(() => {
    handleGetAllCommentsPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <p className="text-gray-600 text-md mb-3">
              bình luận ({dataComments.length || 0})
            </p>
            {dataComments.length > 0 ? (
              <>
                {isLoading ? (
                  <div className="space-y-4">
                    {/* Hiển thị 3 skeleton để tạo cảm giác đang tải nhiều bài */}
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                  </div>
                ) : (
                  <>
                    {" "}
                    <div className="space-y-6">
                      {dataComments.map((i) => (
                        <div key={i.id}>
                          <CommentListCart data={i} />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Comment Input Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <input
              onChange={(e) => setIsComment(e.target.value || "")}
              type="text"
              placeholder="Viết bình luận của bạn..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <button
              onClick={handleComment}
              className="bg-[#009966] text-white p-2 rounded-full hover:bg-[#009988] transition-transform active:scale-95"
            >
              <Send size={20} />
            </button>
          </div>
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

export const PostSkeleton = () => (
  <div className="w-full max-w-2xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md border border-gray-200 mb-6">
    <div className="flex items-center mb-4">
      {/* Avatar Skeleton */}
      <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
      <div className="ml-4 flex-grow">
        {/* Username Skeleton */}
        <div className="h-4 bg-gray-300 rounded-md w-1/3 animate-pulse mb-2"></div>
        {/* Timestamp Skeleton */}
        <div className="h-3 bg-gray-200 rounded-md w-1/4 animate-pulse"></div>
      </div>
    </div>
    {/* Content Skeleton */}
    <div className="space-y-3 mb-4">
      <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded-md w-5/6 animate-pulse"></div>
    </div>
    {/* Image Skeleton */}
    <div className="w-full h-64 bg-gray-300 rounded-lg animate-pulse"></div>
  </div>
);
