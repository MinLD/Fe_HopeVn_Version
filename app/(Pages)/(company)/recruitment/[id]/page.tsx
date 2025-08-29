import { JobPostingProps } from "@/app/componentEmployer/JobPosting";
import { Ty_Company } from "@/app/components/PendingCompanyCard";
import RecruimentDetailPage from "@/app/components/RecruitmentDetailsPage";
// Giữ nguyên các hàm service gốc của bạn
import {
  GetDetailsCompany,
  GetJobDetail,
  GetAllJobs,
} from "@/app/service/employer";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { cookies } from "next/headers";

/**
 * BƯỚC 1: Lấy danh sách ID của TẤT CẢ các công việc tại thời điểm build.
 * Hàm này chạy 1 lần duy nhất khi bạn build dự án.
 * Nó phải gọi đến một API công khai, không yêu cầu token.
 * (Giả sử bạn có một hàm GetAllJobsPublic() để làm việc này).
 */
export async function generateStaticParams() {
  try {
    // API này cần trả về một mảng các object chứa id, ví dụ: [{id: 1}, {id: 2}]
    const response: any = await GetAllJobs();
    return response.data.result.map((job: { id: string | number }) => ({
      id: job.id.toString(),
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
}

/**
 * BƯỚC 2: Tạo hàm lấy dữ liệu và bọc trong 'cache'.
 * 'cache' giúp `generateMetadata` và `page` có thể dùng chung kết quả API mà không cần gọi lại.
 * Các hàm này phải là phiên bản công khai, không cần token.
 */
const getJobData = cache(async (id: string) => {
  try {
    const jobResponse: any = await GetJobDetail(id);
    const job = jobResponse.data.result;

    if (!job) {
      return null;
    }
    const companyResponse: any = await GetDetailsCompany(job.companyId);
    const company = companyResponse.data.result;

    return { job, company };
  } catch (error) {
    console.error("Error fetching job data:", error);
    return null;
  }
});

/**
 * BƯỚC 3: Tạo metadata động cho SEO.
 * Hàm này sử dụng dữ liệu đã được cache ở trên.
 */
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await getJobData(params.id);

  if (!data?.job) {
    return {
      title: "Không tìm thấy công việc",
    };
  }

  const { job } = data;
  return {
    title: `${job.title} - ${job.companyName}`,
    description: `Ứng tuyển ngay vị trí ${job.title} tại ${
      job.companyName
    }. Mức lương hấp dẫn, môi trường làm việc chuyên nghiệp. ${job.description.substring(
      0,
      120
    )}...`,
    keywords: [job.title, job.companyName, "việc làm", job.jobCategory.name],
    openGraph: {
      title: `${job.title} - ${job.companyName}`,
      description: `Ứng tuyển ngay vị trí ${job.title} tại ${job.companyName}.`,
      url: `https://ourhope.io.vn/recruitment/${params.id}`,
      images: [
        {
          url: job.companyPicture,
          width: 800,
          height: 600,
          alt: `Logo of ${job.companyName}`,
        },
      ],
    },
  };
}

interface Props {
  params: { id: string };
}

/**
 * BƯỚC 4: Component Page chính.
 * Component này sẽ render trang tĩnh đã được tạo sẵn.
 * Việc lấy token sẽ được thực hiện để truyền xuống một Client Component riêng biệt.
 */
async function page({ params }: Props) {
  const { id } = params;

  // Lấy dữ liệu tĩnh để render nội dung chính
  const data = await getJobData(id);

  // Lấy token của người dùng hiện tại (nếu có).
  const token = (await cookies()).get("authToken")?.value;

  // Nếu không có dữ liệu tại thời điểm build, Next.js sẽ hiển thị trang 404
  if (!data?.job || !data?.company) {
    notFound();
  }

  const { job, company } = data;

  return (
    <div>
      {/* Component chính hiển thị nội dung tĩnh */}
      <RecruimentDetailPage
        job={job as JobPostingProps}
        company={company as Ty_Company}
        token={token || ""}
      />
    </div>
  );
}

export default page;
