// Giả sử PostSkeleton được import từ đây
import { PostSkeleton } from "@/app/componentsPostHelp/CommentPostCart";

// 2. Tạo component skeleton
function PostsLoadingSkeleton() {
  return (
    // Bọc trong div với class tương tự để giữ layout
    <div className="lg:col-span-3">
      <div className="space-y-4">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </div>
  );
}
export default PostsLoadingSkeleton;
