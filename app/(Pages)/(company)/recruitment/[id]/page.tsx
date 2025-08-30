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
import { cache } from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { SearchX } from "lucide-react";

/**
 * BƯỚC 1: Lấy danh sách ID của TẤT CẢ các công việc tại thời điểm build.
 * Hàm này chạy 1 lần duy nhất khi bạn build dự án.
 * Nó phải gọi đến một API công khai, không yêu cầu token.
 * (Giả sử bạn có một hàm GetAllJobsPublic() để làm việc này).
 */
export async function generateStaticParams() {
  try {
    const response: any = await GetAllJobs();

    // THÊM DÒNG NÀY ĐỂ DEBUG
    console.log(
      "API RESPONSE DATA:",
      JSON.stringify(response.data.result.data, null, 2)
    );

    // Kiểm tra xem response.data.result có phải là mảng không
    if (Array.isArray(response.data.result.data)) {
      return response.data.result.data.map((job: { id: string | number }) => ({
        id: job.id.toString(),
      }));
    } else {
      console.error("Dữ liệu trả về không phải là một mảng!");
      return []; // Trả về mảng rỗng để build không bị lỗi
    }
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
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
  const { id } = await params;
  const data = await getJobData(id);

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
      url: `https://ourhope.io.vn/recruitment/${id}`,
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
  const { id } = await params;
  // Lấy dữ liệu tĩnh để render nội dung chính
  const data = await getJobData(id);

  // Lấy token của người dùng hiện tại (nếu có).
  const token = (await cookies()).get("authToken")?.value;

  // Nếu không có dữ liệu tại thời điểm build, Next.js sẽ hiển thị trang 404
  if (!data?.job || !data?.company) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center text-center">
        <div className="rounded-full bg-green-100 p-6">
          <SearchX className="h-16 w-16 text-green-600" />
        </div>
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Không tìm thấy trang
        </h2>
        <p className="mt-4 max-w-md text-base text-gray-600">
          Rất tiếc, trang bạn đang tìm kiếm có thể đã bị di chuyển, xóa bỏ hoặc
          không tồn tại. Vui lòng kiểm tra lại đường dẫn.
        </p>
        <Link href="/">
          <button className="mt-8 inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Quay về Trang chủ
          </button>
        </Link>
      </div>
    );
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
