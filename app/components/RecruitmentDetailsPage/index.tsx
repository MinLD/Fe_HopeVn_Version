"use client";
import { JobPostingProps } from "@/app/componentEmployer/JobPosting";
import CVBuilder from "@/app/components/BuilderCV";
import { Ty_Company } from "@/app/components/PendingCompanyCard";
import Portal from "@/app/components/Portal";
import MyLayout from "@/app/Layout/MyLayOut";
import {
  ArrowLeft,
  Building,
  Calendar,
  CheckCircle,
  DollarSign,
  Mails,
  MapPin,
  MessageSquareMore,
  Phone,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  job: JobPostingProps;
  company: Ty_Company;
  token: string | null;
};
function RecruimentDetailPage({ job, company, token }: Props) {
  const router = useRouter();
  console.log(job);
  const [isApplying, setIsApplying] = useState(false);
  const handleApply = () => {
    if (token) {
      setIsApplying(true);
      return;
    }
    router.push("/authenticate/loggin");
    toast.warning("Vui lòng đăng nhập");
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
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h1 className="text-2xl font-bold text-gray-900">
                          {job.title}
                        </h1>
                      </div>
                      <InfoItem icon={Building} text={job.companyName} />
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
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm inline-block">
                    {job.jobCategory.name}
                  </div>
                </div>

                {/* Job Description */}
                <div className="border border-gray-200 rounded-lg p-3">
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
                <div className="border border-gray-200 rounded-lg p-3">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Yêu cầu
                  </h2>
                  {job.requirements.split(/,|\n/).map((requirement, index) => (
                    <span key={requirement + ""}>
                      <ListItem key={index} text={requirement.trim()} />
                    </span>
                  ))}
                </div>

                {/* Benefits */}
                <div className="border border-gray-200 rounded-lg p-3">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Quyền lợi và đặc quyền
                  </h2>
                  {job.benefits.split(/,|\n/).map((benefit) => (
                    <ListItem key={benefit + "1"} text={benefit.trim()} />
                  ))}
                  {job.suitableForDisability.split(/,|\n/).map((benefit) => (
                    <ListItem key={benefit + "2"} text={benefit.trim()} />
                  ))}
                </div>

                {/* Company Information */}
                <div className="border border-gray-200 rounded-lg p-3">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Giới thiệu về {job?.companyName}
                  </h2>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16  rounded-lg flex items-center justify-center flex-shrink-0">
                      {/* <Building className="w-8 h-8 text-green-600" /> */}
                      <Image
                        width={100}
                        height={100}
                        src={job?.companyPicture || ""}
                        alt="Company Logo"
                        className="w-16 h-16 text-green-600 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {company?.description || "Chưa câp nhật!"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-[120px] space-y-6">
                  {/* Apply Section */}
                  <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Ứng tuyển cho công việc này
                    </h3>
                    {!isApplying ? (
                      <div className="space-y-4">
                        <ActionButton
                          text="Nộp đơn ngay"
                          onClick={handleApply}
                        />
                      </div>
                    ) : (
                      <Portal>
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                          {/* Lớp nền mờ */}
                          <div
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                            onClick={() => setIsApplying(false)}
                            aria-hidden="true"
                          ></div>

                          {/* Nội dung Modal */}
                          <div className="relative flex flex-col w-full max-w-4xl h-auto max-h-[90vh] bg-white rounded-xl shadow-lg overflow-hidden">
                            {/* Header của Modal */}
                            <div className="absolute top-4 right-4">
                              <button
                                onClick={() => setIsApplying(false)}
                                className="p-1 text-gray-500 rounded-full hover:bg-gray-200 hover:text-gray-800 transition-colors"
                                aria-label="Đóng"
                              >
                                <X className="h-6 w-6" />
                              </button>
                            </div>

                            {/* Vùng nội dung có thể cuộn */}
                            <div className="flex-grow p-4  overflow-y-auto ">
                              <CVBuilder token={token} idCompany={job?.id} />
                            </div>
                          </div>
                        </div>
                      </Portal>
                    )}
                  </div>

                  {/* Job Summary */}
                  <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Tóm tắt công việc
                    </h3>
                    <div className="space-y-3">
                      <div className="flex flex-col gap-1">
                        <InfoItem icon={Building} text="Ngành công nghiệp" />
                        <span className="font-medium">
                          {job.jobCategory.name}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <InfoItem icon={MapPin} text="Địa chỉ" />
                        <span className="font-medium">{job.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <InfoItem icon={DollarSign} text="Lương" />
                        <span className="font-medium">
                          {job.salaryMax.toLocaleString("vi-VN")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <InfoItem icon={Calendar} text="Đã đăng" />
                        <span className="font-medium">
                          {job.applicationDeadline}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <InfoItem icon={Users} text="Người nộp đơn" />
                        <span className="font-medium">{"12"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Employer */}
                  <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Liên hệ với nhà tuyển dụng
                    </h3>
                    <div className="space-y-3">
                      <span className="flex items-center gap-2">
                        <MessageSquareMore className="w-5 h-5" />
                        <ActionButton text="Gửi tin nhắn" />
                      </span>
                      <span className="flex items-center gap-2">
                        <Mails className="w-5 h-5" />
                        {company?.email || "Chưa câp nhật!"}
                      </span>
                      <span className="flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        {company?.phoneNumber || "Chưa câp nhật!"}
                      </span>
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
