import React, { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { vi } from "date-fns/locale";
import { MapPin, Calendar, Heart, MessageCircle, Target } from "lucide-react";

import Card from "@/app/ui/Card";

import Badge from "@/app/ui/Badge";

import ImageCarousel from "@/app/componentsPostHelp/ImageCarousel";
import { Ty_PostVolunteer } from "@/app/components/PendingCompanyCard";
import { toast } from "sonner";
import Button from "@/app/ui/Button";
import DonateCart from "@/app/components/DonateCart";
import { patchLikePostVolunteer } from "@/app/service/User";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PostCardProps {
  post: Ty_PostVolunteer;
  token: string;
  onClick?: () => void;
}

const VolunteerCard: React.FC<PostCardProps> = ({ post, token, onClick }) => {
  const router = useRouter();
  const [isDonated, setDonated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // const [reactions, setReactions] = useState(post.reactions);

  // State để lưu trữ chuỗi thời gian đã định dạng
  const [timeAgo, setTimeAgo] = useState("");

  // const handleActive = async () => {
  //   setIsLoading(true);
  //   await ActivePostVolunteer(token, post.id, Number(isFund))
  //     .then(() => {
  //       toast.success("Phê duyệt bài viết thành công!");
  //       setIsLoading(false);
  //       window.location.reload();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(err.response.data.message);
  //       setIsLoading(false);
  //     });
  // };
  useEffect(() => {
    const date = new Date(post.createAt);

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
  }, [post.createAt]); // Chạy lại effect nếu timestamp thay đổi

  // Nếu timeAgo chưa được tính, có thể hiển thị một placeholder
  if (!timeAgo) {
    return null;
  }
  const handleLike = async () => {
    if (!token) {
      toast.warning("Vui lòng đăng nhập để được like bài viết!");
      router.push("/authenticate/loggin");
    }
    await patchLikePostVolunteer(token, post.id)
      .then((res) => {
        console.log(res);
        router.refresh();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  };
  const getProgressPercentage = () => {
    if (post.fund && post.totalAmount) {
      return Math.min(
        (Number(post.totalAmount) / Number(post.fund)) * 100,
        100
      );
    }
    return 0;
  };

  // const handleReaction = (type: keyof typeof reactions) => {
  //   setReactions((prev) => ({
  //     ...prev,
  //     [type]: prev[type] + 1,
  //   }));
  // };

  return (
    <Card hover className="transition-all duration-200">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start space-x-3">
          <Image
            width={40}
            height={40}
            src={
              post.userPic ||
              "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            }
            alt={post.name}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center  mb-1">
              <h4 className="font-medium text-gray-900 truncate">
                {post.name}
              </h4>{" "}
              <Badge className="capitalize" variant="default" size="sm">
                {post.active && "Hoàn vốn"}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {timeAgo}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {post.location}
              </div>
            </div>
          </div>
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
              className="text-green-600 hover:text-green-700 text-sm font-medium mt-1"
            >
              {isExpanded ? "Thu lại" : "Đọc thêm"}
            </button>
          )}
        </div>

        {/* Progress Bar for Help Requests */}
        {post.fund && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Tiến triển
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
                Đã quyên góp: {Number(post.totalAmount).toLocaleString() || 0}{" "}
                VND
              </span>
              <span className="text-gray-600 flex items-center">
                <Target className="w-4 h-4 mr-1" />
                Mục tiêu: {Number(post.fund).toLocaleString() || 0} VND
              </span>
            </div>
          </div>
        )}

        {/* Amount for Donations */}
        {post.fund && (
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <span className="text-sm text-green-700">Đã quyên góp: </span>
              <span className="text-lg font-bold text-green-600 ml-2">
                {Number(post.totalAmount).toLocaleString() || 0} VND
              </span>
            </div>
          </div>
        )}

        {/* Images */}
        {post.files && post.files.length > 0 && (
          <ImageCarousel images={post.files || []} />
        )}

        {/* Reactions and Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
              onClick={handleLike}
            >
              <Heart className="w-5 h-5 mr-1" />
              <span className="text-sm">{post.like || 0}</span>
            </button>
            <button
              className="flex items-center text-gray-500 hover:text-green-600 transition-colors"
              onClick={onClick}
            >
              <MessageCircle className="w-5 h-5 mr-1" />
              <span className="text-sm">100</span>
            </button>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setDonated(true)}
            >
              Quyên góp
            </Button>
            {isDonated && (
              <DonateCart
                idPostVolunteer={post.id}
                onClose={() => setDonated(false)}
                token={token}
              />
            )}
            <Button variant="outline" size="sm">
              Xem chi tiết
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VolunteerCard;
