"use client";

import PostVolunteerCard from "@/app/componentAdmin/postVolunteerCart";
import { Ty_PostVolunteer } from "@/app/components/PendingCompanyCard";
import Spanning from "@/app/components/Spanning";
import {
  ActiveCompany,
  ActivePostVolunteer,
  GetAllCompany_non_Active,
  GetAllPostVolunteer_non_Active,
} from "@/app/service/admin";
import { useEffect, useState } from "react";
import { toast } from "sonner";
type Props = {
  token: string;
};

function PostVolunteerNonActivepage({ token }: Props) {
  const [data, setData] = useState<Ty_PostVolunteer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingActive, setIsLoadingActive] = useState(false);

  const handleGetAllCompanyNonActive = async () => {
    setIsLoading(true);
    try {
      const response = await GetAllPostVolunteer_non_Active(token);
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
          Danh sách bài viết hoàn vốn chưa phê duyệt
        </h2>
        {isLoading ? (
          <>
            <Spanning />
          </>
        ) : (
          <>
            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {data &&
                data.map((item, index) => (
                  <div key={index}>
                    {" "}
                    <PostVolunteerCard post={item} token={token} />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PostVolunteerNonActivepage;
