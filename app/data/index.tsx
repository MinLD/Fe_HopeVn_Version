"use client";
import { HelpPost } from "@/app/types/PostCart";
import { useState } from "react";

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
export { posts };
