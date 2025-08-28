import { Ty_CvApplied } from "@/app/types/UserList";
import Badge from "@/app/ui/Badge";
import {
  Award,
  Briefcase,
  Calendar,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
type props = {
  cv: Ty_CvApplied;
};
function ViewCvCart({ cv: viewingCV }: props) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8">
      <div className="text-center mb-8 pb-6 border-b border-[#c5c5c5]">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {viewingCV.name}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600">
          {viewingCV.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" /> {viewingCV.phone}
            </div>
          )}

          {viewingCV.email && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              {viewingCV.email}
            </div>
          )}
          {viewingCV.address && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {viewingCV.address}
            </div>
          )}
          {viewingCV.dob && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {viewingCV.dob}
            </div>
          )}
        </div>
      </div>
      {viewingCV.typeOfJob && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <Briefcase className="w-5 h-5 mr-2" />
            Tìm kiếm vị trí
          </h3>

          <Badge variant="info">{viewingCV.typeOfJob}</Badge>
        </div>
      )}
      {viewingCV.skill && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Kỹ năng
          </h3>
          <p className="text-gray-700 leading-relaxed">{viewingCV.skill}</p>
        </div>
      )}
      {viewingCV.exp && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Briefcase className="w-5 h-5 mr-2" />
            Kinh nghiệm làm việc
          </h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {viewingCV.exp}
          </p>
        </div>
      )}
      {viewingCV.education && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            Giáo dục
          </h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {viewingCV.education}
          </p>
        </div>
      )}
      {viewingCV.typeOfDisability && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Heart className="w-5 h-5 mr-2" /> Thông tin bẩm sinh
          </h3>

          <p className="text-gray-700 leading-relaxed">
            {viewingCV.typeOfDisability}
          </p>
        </div>
      )}
    </div>
  );
}

export default ViewCvCart;
