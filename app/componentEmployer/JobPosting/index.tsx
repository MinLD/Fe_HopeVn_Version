import JobCategories from "@/app/componentEmployer/JobCategories";
import React from "react";

export interface JobPostingProps {
  title: string;

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
}

const JobPosting: React.FC<JobPostingProps> = ({
  title,
  description,
  requirements,
  responsibilities,
  benefits,
  suitableForDisability,
  jobType,
  location,
  salaryMin,
  salaryMax,
  applicationDeadline,
  categoryId,
  companyId,
  companyName,
  companyPicture,
  jobCategory,
  views,
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-4">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">{title} </h2>
          {/* <p className="text-gray-600"></p> */}
          <div className="flex flex-col md:flex-row items-start md:items-center text-sm text-gray-500 mt-2">
            <span className="flex items-center mr-4 mb-2 md:mb-0">
              <span className="mr-1">📍</span> {location}
            </span>
            <span className="flex items-center mr-4 mb-2 md:mb-0">
              <span className="mr-1">💰</span> {salaryMin.toLocaleString()} -{" "}
              {salaryMax.toLocaleString()} VND
            </span>
            {/* <span className="flex items-center mr-4 mb-2 md:mb-0">
              <span className="mr-1">👥</span> 12 applicants
            </span> */}
            <span className="flex items-center">
              <span className="mr-1">👁️</span> {views ? views : "0"} lượt xem
            </span>
          </div>
        </div>
        {/* <div className="space-x-2 mt-4 md:mt-0">
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
      <button className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full md:w-auto">
        View Applications (12)
      </button>
    </div>
  );
};

export default JobPosting;
