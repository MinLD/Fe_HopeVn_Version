"use client";

import EmptyState from "@/app/components/Empty State";
import PendingCompanyCard, {
  Ty_Company,
} from "@/app/components/PendingCompanyCard";
import Spanning from "@/app/components/Spanning";
import { ActiveCompany, GetAllCompany_non_Active } from "@/app/service/admin";
import { Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
type Props = {
  token: string;
};

function CompanyNonActivepage({ token }: Props) {
  const [data, setData] = useState<Ty_Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingActive, setIsLoadingActive] = useState(false);

  const handleGetAllCompanyNonActive = async () => {
    setIsLoading(true);
    try {
      const response = await GetAllCompany_non_Active(token);
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
  const handleActiveCompany = async (id: string) => {
    console.log(token);
    console.log(id);
    try {
      setIsLoadingActive(true);
      const response = await ActiveCompany(token, id);
      console.log(response);
      if (response.status === 200) {
        toast.success("Kiểm duyệt công ty thành công!");
        console.log(response.data.message);
        await handleGetAllCompanyNonActive();
        setIsLoadingActive(false);
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
        setIsLoadingActive(false);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsLoadingActive(false);
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
          Danh sách công ty chưa phê duyệt
        </h2>
        {isLoading ? (
          <>
            <Spanning />
          </>
        ) : (
          <>
            {data.length > 0 ? (
              <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {data.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleActiveCompany(item?.id || "")}
                  >
                    <PendingCompanyCard
                      key={item.id}
                      {...item}
                      isLoading={isLoadingActive}
                    />
                  </div>
                ))}
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

export default CompanyNonActivepage;
