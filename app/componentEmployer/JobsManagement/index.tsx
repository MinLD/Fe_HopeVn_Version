"use client";
import EmployerCreateJob from "@/app/componentEmployer/EmployerCreateJobs";
import JobPosting, {
  JobPostingProps,
} from "@/app/componentEmployer/JobPosting";
import Spanning from "@/app/components/Spanning";
import { GetAllJobByCompany } from "@/app/service/employer";
import { useEffect, useState } from "react";

type Props = {
  token: string;
};
function JobsManagement({ token }: Props) {
  const [data, setData] = useState<JobPostingProps[]>([]);
  const [isEditProfile, setIsEditProfile] = useState<number>(-1);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [ConfirmDelete, setConfirmDelete] = useState<string>("");
  const [AddUser, setAddUser] = useState<boolean>(false);

  const handleGetAllJobs = async () => {
    try {
      setLoading(true);
      const response = await GetAllJobByCompany(token);
      if (response.status === 200) {
        console.log(response.data.result);
        setData(response?.data?.result?.data);
        setLoading(false);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    handleGetAllJobs();
  }, []);
  console.log(data);

  return (
    <>
      <div className="container mx-auto py-2 ">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 sm:text-center">
          Quản Lý Tuyển Dụng
        </h1>

        <div className="flex flex-col xl:flex-row justify-between mb-6 gap-4">
          <div className="relative  sm:w-2/3 w-4/5">
            <input
              type="text"
              id="searchInput"
              placeholder="Tìm kiếm người dùng..."
              className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            className="w-3/4 sm:w-2/5  bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            onClick={() => setAddUser(true)}
          >
            Thêm bài đăng Tuyển dụng
          </button>
          {AddUser && (
            <div>
              <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setIsEditProfile(-1)}
              ></div>

              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white p-4 w-[800px] h-auto rounded-xl shadow-lg">
                  <EmployerCreateJob
                    setClose={setAddUser as any}
                    token={token}
                    handleGetAllJobs={handleGetAllJobs}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {isLoading ? (
          <div>
            <Spanning />
          </div>
        ) : (
          <></>
        )}
        <div className="container mx-auto p-4">
          {isLoading ? (
            <div>
              <Spanning />
            </div>
          ) : (
            <>
              {" "}
              {data?.map((item) => (
                <div key={item.id}>
                  <JobPosting {...item} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default JobsManagement;
