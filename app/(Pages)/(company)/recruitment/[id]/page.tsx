import { JobPostingProps } from "@/app/componentEmployer/JobPosting";
import { Ty_Company } from "@/app/components/PendingCompanyCard";
import RecruimentDetailPage from "@/app/components/RecruitmentDetailsPage";
import { GetDetailsCompany, GetJobDetail } from "@/app/service/employer";
import { cookies } from "next/headers";

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
