"use client";

import PostVolunteerCard from "@/app/componentAdmin/postVolunteerCart";
import EmptyState from "@/app/components/Empty State";
import { Ty_PostVolunteer } from "@/app/components/PendingCompanyCard";
import Spanning from "@/app/components/Spanning";
import { GetAllPostVolunteer_non_Active } from "@/app/service/admin";
import { Leaf } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  token: string;
};

function PostVolunteerNonActivepage({ token }: Props) {
  const [data, setData] = useState<Ty_PostVolunteer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetAllCompanyNonActive = async () => {
    setIsLoading(true);
    try {
      const response = await GetAllPostVolunteer_non_Active(token);
      if (response.status === 200) {
        console.log(response);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Danh sách bài viết hoàn vốn chưa phê duyệt
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
                      <PostVolunteerCard post={item} token={token} />
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

export default PostVolunteerNonActivepage;
