"use client";

import CommentListCart from "@/app/componentsPostHelp/CommentListCart";
import {
  getAllCommentsPost,
  getAllCommentsPostVolunteer,
  CommentPost,
  CommentPostVolunteer,
} from "@/app/service/User";
import { Ty_dataCommentPost } from "@/app/types/post";
import { X, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { toast } from "sonner";

// --- Props của Component ---
type CommentPostCardProps = {
  children: React.ReactNode;
  onClose: () => void;
  authorName: string;
  id: number;
  token: string;
  type?: "post" | "postVolunteer";
};

// --- Component Skeleton cho trạng thái tải ---
export const PostSkeleton = () => (
  <div className="flex items-start space-x-4 p-2">
    <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse flex-shrink-0"></div>
    <div className="flex-grow">
      <div className="h-4 bg-gray-300 rounded-md w-1/3 animate-pulse mb-2"></div>
      <div className="h-3 bg-gray-200 rounded-md w-full animate-pulse"></div>
      <div className="h-3 bg-gray-200 rounded-md w-3/4 animate-pulse mt-1"></div>
    </div>
  </div>
);

// --- Component Chính ---
function CommentPostCard({
  children,
  onClose,
  authorName,
  id,
  token,
  type = "post",
}: CommentPostCardProps) {
  const [isComment, setIsComment] = useState<string>("");
  const Router = useRouter();

  // --- State cho Infinite Scroll ---
  const [dataComments, setDataComments] = useState<Ty_dataCommentPost[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // --- Hàm gọi API theo trang ---
  const fetchComments = useCallback(
    async (currentPage: number) => {
      setIsLoading(true);
      const size = 5; // Mỗi lần tải 10 bình luận
      // SỬA: Logic đảm bảo thời gian hiển thị tối thiểu
      const minimumDisplayTime = new Promise((resolve) =>
        setTimeout(resolve, 800)
      ); // 0.5 giây

      try {
        const apiCall =
          type === "post"
            ? getAllCommentsPost(token, id, currentPage, size)
            : getAllCommentsPostVolunteer(token, id, currentPage, size);

        // Chờ cả API và thời gian tối thiểu hoàn thành
        const [res] = await Promise.all([apiCall, minimumDisplayTime]);
        const newComments = res.data.result.data || [];
        console.log(res);
        setDataComments((prev) =>
          currentPage === 1 ? newComments : [...prev, ...newComments]
        );
        setHasMore(currentPage * size < res.data.result.totalElements); // API trả về 'last: true' ở trang cuối
        setPage(currentPage);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
        // Có thể thêm toast báo lỗi ở đây nếu cần
      } finally {
        setIsLoading(false);
      }
    },
    [id, token, type]
  );

  // --- Logic cho Intersection Observer ---
  const lastCommentRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // Khi thấy phần tử cuối, tải trang tiếp theo
          fetchComments(page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, page, fetchComments]
  );

  // --- Xử lý gửi bình luận mới ---
  const handleComment = async () => {
    if (!token) {
      toast.warning("Vui lòng đăng nhập để bình luận!");
      Router.push("/authenticate/login");
      return;
    }
    if (!isComment.trim()) return;

    const commentToSend = isComment;
    setIsComment("");

    try {
      const apiCall =
        type === "post"
          ? CommentPost(token, id, commentToSend)
          : CommentPostVolunteer(token, id, commentToSend);

      await apiCall;
      toast.success("Bình luận đã được gửi!");
      // Tải lại trang đầu tiên để hiển thị bình luận mới nhất ở trên cùng
      fetchComments(1);
    } catch (err) {
      console.error("Failed to post comment:", err);
      toast.error("Gửi bình luận thất bại.");
      setIsComment(commentToSend); // Trả lại nội dung cho người dùng
    }
  };

  // --- useEffect để tải dữ liệu lần đầu ---
  useEffect(() => {
    fetchComments(1);
  }, [fetchComments]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
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
        <div className="overflow-y-auto p-1 md:p-4 flex-grow">
          {children}
          <div className="mt-4 min-h-[100px]">
            <p className="text-gray-600 text-md mb-3">Bình luận</p>
            {dataComments.length > 0 ? (
              <div className="space-y-6">
                {dataComments.map((comment, index) => {
                  // Gắn ref vào phần tử cuối cùng để kích hoạt infinite scroll
                  if (dataComments.length === index + 1) {
                    return (
                      <div ref={lastCommentRef} key={comment.id}>
                        <CommentListCart data={comment} />
                      </div>
                    );
                  }
                  return (
                    <div key={comment.id}>
                      <CommentListCart data={comment} />
                    </div>
                  );
                })}
              </div>
            ) : (
              !isLoading && ( // Chỉ hiện khi không loading và không có comment
                <div className="flex justify-center flex-col items-center text-center text-gray-500 py-8">
                  {/* SVG icon */}
                  <p className="mt-2 font-semibold">Chưa có bình luận nào</p>
                  <p>Hãy là người đầu tiên bình luận.</p>
                </div>
              )
            )}

            {/* Hiển thị skeleton khi đang tải thêm */}
            {isLoading && (
              <div className="space-y-4 mt-4">
                <PostSkeleton />
                <PostSkeleton />
              </div>
            )}

            {/* Hiển thị khi đã hết bình luận */}
            {!hasMore && dataComments.length > 0 && (
              <p className="text-center text-gray-500 py-4">
                Đã xem hết bình luận.
              </p>
            )}
          </div>
        </div>

        {/* Comment Input Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleComment();
                }
              }}
              value={isComment}
              onChange={(e) => setIsComment(e.target.value)}
              type="text"
              placeholder="Viết bình luận của bạn..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 transition"
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
      {/* CSS cho animation (giữ nguyên) */}
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
