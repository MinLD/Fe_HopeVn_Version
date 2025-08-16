"use client";

import { CircleUser, LogOut, Wallet } from "lucide-react";

const dataCategoryInHeaderTop = [
  {
    id: 3,
    name: "Quản lý thanh toán",
    icon: Wallet,
  },
  {
    id: 4,
    name: "Quản lý tài khoản",
    icon: CircleUser,
  },
  {
    id: 5,
    name: "Đăng xuất",
    icon: LogOut,
  },
];

const dataUpdateProfile = [
  {
    id: 0,
    label: "Họ và tên đầy đủ",
    name: "fullName",
    type: "text",
  },
  {
    id: 1,
    label: "E-mail",
    name: "email",
    type: "email",
  },
  {
    id: 2,
    label: "Số điện thoại",
    name: "phone",
    type: "text",
  },
  {
    id: 3,
    label: "Ngày sinh",
    name: "dob",
    type: "date",
  },
  {
    id: 6,
    label: "Giới tính",
    name: "gender",
    type: "text",
  },
  {
    id: 4,
    label: "Địa chỉ",
    name: "address",
    type: "text",
  },
  {
    id: 5,
    label: "Thành phố",
    name: "city",
    type: "text",
  },
];

export const mockJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "VinTech Solutions",
    location: "Ho Chi Minh City",
    salary: "15-25 million VND",
    description:
      "We are looking for a talented Frontend Developer to join our growing team. You will work on modern web applications using React and TypeScript.",
    requirements: ["React", "TypeScript", "Tailwind CSS"],
    benefits: [
      "Health insurance",
      "Flexible working hours",
      "Remote work options",
    ],
    industry: "Technology",
    urgent: false,
    postedAt: new Date("2025-01-20"),
    employerId: "emp1",
    applicants: 12,
  },
  {
    id: "2",
    title: "Restaurant Service Staff",
    company: "Pho Saigon",
    location: "Hanoi",
    salary: "8-12 million VND",
    description:
      "Immediate hiring for restaurant service staff. No experience required, training provided.",
    requirements: ["Good communication", "Customer service attitude"],
    benefits: ["Meals provided", "Tips", "Performance bonus"],
    industry: "Food & Beverage",
    urgent: true,
    postedAt: new Date("2025-01-19"),
    employerId: "emp2",
    applicants: 28,
  },
  {
    id: "3",
    title: "Delivery Driver",
    company: "GrabFood Vietnam",
    location: "Da Nang",
    salary: "10-18 million VND",
    description:
      "Join our delivery team and earn flexible income. Own motorbike required.",
    requirements: ["Valid driving license", "Own motorbike", "Smartphone"],
    benefits: ["Flexible schedule", "Fuel allowance", "Insurance coverage"],
    industry: "Logistics",
    urgent: true,
    postedAt: new Date("2025-01-18"),
    employerId: "emp3",
    applicants: 45,
  },
];

export const mockPosts = [
  {
    id: "1",
    type: "help-request",
    title: "Need funds for mother's surgery",
    description:
      "My mother needs urgent heart surgery. We have spent all our savings on medications and initial treatments. Any help would be deeply appreciated.",
    images: [
      "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg",
      "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg",
    ],
    location: "Ho Chi Minh City",
    amount: 15000000,
    target: 50000000,
    urgent: true,
    category: "Medical",
    authorId: "user1",
    author: {
      name: "Nguyen Van Duc",
      avatar:
        "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
    },
    postedAt: new Date("2025-01-20"),
    reactions: { heart: 124, pray: 89, support: 56 },
    comments: 23,
    status: "active",
  },
  {
    id: "2",
    type: "giveaway",
    title: "Free rice for 100 families",
    description:
      "Our community group has prepared 100 bags of rice (5kg each) for families in need. First come, first served.",
    images: [
      "https://images.pexels.com/photos/1567558/pexels-photo-1567558.jpeg",
    ],
    location: "Hanoi",
    urgent: false,
    category: "Food",
    authorId: "user2",
    author: {
      name: "Tran Thi Mai",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    postedAt: new Date("2025-01-19"),
    reactions: { heart: 89, pray: 45, support: 78 },
    comments: 12,
    status: "active",
  },
  {
    id: "3",
    type: "donation",
    title: "Donated 500,000 VND for flood victims",
    description:
      "I contributed to relief efforts for recent flood victims in Quang Nam. Sharing to inspire others to help.",
    images: [
      "https://images.pexels.com/photos/6995212/pexels-photo-6995212.jpeg",
    ],
    location: "Quang Nam",
    amount: 500000,
    urgent: false,
    category: "Disaster Relief",
    authorId: "user3",
    author: {
      name: "Le Minh Quan",
      avatar:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
    },
    postedAt: new Date("2025-01-18"),
    reactions: { heart: 156, pray: 23, support: 67 },
    comments: 8,
    status: "completed",
  },
];

export const vietnamProvinces = [
  "Ho Chi Minh City",
  "Hanoi",
  "Da Nang",
  "Hai Phong",
  "Can Tho",
  "Quang Nam",
  "Khanh Hoa",
  "Lam Dong",
  "Quang Ninh",
  "Dong Nai",
];

export const industries = [
  "Technology",
  "Food & Beverage",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Retail",
  "Logistics",
  "Construction",
  "Tourism",
  "Agriculture",
];

export const categories = [
  "Medical",
  "Food",
  "Education",
  "Disaster Relief",
  "Transportation",
  "Housing",
  "Clothing",
  "General Help",
];
export { dataCategoryInHeaderTop, dataUpdateProfile };
