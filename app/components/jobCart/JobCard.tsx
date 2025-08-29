import React from "react";

import { Building, Calendar, MapPin } from "lucide-react";
import { JobPostingProps } from "@/app/componentEmployer/JobPosting";
import Link from "next/link";

interface JobCardProps {
  job: JobPostingProps;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white p-3 md:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex md:justify-between md:items-start flex-col">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
                {job.title}
              </h3>
            </div>
            <div className="flex flex-col text-gray-600 mb-2">
              <span className="flex gap-2 font-semibold">
                {" "}
                <span> Công ty </span> <Building className="w-5 h-5 mr-2" />
              </span>

              <span className="font-medium ">{job.companyName} </span>
            </div>
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
          <div className="flex flex-col gap-2 ">
            {" "}
            <span className="flex gap-2 font-semibold">
              {" "}
              Địa chỉ <MapPin className="w-5 h-5 mr-2" />
            </span>
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
        </div>
      </div>
    </div>
  );
};

export default JobCard;
