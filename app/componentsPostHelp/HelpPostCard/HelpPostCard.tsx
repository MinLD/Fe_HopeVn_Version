import React from "react";
import { Heart, DollarSign, Clock, AlertCircle, Flag } from "lucide-react";
import { HelpPost } from "@/app/types/PostCart";
import Image from "next/image";

interface HelpPostCardProps {
  post: HelpPost;
  onContribute?: (post: HelpPost) => void;
  onReport?: (post: HelpPost) => void;
  currentUserRole?: string;
}

export const HelpPostCard: React.FC<HelpPostCardProps> = ({
  post,
  onContribute,
  onReport,
  currentUserRole,
}) => {
  const progressPercentage = post.targetAmount
    ? Math.min((post.currentAmount / post.targetAmount) * 100, 100)
    : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {post.images.length > 0 && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <Image
            width={0}
            height={0}
            src={post.images[0]}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {post.urgent && <AlertCircle className="h-4 w-4 text-red-500" />}
              <span
                className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                  post.status
                )}`}
              >
                {post.status}
              </span>
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                {post.type}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
              {post.description}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 font-medium text-sm">
              {post.author.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {post.author.name}
            </p>
            <p className="text-xs text-gray-500">{post.category}</p>
          </div>
        </div>

        {post.type === "reimbursement" && post.targetAmount && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>
                ${post.currentAmount.toLocaleString()} / $
                {post.targetAmount.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex space-x-2">
            {currentUserRole !== "admin" && onReport && (
              <button
                onClick={() => onReport(post)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                title="Report post"
              >
                <Flag className="h-4 w-4" />
              </button>
            )}

            {onContribute &&
              post.status === "approved" &&
              post.type === "reimbursement" && (
                <button
                  onClick={() => onContribute(post)}
                  className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                >
                  <DollarSign className="h-4 w-4" />
                  <span>Contribute</span>
                </button>
              )}

            {onContribute &&
              post.status === "approved" &&
              post.type === "free" && (
                <button
                  onClick={() => onContribute(post)}
                  className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                >
                  <Heart className="h-4 w-4" />
                  <span>Help</span>
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
