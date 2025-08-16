"use client";

import PendingCompanyCard, {
  Ty_Company,
} from "@/app/components/PendingCompanyCard";
import Spanning from "@/app/components/Spanning";
import { ActiveCompany, GetAllCompany_non_Active } from "@/app/service/admin";
import { useEffect, useState } from "react";
import { toast } from "sonner";
type Props = {
  token: string;
};

function CompanyNonActivepage({ token }: Props) {
  const [data, setData] = useState<Ty_Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingActive, setIsLoadingActive] = useState(false);
  // Giả sử dữ liệu từ API
  const companyData = {
    name: "Pho Saigon",
    description:
      "Nhà hàng chuyên món phở Sài Gòn, tuyển dụng nhân viên phục vụ.",
    industry: "Food & Beverage",
    website: "https://phosaigon.com",
    phoneNumber: "+84 123 456 789",
    email: "contact@phosaigon.com",
    address: "123 Đường ABC, Hà Nội",
    size: "Medium",
    companyImage: "/path/to/image.jpg", // URL hình ảnh
    taxCode: "TAX123456",
    registrationDate: "09/08/2025", // Ngày hiện tại
  };
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
            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {data &&
                data.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleActiveCompany(item?.id || "")}
                  >
                    <PendingCompanyCard
                      key={index}
                      {...item}
                      isLoading={isLoadingActive}
                    />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CompanyNonActivepage;
