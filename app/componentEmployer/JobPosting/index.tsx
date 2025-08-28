import ApplicationCart from "@/app/components/ApplicationCard";
import Portal from "@/app/components/Portal";
import { GetAllAppliedJob } from "@/app/service/employer";
import { Ty_CvApplied, Ty_profile_User } from "@/app/types/UserList";
import { Coins, Eye, FileUser, MapPin, X } from "lucide-react";
import React, { useState } from "react";

export interface JobPostingProps {
  title: string;
  id: number;
  description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  suitableForDisability: string;
  jobType: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  applicationDeadline: string;
  categoryId: number;
  companyId: number;
  companyName: string;
  companyPicture: string;
  jobCategory: {
    name: string;
  };
  employerId: string;
  views: number;
  token: string;
}
export interface Ty_ApplicationBjob {
  cvForm: Ty_CvApplied;
  applicant: {
    email: string;
    id: number;
    phone: string;
    profile: Ty_profile_User;
  };
}

const JobPosting: React.FC<JobPostingProps> = ({
  title,
  description,
  location,
  salaryMin,
  salaryMax,
  applicationDeadline,
  jobCategory,
  views,
  token,
  id,
}) => {
  const [isDataApplied, setIsDataApplied] = useState<Ty_ApplicationBjob[]>();
  const [isShowApplication, setIsShowApplication] = useState(false);
  const handleGetAllAppliedJobs = async (id: number) => {
    try {
      const response = await GetAllAppliedJob(token, id);
      if (response.status === 200) {
        console.log(response.data.result.data);
        setIsDataApplied(response?.data?.result?.data);
        setIsShowApplication(true);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-4">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">{title} </h2>
          {/* <p className="text-gray-600"></p> */}
          <div className="flex flex-col gap-2  items-start text-sm text-gray-500 mt-2">
            <span className="flex items-center mr-4 mb-2 md:mb-0">
              <span className="mr-1">
                <MapPin />
              </span>{" "}
              {location}
            </span>
            <span className="flex items-center mr-4 mb-2 md:mb-0">
              <span className="mr-1">
                <Coins />
              </span>{" "}
              {salaryMin.toLocaleString()} - {salaryMax.toLocaleString()} VND
            </span>
            <span className="flex items-center mr-4 mb-2 md:mb-0">
              <span className="mr-1">
                <FileUser />
              </span>{" "}
              12 applicants
            </span>
            <span className="flex items-center">
              <span className="mr-1">
                <Eye />
              </span>{" "}
              {views ? views : "0"} lượt xem
            </span>
          </div>
        </div>
        {/* <div className="space-x-2 mt-4 md:mt-0 gap-2">
          <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
            Edit
          </button>
          <button className="bg-green-500 text-white px-3 py-1 rounded">
            View
          </button>
        </div> */}
      </div>
      <p className="text-gray-700 mt-4">{description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded">
          {applicationDeadline}
        </span>
        <span className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded">
          {jobCategory.name}
        </span>
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full md:w-auto"
        onClick={() => handleGetAllAppliedJobs(id)}
      >
        Xem ứng tuyển ({isDataApplied?.length || 0})
      </button>
      {isShowApplication && (
        <Portal>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Lớp nền mờ */}
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsShowApplication(false)}
              aria-hidden="true"
            ></div>

            {/* Nội dung Modal */}
            <div className="relative flex flex-col w-full max-w-4xl h-full max-h-[90vh] bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header của Modal */}
              <div className="flex items-center justify-between p-4  flex-shrink-0">
                <span>
                  {" "}
                  <h2 className="text-2xl font-bold ">Danh sách ứng tuyển</h2>
                </span>
                <button
                  onClick={() => setIsShowApplication(false)}
                  className="p-1 text-gray-500 rounded-full hover:bg-gray-200 hover:text-gray-800 transition-colors"
                  aria-label="Đóng"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Vùng nội dung có thể cuộn */}
              <div className="flex-grow p-4  overflow-y-auto ">
                {isDataApplied &&
                  isDataApplied?.map((item, index) => (
                    <div key={index} className="mb-4">
                      <ApplicationCart
                        image={item?.applicant.profile.profilePicture.url || ""}
                        cvForm={item?.cvForm}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default JobPosting;
