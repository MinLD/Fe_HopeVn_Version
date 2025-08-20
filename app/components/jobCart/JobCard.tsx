import React from "react";

import { Calendar, Heart, MapPin, Share2 } from "lucide-react";
import { JobPostingProps } from "@/app/componentEmployer/JobPosting";
import Link from "next/link";

interface JobCardProps {
  job: JobPostingProps;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
                {job.title}
              </h3>
              {/* {job.urgent && (
                <>
                  {" "}
                  <Clock className="w-3 h-3 mr-1" />
                  Urgent
                </>
              )} */}
            </div>
            {/* <div className="flex items-center text-gray-600 mb-2">
              <Building className="w-4 h-4 mr-2" />
              <span className="font-medium ">
                {" "}
             
              </span>
            </div> */}
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600 mb-1">
              {job.salaryMin.toLocaleString()} -{" "}
              {job.salaryMax.toLocaleString()} VND
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center">
            {" "}
            <MapPin className="w-4 h-4 mr-1" />
            {job.location}
          </div>
          <div className="flex items-center">
            {" "}
            <Calendar className="w-4 h-4 mr-1" />
            {job.applicationDeadline}
          </div>
          <div>
            {" "}
            <span className="font-semibold ">Yêu cầu: </span>{" "}
            <div className="flex items-center">{job.requirements}</div>
          </div>
          {/* <div>
            {" "}
            <span className="font-semibold ">Phúc lợi: </span>{" "}
            <div className="flex items-center">{job.benefits}</div>
          </div> */}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          <span className="font-semibold ">Mô tả công việc: </span>{" "}
          {job.description}
        </p>

        {/* Actions */}
        <div className="flex space-x-3 pt-2 items-center">
          <span className="flex-1 w-full">
            <Link href={`/recruitment/${job.id}`}>
              <button className="bg-green-600 hover:cursor-pointer text-white px-4 py-2 rounded-lg  hover:bg-green-700 transition-colors">
                Xem chi tiết
              </button>
            </Link>
          </span>
          <Heart />

          <Share2 />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
