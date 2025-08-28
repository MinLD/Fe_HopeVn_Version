import { JobPostingProps } from "@/app/componentEmployer/JobPosting";
import { Ty_Company } from "@/app/components/PendingCompanyCard";
import RecruimentDetailPage from "@/app/components/RecruitmentDetailsPage";
import { GetDetailsCompany, GetJobDetail } from "@/app/service/employer";
import { Metadata } from "next";
import { cookies } from "next/headers";

// Hàm tạo metadata động
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  let job: JobPostingProps = {} as JobPostingProps;
  let company: Ty_Company = {} as Ty_Company;
  const token = (await cookies()).get("authToken")?.value;
  const handleGetJobsDetail = async (token: string, id: string) => {
    try {
      const response: any = await GetJobDetail(token as string, id);
      if (response.status !== 200) {
        console.log(response.data.message);
      }
      console.log(response.data.result);
      job = response.data.result;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleGetCompanyDetail = async (token: string, id: string) => {
    try {
      const response: any = await GetDetailsCompany(token as string, id);
      if (response.status !== 200) {
        console.log(response.data.message);
      }
      console.log(response.data.result);
      company = response.data.result;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  await handleGetJobsDetail(token as string, id);
  await handleGetCompanyDetail(token as string, job.companyId as any);

  if (!job) {
    return {
      title: "Không tìm thấy công việc",
    };
  }

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
          url: job.companyPicture, // Lấy logo công ty làm ảnh đại diện
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

async function page({ params }: Props) {
  const { id } = params;
  let job: JobPostingProps = {} as JobPostingProps;
  let company: Ty_Company = {} as Ty_Company;
  const token = (await cookies()).get("authToken")?.value;
  if (!token) return;
  const handleGetJobsDetail = async (token: string, id: string) => {
    try {
      const response: any = await GetJobDetail(token as string, id);
      if (response.status !== 200) {
        console.log(response.data.message);
      }
      console.log(response.data.result);
      job = response.data.result;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleGetCompanyDetail = async (token: string, id: string) => {
    try {
      const response: any = await GetDetailsCompany(token as string, id);
      if (response.status !== 200) {
        console.log(response.data.message);
      }
      console.log(response.data.result);
      company = response.data.result;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  await handleGetJobsDetail(token as string, id);
  await handleGetCompanyDetail(token as string, job.companyId as any);

  return (
    <div>
      <RecruimentDetailPage job={job} company={company} token={token} />
    </div>
  );
}

export default page;
