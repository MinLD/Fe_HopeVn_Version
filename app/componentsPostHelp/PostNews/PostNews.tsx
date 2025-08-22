"use client";
import { ContributeModal } from "@/app/componentsPostHelp/ContributeModal/ContributeModal";
import { HelpPostCard } from "@/app/componentsPostHelp/HelpPostCard/HelpPostCard";
import { ReportModal } from "@/app/componentsPostHelp/ReportModal/ReportModal";

import { HelpPost } from "@/app/types/PostCart";
import { Search } from "lucide-react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

type Props = {
  onClick?: () => void;
};
function PostNews({ onClick = () => {} }: Props) {
  const [posts, setPosts] = useState<HelpPost[]>([
    {
      id: "1",
      authorId: "2",
      author: {
        id: "2",
        email: "patient@example.com",
        name: "John Patient",
        role: "patient",
        verified: true,
        createdAt: "2024-01-02T00:00:00Z",
      },
      title: "Emergency Surgery Required",
      description:
        "I need urgent help with funding for emergency heart surgery. The procedure costs $25,000 and I have exhausted all my resources.",
      type: "reimbursement",
      targetAmount: 25000,
      currentAmount: 12500,
      status: "approved",
      category: "Medical Treatment",
      images: [
        "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      urgent: true,
    },
    {
      id: "2",
      authorId: "2",
      author: {
        id: "2",
        email: "patient@example.com",
        name: "John Patient",
        role: "patient",
        verified: true,
        createdAt: "2024-01-02T00:00:00Z",
      },
      title: "Emergency Surgery Required",
      description:
        "I need urgent help with funding for emergency heart surgery. The procedure costs $25,000 and I have exhausted all my resources.",
      type: "reimbursement",
      targetAmount: 25000,
      currentAmount: 12500,
      status: "approved",
      category: "Medical Treatment",
      images: [
        "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      urgent: true,
    },
    {
      id: "3",
      authorId: "2",
      author: {
        id: "2",
        email: "patient@example.com",
        name: "John Patient",
        role: "patient",
        verified: true,
        createdAt: "2024-01-02T00:00:00Z",
      },
      title: "Emergency Surgery Required",
      description:
        "I need urgent help with funding for emergency heart surgery. The procedure costs $25,000 and I have exhausted all my resources.",
      type: "reimbursement",
      targetAmount: 25000,
      currentAmount: 12500,
      status: "approved",
      category: "Medical Treatment",
      images: [
        "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      urgent: true,
    },
    {
      id: "4",
      authorId: "2",
      author: {
        id: "2",
        email: "patient@example.com",
        name: "John Patient",
        role: "patient",
        verified: true,
        createdAt: "2024-01-02T00:00:00Z",
      },
      title: "Emergency Surgery Required",
      description:
        "I need urgent help with funding for emergency heart surgery. The procedure costs $25,000 and I have exhausted all my resources.",
      type: "reimbursement",
      targetAmount: 25000,
      currentAmount: 12500,
      status: "approved",
      category: "Medical Treatment",
      images: [
        "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      urgent: true,
    },
    {
      id: "5",
      authorId: "2",
      author: {
        id: "2",
        email: "patient@example.com",
        name: "Sarah Johnson",
        role: "patient",
        verified: true,
        createdAt: "2024-01-03T00:00:00Z",
      },
      title: "Transportation Help for Treatment",
      description:
        "Looking for volunteers to help with transportation to weekly dialysis treatments. I live 40 miles from the nearest clinic.",
      type: "free",
      targetAmount: 0,
      currentAmount: 0,
      status: "approved",
      category: "Transportation",
      images: [],
      createdAt: "2024-01-14T09:00:00Z",
      updatedAt: "2024-01-14T09:00:00Z",
      urgent: false,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  setSearchTerm("");
  const [selectedCategory, setSelectedCategory] = useState("");
  setSelectedCategory("");
  const [selectedType, setSelectedType] = useState("");
  setSelectedType("");
  const [selectedPost, setSelectedPost] = useState<HelpPost | null>(null);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || post.category === selectedCategory;
    const matchesType = !selectedType || post.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });
  const handleContribute = (post: HelpPost) => {
    setSelectedPost(post);
    setShowContributeModal(true);
  };

  const handleReport = (post: HelpPost) => {
    setSelectedPost(post);
    setShowReportModal(true);
  };

  const handleContributionSubmit = (amount: number) => {
    if (selectedPost) {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === selectedPost.id
            ? { ...post, currentAmount: post.currentAmount + amount }
            : post
        )
      );
    }
    setShowContributeModal(false);
    setSelectedPost(null);
  };

  return (
    <div>
      <div className="flex h-auto w-full flex-col gap-5 rounded-lg">
        <div className="flex items-center gap-2" onClick={onClick}>
          <FaUserCircle size={50} />
          <p className="w-[100%] rounded-3xl pl-2 text-[#94979b] outline-none">
            {/* What's on your mind  */}
          </p>
        </div>

        <div className="h-[1px] w-[100%] border-b-1 border-[#e1e1e1] mb-5"></div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <HelpPostCard
            key={post.id}
            post={post}
            onContribute={handleContribute}
            onReport={handleReport}
            currentUserRole={"patient"}
          />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No requests found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or create a new request.
          </p>
        </div>
      )}

      <ContributeModal
        isOpen={showContributeModal}
        onClose={() => setShowContributeModal(false)}
        post={selectedPost}
        onSubmit={handleContributionSubmit}
      />

      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        targetType="post"
        targetId={selectedPost?.id || ""}
        onSubmit={() => setShowReportModal(false)}
      />
    </div>
  );
}

export default PostNews;
