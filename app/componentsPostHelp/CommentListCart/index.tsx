import { Ty_dataCommentPost } from "@/app/types/post";
import { formatDistanceToNowStrict } from "date-fns";
import { vi } from "date-fns/locale";
import { User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
type prop = {
  data: Ty_dataCommentPost;
};
function CommentListCart({ data: post }: prop) {
  const [timeAgo, setTimeAgo] = useState("");
  useEffect(() => {
    const date = new Date(post.createdAt);

    // Hàm để cập nhật thời gian
    const update = () => {
      const timeString = formatDistanceToNowStrict(date, {
        addSuffix: true, // Thêm "trước" hoặc "sau"
        locale: vi, // Sử dụng tiếng Việt
      });
      setTimeAgo(timeString);
    };

    // Cập nhật lần đầu tiên ngay khi component được render
    update();

    // Thiết lập một interval để cập nhật thời gian mỗi phút
    const intervalId = setInterval(update, 60000); // 60000ms = 1 phút

    // Dọn dẹp interval khi component bị hủy để tránh rò rỉ bộ nhớ
    return () => clearInterval(intervalId);
  }, [post.createdAt]); // Chạy lại effect nếu timestamp thay đổi

  // Nếu timeAgo chưa được tính, có thể hiển thị một placeholder
  if (!timeAgo) {
    return null;
  }
  return (
    <>
      <div key={post.id} className="flex space-x-3">
        {post.userProfilePicture ? (
          <Image
            width={40}
            height={40}
            src={post.userProfilePicture || ""}
            alt={post.userName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <User />
          </div>
        )}
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-medium text-gray-900">{post.userName}</h4>
              <span className="text-sm text-gray-500">{timeAgo}</span>
            </div>
            <p className="text-gray-600 leading-relaxed">{post.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentListCart;
