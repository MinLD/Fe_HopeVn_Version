"use client";
import EmptyState from "@/app/components/Empty State";
import Spanning from "@/app/components/Spanning";
import PostCard from "@/app/componentsPostHelp/posts/PostCard";
import { ActivePost, GetAllPost_non_Active } from "@/app/service/admin";
import { dataPost } from "@/app/types/post";
import { Leaf } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  token: string;
};

function PostNonActivepage({ token }: Props) {
  const [data, setData] = useState<dataPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetAllCompanyNonActive = async () => {
    setIsLoading(true);
    try {
      const response = await GetAllPost_non_Active(token);
      if (response.status === 200) {
        console.log(response?.data.result?.data);
        setData(response?.data?.result?.data);
        setIsLoading(false);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllCompanyNonActive();
  }, []);
  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Danh sách bài viết chưa phê duyệt
        </h2>
        {isLoading ? (
          <>
            <Spanning />
          </>
        ) : (
          <>
            {data.length > 0 ? (
              <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <>
                  {data.map((item) => (
                    <div key={item.id}>
                      <PostCard
                        admin
                        post={item}
                        token={token}
                        handleGetAllPost={handleGetAllCompanyNonActive}
                      />
                    </div>
                  ))}
                </>
              </div>
            ) : (
              <>
                <EmptyState Icons={Leaf}>
                  {" "}
                  <h2 className="text-2xl font-semibold text-gray-700">
                    Chưa có bài viết nào
                  </h2>
                </EmptyState>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default PostNonActivepage;
