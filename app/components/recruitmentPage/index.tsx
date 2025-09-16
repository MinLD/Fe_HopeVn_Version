"use client";
import { JobPostingProps } from "@/app/componentEmployer/JobPosting";
import JobCard from "@/app/components/jobCart/JobCard";
import SearchFilter from "@/app/components/SearchFilter";
import MyLayout from "@/app/Layout/MyLayOut";
import { GetAllJobs } from "@/app/service/employer";
import { Sprout } from "lucide-react";
import { useCallback, useRef, useState } from "react";

type prop = {
  token: string;
  jobsData: JobPostingProps[];
  totalPages: number;
};
const RecruitmentPage = ({ jobsData, totalPages }: prop) => {
  const [selectedJob, setSelectedJob] = useState<JobPostingProps[]>(jobsData);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreJobs = useCallback(async () => {
    if (page >= totalPages || loading) return;
    setLoading(true);
    const nextPage = page + 1;
    const minimumDisplayTime = new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );
    try {
      const calApi = await GetAllJobs(nextPage, 5);
      const [response] = await Promise.all([calApi, minimumDisplayTime]);
      if (response.status === 200 && response.data.result?.data) {
        setSelectedJob((prev) => [
          ...(prev || []),
          ...response.data.result.data,
        ]);
        setHasMore(page * 5 < response.data.result.totalElements);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to fetch more jobs:", error);
    } finally {
      setLoading(false);
    }
  }, [page, totalPages, loading]);

  const lastJobRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreJobs();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, loadMoreJobs]
  );

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
                  <SearchFilter type="jobs" />
                </div>
              </div>

              {/* Job Listings */}
              <div className="lg:col-span-3">
                <div className="space-y-6">
                  {selectedJob.map((job, index) => (
                    <div
                      key={job.id}
                      ref={selectedJob.length === index + 1 ? lastJobRef : null}
                    >
                      <JobCard job={job} />
                    </div>
                  ))}
                  {/* Hiển thị skeleton khi đang tải thêm */}
                  {loading && (
                    <>
                      <JobCardSkeleton />
                      <JobCardSkeleton />
                    </>
                  )}
                  {/* Hiển thị khi đã hết bình luận */}
                  {!hasMore && selectedJob.length > 0 && (
                    <p className="text-center text-gray-500 py-4">
                      Đã xem hết công việc
                    </p>
                  )}
                  {jobsData.length === 0 && (
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
// Component Skeleton để hiển thị khi đang tải thêm
const JobCardSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
  </div>
);

export default RecruitmentPage;
