"use client";
import React, { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import PostNews from "@/app/componentsPostHelp/PostNews/PostNews";

export const HelpRequestsPage: React.FC = () => {
  // const { user } = useAuth();
  // const [posts, setPosts] = useState<HelpPost[]>([
  //   {
  //     id: "1",
  //     authorId: "2",
  //     author: {
  //       id: "2",
  //       email: "patient@example.com",
  //       name: "John Patient",
  //       role: "patient",
  //       verified: true,
  //       createdAt: "2024-01-02T00:00:00Z",
  //     },
  //     title: "Emergency Surgery Required",
  //     description:
  //       "I need urgent help with funding for emergency heart surgery. The procedure costs $25,000 and I have exhausted all my resources.",
  //     type: "reimbursement",
  //     targetAmount: 25000,
  //     currentAmount: 12500,
  //     status: "approved",
  //     category: "Medical Treatment",
  //     images: [
  //       "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800",
  //     ],
  //     createdAt: "2024-01-15T10:00:00Z",
  //     updatedAt: "2024-01-15T10:00:00Z",
  //     urgent: true,
  //   },
  //   {
  //     id: "2",
  //     authorId: "2",
  //     author: {
  //       id: "2",
  //       email: "patient@example.com",
  //       name: "Sarah Johnson",
  //       role: "patient",
  //       verified: true,
  //       createdAt: "2024-01-03T00:00:00Z",
  //     },
  //     title: "Transportation Help for Treatment",
  //     description:
  //       "Looking for volunteers to help with transportation to weekly dialysis treatments. I live 40 miles from the nearest clinic.",
  //     type: "free",
  //     targetAmount: 0,
  //     currentAmount: 0,
  //     status: "approved",
  //     category: "Transportation",
  //     images: [],
  //     createdAt: "2024-01-14T09:00:00Z",
  //     updatedAt: "2024-01-14T09:00:00Z",
  //     urgent: false,
  //   },
  // ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const categories = [
    "Điều trị y tế",
    "Medication",
    "Equipment",
    "Transportation",
    "Living Expenses",
    "Emergency",
    "Other",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Yêu cầu trợ giúp
          </h1>
          <p className="text-gray-600">
            Hỗ trợ những người có nhu cầu trong cộng đồng của bạn
          </p>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Yêu cầu tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Tất cả các danh mục</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Tất cả các loại</option>
            <option value="free">Giúp đỡ Miễn phí</option>
            <option value="reimbursement">Hoàn tiền</option>
          </select>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Filter className="h-4 w-4" />
            <span>Bộ lọc</span>
          </div>
        </div>
      </div>
      <PostNews />
    </div>
  );
};
