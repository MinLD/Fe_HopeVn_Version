"use client";
import { JobPostingProps } from "@/app/componentEmployer/JobPosting";
import JobCard from "@/app/components/jobCart/JobCard";
import SearchFilter from "@/app/components/SearchFilter";
import MyLayout from "@/app/Layout/MyLayOut";
import { GetAllJobs } from "@/app/service/employer";
import { Sprout } from "lucide-react";
import { useEffect, useState } from "react";

type prop = {
  token: string;
};
const RecruitmentPage = ({}: prop) => {
  const [data, setData] = useState<JobPostingProps[]>([]);

  const [isLoading, setLoading] = useState<boolean>(true);
  console.log(isLoading);

  const handleGetAllJobs = async () => {
    try {
      setLoading(true);
      const response = await GetAllJobs();
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

  //   const filteredJobs = useMemo(() => {
  //     return mockJobs.filter((job: Job) => {
  //       // Search filter
  //       if (filters.search) {
  //         const searchTerm = filters.search.toLowerCase();
  //         if (
  //           !job.title.toLowerCase().includes(searchTerm) &&
  //           !job.company.toLowerCase().includes(searchTerm) &&
  //           !job.description.toLowerCase().includes(searchTerm)
  //         ) {
  //           return false;
  //         }
  //       }

  //       // Location filter
  //       if (filters.location && job.location !== filters.location) {
  //         return false;
  //       }

  //       // Industry filter
  //       if (filters.industry && job.industry !== filters.industry) {
  //         return false;
  //       }

  //       // Urgent filter
  //       if (filters.urgent && !job.urgent) {
  //         return false;
  //       }

  //       // Salary filter (simplified - in real app would parse salary ranges)
  //       if (filters.salaryMin || filters.salaryMax) {
  //         // For demo purposes, just skip this complex parsing
  //       }

  //       return true;
  //     });
  //   }, [filters]);

  return (
    <>
      <MyLayout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Tìm công việc cho người khó khăn
              </h1>
              <p className="text-gray-600">
                Khám phá các cơ hội trên khắp Việt Nam
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-30">
                  <SearchFilter
                    onFilterChange={() => handleGetAllJobs()}
                    type="jobs"
                  />
                </div>
              </div>

              {/* Job Listings */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  {data.map((job) => (
                    <JobCard key={job.companyId} job={job} />
                  ))}
                  {data.length === 0 && !isLoading && (
                    <div className="col-span-3">
                      <div className="flex flex-col justify-center items-center text-center p-10 bg-gray-50 rounded-lg">
                        <Sprout
                          size={80}
                          color="#10B981"
                          strokeWidth={1.5}
                          className="mb-4 text-emerald-500"
                        />
                        <h2 className="text-2xl font-semibold text-gray-700">
                          Chưa có bài tuyển dụng nào
                        </h2>
                        <p className="text-gray-500 mt-2">
                          Hãy là người đầu tiên chia sẻ điều gì đó ý nghĩa!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MyLayout>
    </>
  );
};

export default RecruitmentPage;
