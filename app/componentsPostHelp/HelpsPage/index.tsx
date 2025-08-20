"use client";
import { Ty_PostVolunteer } from "@/app/components/PendingCompanyCard";
import SearchFilter from "@/app/components/SearchFilter";
import Spanning from "@/app/components/Spanning";
import VolunteerCard from "@/app/components/VolunteerCart";
import CommentPostCart, {
  PostSkeleton,
} from "@/app/componentsPostHelp/CommentPostCart";
import CreatePost from "@/app/componentsPostHelp/CreatePost";
import PostCard from "@/app/componentsPostHelp/posts/PostCard";
import MyLayout from "@/app/Layout/MyLayOut";
import { dataPost } from "@/app/types/post";
import { Sprout } from "lucide-react";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface FilterState {
  search: string;
  location: string;
  industry: string;
  salaryMin: string;
  salaryMax: string;
  urgent: boolean;
}
type prop = {
  token: string | "";
  dataPost: dataPost[];
  dataPostVolunteer: Ty_PostVolunteer[];
  dataPostFree: dataPost[];
  dataPostRequestHelp: dataPost[];
  dataPostGive: dataPost[];
  isLoading: boolean;
};

function HelpPage({
  token,
  dataPost,
  dataPostVolunteer,
  dataPostFree,
  dataPostRequestHelp,
  dataPostGive,
  isLoading,
}: prop) {
  const [isComment, setIsComment] = useState<number>(-1);
  const navigate = useRouter();
  const [isClose, setClose] = useState<boolean>(false);
  // const getProfileUser = async (id: string) => {
  //   await getUserId(id).then((res) => {
  //     console.log(res);
  //     return res.data;
  //   });
  // };
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    location: "",
    industry: "",
    salaryMin: "",
    salaryMax: "",
    urgent: false,
  });
  const [selectedType, setSelectedType] = useState<
    "all" | "help-request" | "free" | "giveaway" | "Hoàn vốn"
  >("all");

  // const filteredPosts = useMemo(() => {
  //   return mockPosts.filter((post: JobPost) => {
  //     // Type filter
  //     if (selectedType !== "all" && post.type !== selectedType) {
  //       return false;
  //     }

  //     // Search filter
  //     if (filters.search) {
  //       const searchTerm = filters.search.toLowerCase();
  //       if (
  //         !post.title.toLowerCase().includes(searchTerm) &&
  //         !post.description.toLowerCase().includes(searchTerm) &&
  //         !post.author.name.toLowerCase().includes(searchTerm)
  //       ) {
  //         return false;
  //       }
  //     }

  //     // Location filter
  //     if (filters.location && post.location !== filters.location) {
  //       return false;
  //     }

  //     // Urgent filter
  //     if (filters.urgent && !post.urgent) {
  //       return false;
  //     }

  //     return true;
  //   });
  // }, [filters, selectedType]);

  const getTypeCount = (
    type: "all" | "help-request" | "free" | "giveaway" | "Hoàn vốn"
  ) => {
    switch (type) {
      case "all":
        return (
          <>
            {isLoading ? (
              <PostSkeleton />
            ) : (
              <>
                {dataPost &&
                  dataPost?.map((i, k) => (
                    <div key={k} className="mb-6">
                      <PostCard
                        key={i.id}
                        post={i}
                        onClick={() => setIsComment(i.id)}
                        token={token}
                      />
                      {isComment === i.id && (
                        <>
                          <CommentPostCart
                            authorName={i.name}
                            onClose={() => setIsComment(-1)}
                            id={i.id}
                            token={token}
                          >
                            <PostCard
                              token={token}
                              key={k}
                              post={i}
                              onClick={() => setIsComment(i.id)}
                            />
                          </CommentPostCart>
                        </>
                      )}
                    </div>
                  ))}

                {dataPost.length === 0 && (
                  <div className="flex flex-col justify-center items-center text-center p-10 bg-gray-50 rounded-lg">
                    <Sprout
                      size={80}
                      color="#10B981"
                      strokeWidth={1.5}
                      className="mb-4 text-emerald-500"
                    />
                    <h2 className="text-2xl font-semibold text-gray-700">
                      Chưa có bài viết nào
                    </h2>
                    <p className="text-gray-500 mt-2">
                      Hãy là người đầu tiên chia sẻ điều gì đó ý nghĩa!
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        );
      case "help-request":
        return (
          <>
            {isLoading ? (
              <PostSkeleton />
            ) : (
              <>
                {dataPostRequestHelp &&
                  dataPostRequestHelp?.map((i, k) => (
                    <div key={k} className="mb-6">
                      <PostCard
                        key={i.id}
                        post={i}
                        onClick={() => setIsComment(i.id)}
                        token={token}
                      />
                      {isComment === i.id && (
                        <>
                          <CommentPostCart
                            authorName={i.name}
                            onClose={() => setIsComment(-1)}
                            id={i.id}
                            token={token}
                          >
                            <PostCard
                              token={token}
                              key={k}
                              post={i}
                              onClick={() => setIsComment(i.id)}
                            />
                          </CommentPostCart>
                        </>
                      )}
                    </div>
                  ))}

                {dataPostRequestHelp.length === 0 && (
                  <div className="flex flex-col justify-center items-center text-center p-10 bg-gray-50 rounded-lg">
                    <Sprout
                      size={80}
                      color="#10B981"
                      strokeWidth={1.5}
                      className="mb-4 text-emerald-500"
                    />
                    <h2 className="text-2xl font-semibold text-gray-700">
                      Chưa có bài viết nào
                    </h2>
                    <p className="text-gray-500 mt-2">
                      Hãy là người đầu tiên chia sẻ điều gì đó ý nghĩa!
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        );
      case "free":
        return (
          <>
            <>
              {isLoading ? (
                <PostSkeleton />
              ) : (
                <>
                  {dataPostFree &&
                    dataPostFree?.map((i, k) => (
                      <div key={k} className="mb-6">
                        <PostCard
                          key={i.id}
                          post={i}
                          onClick={() => setIsComment(i.id)}
                          token={token}
                        />
                        {isComment === i.id && (
                          <>
                            <CommentPostCart
                              authorName={i.name}
                              onClose={() => setIsComment(-1)}
                              id={i.id}
                              token={token}
                            >
                              <PostCard
                                token={token}
                                key={k}
                                post={i}
                                onClick={() => setIsComment(i.id)}
                              />
                            </CommentPostCart>
                          </>
                        )}
                      </div>
                    ))}

                  {dataPostFree.length === 0 && (
                    <div className="flex flex-col justify-center items-center text-center p-10 bg-gray-50 rounded-lg">
                      <Sprout
                        size={80}
                        color="#10B981"
                        strokeWidth={1.5}
                        className="mb-4 text-emerald-500"
                      />
                      <h2 className="text-2xl font-semibold text-gray-700">
                        Chưa có bài viết nào
                      </h2>
                      <p className="text-gray-500 mt-2">
                        Hãy là người đầu tiên chia sẻ điều gì đó ý nghĩa!
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          </>
        );
      case "giveaway":
        return (
          <>
            {isLoading ? (
              <PostSkeleton />
            ) : (
              <>
                {dataPostGive &&
                  dataPostGive?.map((i, k) => (
                    <div key={k} className="mb-6">
                      <PostCard
                        key={i.id}
                        post={i}
                        onClick={() => setIsComment(i.id)}
                        token={token}
                      />
                      {isComment === i.id && (
                        <>
                          <CommentPostCart
                            authorName={i.name}
                            onClose={() => setIsComment(-1)}
                            id={i.id}
                            token={token}
                          >
                            <PostCard
                              token={token}
                              key={k}
                              post={i}
                              onClick={() => setIsComment(i.id)}
                            />
                          </CommentPostCart>
                        </>
                      )}
                    </div>
                  ))}

                {dataPostGive.length === 0 && (
                  <div className="flex flex-col justify-center items-center text-center p-10 bg-gray-50 rounded-lg">
                    <Sprout
                      size={80}
                      color="#10B981"
                      strokeWidth={1.5}
                      className="mb-4 text-emerald-500"
                    />
                    <h2 className="text-2xl font-semibold text-gray-700">
                      Chưa có bài viết nào
                    </h2>
                    <p className="text-gray-500 mt-2">
                      Hãy là người đầu tiên chia sẻ điều gì đó ý nghĩa!
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        );

      case "Hoàn vốn":
        return (
          <>
            {dataPostVolunteer?.map((i) => (
              <div key={i.id} className="mb-6">
                <VolunteerCard
                  key={i.id}
                  post={i}
                  token={token}
                  onClick={() => setIsComment(i.id)}
                />
                {isComment === i.id && (
                  <>
                    <CommentPostCart
                      authorName={i.name}
                      onClose={() => setIsComment(-1)}
                      id={i.id}
                      token={token}
                      type="volunteer"
                    >
                      <VolunteerCard key={i.id} post={i} token={token} />
                    </CommentPostCart>
                  </>
                )}
              </div>
            ))}
            {dataPostVolunteer.length === 0 && (
              <div className="flex flex-col justify-center items-center text-center p-10 bg-gray-50 rounded-lg">
                <Sprout
                  size={80}
                  color="#10B981"
                  strokeWidth={1.5}
                  className="mb-4 text-emerald-500"
                />
                <h2 className="text-2xl font-semibold text-gray-700">
                  Chưa có bài viết nào
                </h2>
                <p className="text-gray-500 mt-2">
                  Hãy là người đầu tiên chia sẻ điều gì đó ý nghĩa!
                </p>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <MyLayout>
      {" "}
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Trợ giúp & Quyên góp
                </h1>
                <p className="text-gray-600">
                  Chia sẻ hy vọng, hỗ trợ và tạo nên sự khác biệt trong cộng
                  đồng của bạn
                </p>
              </div>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                onClick={() => {
                  if (!token) {
                    toast.warning("Vui lòng đăng nhập để có thể đăng tin!");
                    return navigate.push("/authenticate/loggin");
                  }
                  setClose(!isClose);
                }}
              >
                Tạo bài viết
              </button>
              {isClose && (
                <>
                  <CreatePost onClose={() => setClose(false)} token={token} />
                </>
              )}
            </div>

            {/* Type Filters */}
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === "all"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Tất cả bài viết ({dataPost?.length | 0})
              </button>
              <button
                onClick={() => setSelectedType("help-request")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === "help-request"
                    ? "bg-red-100 text-red-800 border border-red-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Yêu cầu trợ giúp ({dataPostRequestHelp?.length | 0})
              </button>
              <button
                onClick={() => setSelectedType("free")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === "free"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Tự do ({dataPostFree?.length | 0})
              </button>
              <button
                onClick={() => setSelectedType("giveaway")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === "giveaway"
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Quyên góp / Trao tặng ({dataPostGive?.length | 0})
              </button>
              <button
                onClick={() => setSelectedType("Hoàn vốn")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === "Hoàn vốn"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Hoàn vốn ({dataPostVolunteer?.length | 0})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-30">
                <SearchFilter onFilterChange={setFilters} type="posts" />
              </div>
            </div>

            {/* Post Listings */}
            <div className="lg:col-span-3">
              {getTypeCount(selectedType)}
              {/* {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No posts found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your filters to see more results.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </MyLayout>
  );
}

export default HelpPage;
