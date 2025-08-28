"use client";
import React, { useState } from "react";

import {
  Medal,
  Crown,
  Star,
  Heart,
  Trophy,
  Award,
  Users,
  TrendingUp,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Card from "@/app/ui/Card";
import Button from "@/app/ui/Button";
import Badge from "@/app/ui/Badge";
import Image from "next/image";

interface Contributor {
  id: string;
  name: string;
  avatar: string;
  location: string;
  joinDate: Date;
  stats: {
    totalDonations: number;
    peopleHelped: number;
    postsCreated: number;
    jobsPosted: number;
    communityScore: number;
  };
  badges: {
    type: "gold" | "silver" | "bronze" | "platinum";
    title: string;
    description: string;
    earnedDate: Date;
  }[];
  achievements: {
    icon: string;
    title: string;
    description: string;
    progress: number;
    maxProgress: number;
  }[];
}

const MedalsPages: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "leaderboard" | "achievements" | "badges"
  >("leaderboard");
  const [timeFilter, setTimeFilter] = useState<"all" | "month" | "year">("all");

  // Mock data for top contributors
  const topContributors: Contributor[] = [
    {
      id: "1",
      name: "Tran Thi Mai",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      location: "Ho Chi Minh City",
      joinDate: new Date("2023-01-15"),
      stats: {
        totalDonations: 25000000,
        peopleHelped: 45,
        postsCreated: 28,
        jobsPosted: 0,
        communityScore: 2850,
      },
      badges: [
        {
          type: "platinum",
          title: "Community Champion",
          description: "Helped over 40 people in need",
          earnedDate: new Date("2024-12-15"),
        },
        {
          type: "gold",
          title: "Generous Heart",
          description: "Donated over 20 million VND",
          earnedDate: new Date("2024-11-20"),
        },
      ],
      achievements: [
        {
          icon: "❤️",
          title: "Helper",
          description: "Help 50 people",
          progress: 45,
          maxProgress: 50,
        },
        {
          icon: "💰",
          title: "Big Donor",
          description: "Donate 30 million VND",
          progress: 25,
          maxProgress: 30,
        },
      ],
    },
    {
      id: "2",
      name: "Le Minh Quan",
      avatar:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
      location: "Hanoi",
      joinDate: new Date("2023-03-10"),
      stats: {
        totalDonations: 18000000,
        peopleHelped: 32,
        postsCreated: 22,
        jobsPosted: 8,
        communityScore: 2420,
      },
      badges: [
        {
          type: "gold",
          title: "Job Creator",
          description: "Posted 5+ job opportunities",
          earnedDate: new Date("2024-10-05"),
        },
        {
          type: "silver",
          title: "Community Builder",
          description: "Active member for 1+ year",
          earnedDate: new Date("2024-03-10"),
        },
      ],
      achievements: [
        {
          icon: "💼",
          title: "Job Creator",
          description: "Post 10 jobs",
          progress: 8,
          maxProgress: 10,
        },
        {
          icon: "🤝",
          title: "Connector",
          description: "Help 30 people find jobs",
          progress: 32,
          maxProgress: 30,
        },
      ],
    },
    {
      id: "3",
      name: "Nguyen Van Duc",
      avatar:
        "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
      location: "Da Nang",
      joinDate: new Date("2023-06-20"),
      stats: {
        totalDonations: 12000000,
        peopleHelped: 28,
        postsCreated: 15,
        jobsPosted: 3,
        communityScore: 1980,
      },
      badges: [
        {
          type: "silver",
          title: "Helping Hand",
          description: "Helped 25+ people",
          earnedDate: new Date("2024-09-12"),
        },
        {
          type: "bronze",
          title: "First Steps",
          description: "Made first donation",
          earnedDate: new Date("2023-07-01"),
        },
      ],
      achievements: [
        {
          icon: "📝",
          title: "Storyteller",
          description: "Create 20 posts",
          progress: 15,
          maxProgress: 20,
        },
        {
          icon: "🌟",
          title: "Rising Star",
          description: "Reach 2000 community score",
          progress: 1980,
          maxProgress: 2000,
        },
      ],
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case "platinum":
        return <Crown className="w-6 h-6 text-purple-500" />;
      case "gold":
        return <Medal className="w-6 h-6 text-yellow-500" />;
      case "silver":
        return <Award className="w-6 h-6 text-gray-400" />;
      case "bronze":
        return <Trophy className="w-6 h-6 text-orange-500" />;
      default:
        return <Star className="w-6 h-6 text-gray-400" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "platinum":
        return "bg-purple-100 border-purple-200";
      case "gold":
        return "bg-yellow-100 border-yellow-200";
      case "silver":
        return "bg-gray-100 border-gray-200";
      case "bronze":
        return "bg-orange-100 border-orange-200";
      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-8 h-8 text-yellow-500" />;
      case 1:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 2:
        return <Trophy className="w-8 h-8 text-orange-500" />;
      default:
        return <Star className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          {/* <Link
            href="/"
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link> */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Community Heroes
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Celebrating the amazing people who make our community stronger
              through their generosity, kindness, and dedication to helping
              others.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "leaderboard"
                  ? "bg-green-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab("achievements")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "achievements"
                  ? "bg-green-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Achievements
            </button>
            <button
              onClick={() => setActiveTab("badges")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "badges"
                  ? "bg-green-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Badges
            </button>
          </div>
        </div>

        {/* Time Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                timeFilter === "all"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setTimeFilter("year")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                timeFilter === "year"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              This Year
            </button>
            <button
              onClick={() => setTimeFilter("month")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                timeFilter === "month"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              This Month
            </button>
          </div>
        </div>

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="space-y-6">
            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {topContributors.slice(0, 3).map((contributor, index) => (
                <Card
                  key={contributor.id}
                  className={`text-center relative overflow-hidden ${
                    index === 0
                      ? "ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100"
                      : index === 1
                      ? "ring-2 ring-gray-400 bg-gradient-to-br from-gray-50 to-gray-100"
                      : "ring-2 ring-orange-400 bg-gradient-to-br from-orange-50 to-orange-100"
                  }`}
                >
                  <div className="absolute top-4 right-4">
                    {getRankIcon(index)}
                  </div>
                  <div className="pt-8">
                    <Image
                      width={200}
                      height={200}
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-white"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {contributor.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {contributor.location}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Community Score</span>
                        <span className="font-bold text-green-600">
                          {contributor.stats.communityScore.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">People Helped</span>
                        <span className="font-medium">
                          {contributor.stats.peopleHelped}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Donations</span>
                        <span className="font-medium">
                          {formatCurrency(contributor.stats.totalDonations)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Link href={`/profile/${contributor.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Full Leaderboard */}
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Community Leaderboard
              </h2>
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div
                    key={contributor.id}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold">
                      #{index + 1}
                    </div>
                    <Image
                      width={200}
                      height={200}
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {contributor.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {contributor?.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {contributor.stats.communityScore.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Community Score
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {contributor.badges
                        .slice(0, 2)
                        .map((badge, badgeIndex) => (
                          <div
                            key={badgeIndex}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${getBadgeColor(
                              badge.type
                            )}`}
                          >
                            {getBadgeIcon(badge.type)}
                          </div>
                        ))}
                    </div>
                    <Link href={`/profile/${contributor.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Available Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: "❤️",
                    title: "Helper",
                    description: "Help 50 people in need",
                    reward: "500 Community Points",
                    difficulty: "Medium",
                  },
                  {
                    icon: "💰",
                    title: "Big Donor",
                    description: "Donate over 30 million VND",
                    reward: "1000 Community Points",
                    difficulty: "Hard",
                  },
                  {
                    icon: "💼",
                    title: "Job Creator",
                    description: "Post 10 job opportunities",
                    reward: "300 Community Points",
                    difficulty: "Easy",
                  },
                  {
                    icon: "🤝",
                    title: "Connector",
                    description: "Help 30 people find jobs",
                    reward: "800 Community Points",
                    difficulty: "Medium",
                  },
                  {
                    icon: "📝",
                    title: "Storyteller",
                    description: "Create 20 meaningful posts",
                    reward: "400 Community Points",
                    difficulty: "Easy",
                  },
                  {
                    icon: "🌟",
                    title: "Rising Star",
                    description: "Reach 2000 community score",
                    reward: "600 Community Points",
                    difficulty: "Medium",
                  },
                  {
                    icon: "🏆",
                    title: "Community Legend",
                    description: "Help 100 people and donate 50M VND",
                    reward: "2000 Community Points",
                    difficulty: "Legendary",
                  },
                  {
                    icon: "🎯",
                    title: "Goal Achiever",
                    description: "Complete 5 fundraising goals",
                    reward: "700 Community Points",
                    difficulty: "Medium",
                  },
                  {
                    icon: "🔥",
                    title: "Streak Master",
                    description: "Help someone 30 days in a row",
                    reward: "900 Community Points",
                    difficulty: "Hard",
                  },
                ].map((achievement, index) => (
                  <Card
                    key={index}
                    className="text-center hover:shadow-md transition-shadow"
                  >
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {achievement.description}
                    </p>
                    <div className="space-y-2">
                      <Badge
                        variant={
                          achievement.difficulty === "Easy"
                            ? "success"
                            : achievement.difficulty === "Medium"
                            ? "warning"
                            : achievement.difficulty === "Hard"
                            ? "danger"
                            : "info"
                        }
                        size="sm"
                      >
                        {achievement.difficulty}
                      </Badge>
                      <p className="text-xs text-green-600 font-medium">
                        {achievement.reward}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Your Progress */}
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Progress
              </h2>
              <div className="space-y-4">
                {topContributors[0].achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {achievement.description}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              (achievement.progress / achievement.maxProgress) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {achievement.progress} / {achievement.maxProgress}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {Math.round(
                          (achievement.progress / achievement.maxProgress) * 100
                        )}
                        %
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === "badges" && (
          <div className="space-y-6">
            {/* Badge Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <Crown className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Platinum Badges
                </h3>
                <p className="text-sm text-gray-600">
                  Ultimate recognition for extraordinary contributions
                </p>
              </Card>
              <Card className="text-center">
                <Medal className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Gold Badges
                </h3>
                <p className="text-sm text-gray-600">
                  Outstanding achievements in community service
                </p>
              </Card>
              <Card className="text-center">
                <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Silver Badges
                </h3>
                <p className="text-sm text-gray-600">
                  Significant contributions to the community
                </p>
              </Card>
              <Card className="text-center">
                <Trophy className="w-12 h-12 text-orange-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Bronze Badges
                </h3>
                <p className="text-sm text-gray-600">
                  First steps in community involvement
                </p>
              </Card>
            </div>

            {/* All Badges */}
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                All Community Badges
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    type: "platinum",
                    title: "Community Champion",
                    description: "Helped over 40 people in need",
                    requirement: "Help 40+ people",
                    holders: 3,
                  },
                  {
                    type: "gold",
                    title: "Generous Heart",
                    description: "Donated over 20 million VND",
                    requirement: "Donate 20M+ VND",
                    holders: 8,
                  },
                  {
                    type: "gold",
                    title: "Job Creator",
                    description: "Posted 5+ job opportunities",
                    requirement: "Post 5+ jobs",
                    holders: 12,
                  },
                  {
                    type: "silver",
                    title: "Community Builder",
                    description: "Active member for 1+ year",
                    requirement: "1+ year membership",
                    holders: 45,
                  },
                  {
                    type: "silver",
                    title: "Helping Hand",
                    description: "Helped 25+ people",
                    requirement: "Help 25+ people",
                    holders: 28,
                  },
                  {
                    type: "bronze",
                    title: "First Steps",
                    description: "Made first donation",
                    requirement: "Make first donation",
                    holders: 156,
                  },
                  {
                    type: "bronze",
                    title: "Welcome Helper",
                    description: "Helped first person",
                    requirement: "Help first person",
                    holders: 234,
                  },
                  {
                    type: "bronze",
                    title: "New Member",
                    description: "Joined the community",
                    requirement: "Create account",
                    holders: 1250,
                  },
                ].map((badge, index) => (
                  <Card
                    key={index}
                    className={`border-2 ${getBadgeColor(
                      badge.type
                    )} hover:shadow-md transition-shadow`}
                  >
                    <div className="text-center">
                      <div className="flex justify-center mb-3">
                        {getBadgeIcon(badge.type)}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {badge.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {badge.description}
                      </p>
                      <div className="space-y-2">
                        <Badge variant="default" size="sm">
                          {badge.requirement}
                        </Badge>
                        <p className="text-xs text-gray-500">
                          {badge.holders} people earned this badge
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Community Impact Stats */}
        <Card className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Community Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">1,247</div>
              <div className="text-sm text-gray-600">People Helped</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">₫125M</div>
              <div className="text-sm text-gray-600">Total Donated</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">3,456</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">2</div>
              <div className="text-sm text-gray-600">Years Running</div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="max-w-2xl mx-auto">
            <Trophy className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-gray-600 mb-6">
              Join our community of heroes and start earning badges by helping
              others, creating jobs, and making positive contributions to
              society.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/help">
                <Button size="lg">Start Helping Others</Button>
              </Link>
              <Link href="/jobs">
                <Button variant="outline" size="lg">
                  Find Job Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MedalsPages;
