"use client";
import React, { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar, Contact, Heart, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import Button from "@/app/ui/Button";
import Badge from "@/app/ui/Badge";
import { dataPost } from "@/app/types/post";
import ImageCarousel from "@/app/componentsPostHelp/ImageCarousel";
import { patchLikePost } from "@/app/service/User";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Spanning from "@/app/components/Spanning";
import { ActivePost } from "@/app/service/admin";
import { toast } from "sonner";

interface PostCardProps {
  post: dataPost;
  onClick?: () => void;
  type?: string;
  token?: string;
  admin?: boolean;
  handleGetAllPost?: () => void;
}
const PostCard: React.FC<PostCardProps> = ({
  post,
  onClick,
  token,
  admin = false,
  handleGetAllPost,
  type,
}) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hoverProfile, setHoverProfile] = useState(false);

  // Một hàm đơn giản để tạo slug từ tên
  const slugify = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng gạch ngang
      .normalize("NFD") // Chuẩn hóa Unicode để loại bỏ dấu
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9-]/g, ""); // Xóa các ký tự không hợp lệ
  };
  const profileSlug = `${slugify(post.name)}.${post.userId}`;

  // const [reactions, setReactions] = useState(post.reactions);
  const handleActive = async () => {
    // Kiểm tra xem prop có được truyền vào không
    if (!handleGetAllPost) return;

    setIsLoading(true);
    try {
      await ActivePost(token || "", post.id);
      toast.success("Phê duyệt bài viết thành công!");

      // Gọi lại hàm để tải lại danh sách
      await handleGetAllPost();
    } catch (err: any) {
      console.log(err);
      toast.error(err.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      // Dù thành công hay thất bại, luôn tắt trạng thái loading
      setIsLoading(false);
    }
  };

  // State để lưu trữ chuỗi thời gian đã định dạng
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
  const handleLike = async () => {
    if (!token) {
      toast.warning("Vui lòng đăng nhập để được like bài viết!");
      router.push("/authenticate/loggin");
      return;
    }
    await patchLikePost(token || "", post.id)
      .then(async (res) => {
        console.log(res);
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const handleAddMessagerBox = async () => {
  //   if (!token) {
  //     router.push("/authenticate/loggin");
  //     toast.warning("Vui lòng đăng nhập");
  //     return;
  //   }
  //   try {
  //     const response = await AddMessageBox(token as string, post.userId);
  //     console.log(response);
  //     if (response.status === 200) {
  //       toast.success(response.data.message);
  //       router.push("/message");
  //       return;
  //     }
  //     toast.error(response.data.message);
  //     return;
  //   } catch (err: any) {
  //     console.log(err);
  //     toast.error(err.response.data.message);
  //   }
  // };

  // const getProgressPercentage = () => {
  //   if (post.type === "help-request" && post.amount && post.target) {
  //     return Math.min((post.amount / post.target) * 100, 100);
  //   }
  //   return 0;
  // };

  // const handleReaction = (type: keyof typeof reactions) => {
  //   setReactions((prev) => ({
  //     ...prev,
  //     [type]: prev[type] + 1,
  //   }));
  // };

  const getPostTypeInfo = () => {
    switch (post.type) {
      case "help-request":
        return { color: "red", label: "Help Request" };
      case "donation":
        return { color: "green", label: "Donation" };
      case "giveaway":
        return { color: "blue", label: "Giveaway" };
      default:
        return { color: "gray", label: "Post" };
    }
  };

  const typeInfo = getPostTypeInfo();

  return (
    <div
      className={`${
        type !== "comment"
          ? "duration-200 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          : ""
      } p-4 `}
    >
      <div className="space-y-4">
        {/* Header */}
        <div
          className="flex items-start space-x-3 relative"
          onMouseLeave={() => setHoverProfile(false)}
        >
          <Link
            href={`account/profile/${profileSlug}`}
            className="cursor-pointer"
            onMouseEnter={() => setHoverProfile(true)}
          >
            {" "}
            {post.userPic ? (
              <>
                <Image
                  width={40}
                  height={40}
                  src={post?.userPic}
                  alt={post.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </>
            ) : (
              <>
                {" "}
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User />
                </div>
              </>
            )}
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-center  mb-1">
              <Link
                href={`account/profile/${profileSlug}`}
                onMouseEnter={() => setHoverProfile(true)}
              >
                <h4 className="font-medium text-gray-900 truncate hover:underline">
                  {post.name}
                </h4>{" "}
              </Link>
              <Badge
                variant={typeInfo.color as any}
                className="capitalize"
                size="sm"
              >
                {post.type || "type"}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {timeAgo}
              </div>
              {/* <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {post.location}
              </div> */}
            </div>
          </div>
          {hoverProfile && (
            <div
              className="absolute bottom-12  left-0 bg-white w-auto min-w-60 h-auto p-2 rounded-lg shadow-md"
              onMouseLeave={() => setHoverProfile(false)}
            >
              <div className="flex  gap-3">
                {post.userPic ? (
                  <>
                    <Image
                      width={40}
                      height={40}
                      src={post?.userPic}
                      alt={post.name}
                      className="w-15 h-15 rounded-full object-cover"
                    />
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <User />
                    </div>
                  </>
                )}
                <div className="space-y-2 flex flex-col ">
                  <h4 className="font-bold text-gray-900 text-xl truncate ">
                    {post.name}
                  </h4>{" "}
                  <Link href={`account/profile/${profileSlug}`}>
                    <Button
                      icon={Contact}
                      variant="primary"
                      size="sm"
                      className="cursor-pointer"
                    >
                      Xem trang cá nhân
                    </Button>
                  </Link>
                  {/* < 
                    icon={MessageCircleMore}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddMessagerBox()}
                    className="cursor-pointer"
                  >
                    Nhắn tin
                  </> */}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Title and Category */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {post.title}
          </h3>
        </div>

        {/* Description */}
        <div>
          <p className="text-gray-600 leading-relaxed">
            {isExpanded
              ? post.content
              : `${post.content.slice(0, 150)}${
                  post.content.length > 150 ? "..." : ""
                }`}
          </p>
          {post.content.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-green-600 hover:text-green-700 text-sm font-medium mt-1 cursor-pointer"
            >
              {isExpanded ? "Thu lại" : "Đọc thêm"}
            </button>
          )}
        </div>

        {/* Progress Bar for Help Requests */}
        {/* {post.type === "help-request" && post.target && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress
              </span>

              
              <span className="text-sm text-gray-500">
                {Math.round(getProgressPercentage())}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Raised: {formatCurrency(post.amount || 0)}
              </span>
              <span className="text-gray-600 flex items-center">
                <Target className="w-4 h-4 mr-1" />
                Goal: {formatCurrency(post.target)}
              </span>
            </div>
          </div>
        )} */}

        {/* Amount for Donations */}
        {/* {post.type === "donation" && post.amount && (
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <span className="text-sm text-green-700">Donated: </span>
              <span className="text-lg font-bold text-green-600 ml-2">
                {formatCurrency(post.amount)}
              </span>
            </div>
          </div>
        )} */}

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <ImageCarousel images={post.images} />
        )}

        {/* Reactions and Actions */}
        {!admin && (
          <div className="flex items-center justify-between pt-2 ">
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center text-gray-500 hover:text-red-500 transition-colors cursor-pointer "
                onClick={handleLike}
              >
                <Heart className="w-5 h-5 mr-1 hover:scale-105" />
                <span className="text-sm">{post.like || 0} </span>
              </button>
              <button
                className="flex items-center text-gray-500 hover:text-green-600 transition-colors cursor-pointer"
                onClick={onClick}
              >
                <MessageCircle className="w-5 h-5 mr-1" />
                <span className="text-sm">10</span>
              </button>
            </div>

            <div className="flex space-x-2">
              {post.type === "help-request" && (
                <Link href={`/help/${post.id}`}>
                  <Button variant="primary" size="sm">
                    View Details
                  </Button>
                </Link>
              )}
              {/* {post.type === "giveaway" && (
              <Link href={`/help/${post.id}`}>
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
              </Link>
            )} */}
              {/* {post.type === "donation" && (
              <Link href={`/help/${post.id}`}>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
            )} */}
              {/* <Link href={`/profile/${post.authorId}`}>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </Link> */}
            </div>
          </div>
        )}
        {admin && (
          <>
            <div
              className="flex space-x-2 items-center "
              onClick={handleActive}
            >
              <Button variant="primary" size="sm">
                {isLoading ? <Spanning /> : "Duyệt bài viết"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;
