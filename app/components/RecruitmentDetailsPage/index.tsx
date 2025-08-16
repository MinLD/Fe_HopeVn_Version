"use client";
import { JobPostingProps } from "@/app/componentEmployer/JobPosting";
import { mockJobs } from "@/app/data";
import MyLayout from "@/app/Layout/MyLayOut";
import {
  ArrowLeft,
  Bookmark,
  Building,
  Calendar,
  CheckCircle,
  DollarSign,
  MapPin,
  Send,
  Share2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  job: JobPostingProps;
};
function RecruimentDetailPage({ job }: Props) {
  console.log(job);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    resume: null as File | null,
    phone: "",
    expectedSalary: "",
  });
  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle application submission
    console.log("Application submitted:", applicationData);
    alert("Application submitted successfully!");
    setIsApplying(false);
  };
  return (
    <>
      <MyLayout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Button */}
            <div className="mb-6">
              <Link
                href={"/recruitment"}
                className="inline-flex items-center text-green-600 hover:text-green-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại Việc làm
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Job Header */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h1 className="text-2xl font-bold text-gray-900">
                          {job.title}
                        </h1>
                      </div>
                      <InfoItem
                        icon={Building}
                        text={job.employer.profile.company.name}
                      />
                      <div className="flex flex-wrap gap-4 mt-4">
                        <InfoItem icon={MapPin} text={job.location} />
                        <InfoItem
                          icon={undefined}
                          text={
                            job.salaryMin.toLocaleString() +
                            " - " +
                            job.salaryMax.toLocaleString() +
                            " VND"
                          }
                        />
                        <InfoItem
                          icon={Calendar}
                          text={`${job.applicationDeadline}`}
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <ActionButton icon={Bookmark} text="Lưu" />
                      <ActionButton icon={Share2} text="Chia sẻ" />
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm inline-block">
                    {job.jobCategory.name}
                  </div>
                </div>

                {/* Job Description */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Mô tả công việc
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {job.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Chúng tôi đang tìm kiếm một chuyên gia tài năng để gia nhập
                    đội ngũ năng động của chúng tôi. Vị trí này mang đến những
                    cơ hội tuyệt vời để phát triển và thăng tiến trong một môi
                    trường hợp tác.
                  </p>
                </div>

                {/* Requirements */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Yêu cầu
                  </h2>
                  {job.requirements.split(/,|\n/).map((requirement, index) => (
                    <ListItem key={index} text={requirement.trim()} />
                  ))}
                </div>

                {/* Benefits */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Quyền lợi và đặc quyền
                  </h2>
                  {job.benefits.split(/,|\n/).map((benefit, index) => (
                    <ListItem key={index} text={benefit.trim()} />
                  ))}
                  {job.suitableForDisability
                    .split(/,|\n/)
                    .map((benefit, index) => (
                      <ListItem key={index} text={benefit.trim()} />
                    ))}
                </div>

                {/* Company Information */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Giới thiệu về "{job?.employer.profile.company.name}"
                  </h2>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16  rounded-lg flex items-center justify-center flex-shrink-0">
                      {/* <Building className="w-8 h-8 text-green-600" /> */}
                      <img
                        src={job?.employer.profile.company.logo.url || ""}
                        alt="Company Logo"
                        className="w-16 h-16 text-green-600 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {job?.employer.profile.company.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Apply Section */}
                  <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Ứng tuyển cho công việc này
                    </h3>
                    {!isApplying ? (
                      <div className="space-y-4">
                        <ActionButton
                          text="Apply Now"
                          onClick={() => setIsApplying(true)}
                        />
                        <div className="text-center">
                          <InfoItem
                            icon={Users}
                            text={`${"12"} people have applied`}
                          />
                        </div>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleApplicationSubmit}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            required
                            value={applicationData.phone}
                            onChange={(e) =>
                              setApplicationData({
                                ...applicationData,
                                phone: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Your phone number"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expected Salary
                          </label>
                          <input
                            type="text"
                            value={applicationData.expectedSalary}
                            onChange={(e) =>
                              setApplicationData({
                                ...applicationData,
                                expectedSalary: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="e.g., 15-20 million VND"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cover Letter
                          </label>
                          <textarea
                            rows={4}
                            required
                            value={applicationData.coverLetter}
                            onChange={(e) =>
                              setApplicationData({
                                ...applicationData,
                                coverLetter: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Tell us why you're perfect for this role..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Resume/CV
                          </label>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) =>
                              setApplicationData({
                                ...applicationData,
                                resume: e.target.files?.[0] || null,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            PDF, DOC, or DOCX format
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <ActionButton icon={Send} text="Submit Application" />
                          <ActionButton
                            text="Cancel"
                            onClick={() => setIsApplying(false)}
                          />
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Job Summary */}
                  <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Tóm tắt công việc
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <InfoItem icon={Building} text="Industry" />
                        <span className="font-medium">
                          {job.jobCategory.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <InfoItem icon={MapPin} text="Location" />
                        <span className="font-medium">{job.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <InfoItem icon={DollarSign} text="Salary" />
                        <span className="font-medium">
                          {job.salaryMax.toLocaleString("vi-VN")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <InfoItem icon={Calendar} text="Posted" />
                        <span className="font-medium">
                          {job.applicationDeadline}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <InfoItem icon={Users} text="Applicants" />
                        <span className="font-medium">{"12"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Employer */}
                  <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Contact Employer
                    </h3>
                    <div className="space-y-3">
                      <ActionButton text="Send Message" />
                      <ActionButton text="View Company Profile" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MyLayout>
    </>
  );
}

export default RecruimentDetailPage;

const InfoItem = ({
  icon: Icon = undefined,
  text,
}: {
  icon: React.ComponentType<{ className: string }> | undefined;
  text: string;
}) => (
  <div className="flex items-center text-gray-500 text-sm">
    {Icon && <Icon className="w-4 h-4 mr-1" />}
    {text}{" "}
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-start">
    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
    <span className="text-gray-600">{text}</span>
  </li>
);

const ActionButton = ({
  icon: Icon,
  text,
  onClick,
}: {
  icon?: React.ComponentType<{ className: string }>;
  text: string;
  onClick?: () => void;
}) => (
  <div
    className="flex items-center text-gray-600 text-sm cursor-pointer hover:text-green-600 transition-colors"
    onClick={onClick}
  >
    {Icon && <Icon className="w-4 h-4 mr-1" />}
    {text}
  </div>
);

export { InfoItem, ListItem, ActionButton };
