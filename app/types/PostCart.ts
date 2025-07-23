export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'business' | 'admin';
  avatar?: string;
  verified: boolean;
  createdAt: string;
}

export interface HelpPost {
  id: string;
  authorId: string;
  author: User;
  title: string;
  description: string;
  type: 'free' | 'reimbursement';
  targetAmount?: number;
  currentAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  category: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  urgent: boolean;
}

export interface Contribution {
  id: string;
  postId: string;
  contributorId: string;
  contributor: User;
  amount: number;
  type: 'donation' | 'business_help';
  description: string;
  status: 'pending' | 'approved' | 'completed';
  createdAt: string;
}

export interface JobPost {
  id: string;
  employerId: string;
  employer: User;
  title: string;
  description: string;
  location: string;
  salary: string;
  requirements: string[];
  benefits: string[];
  isRemote: boolean;
  isFlexible: boolean;
  status: 'active' | 'filled' | 'closed';
  createdAt: string;
}

export interface Product {
  id: string;
  sellerId: string;
  seller: User;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  createdAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reporter: User;
  targetType: 'post' | 'product' | 'job' | 'user';
  targetId: string;
  reason: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}