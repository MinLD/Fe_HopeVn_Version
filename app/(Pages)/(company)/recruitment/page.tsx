import { JobPostingProps } from "@/app/componentEmployer/JobPosting";
import RecruitmentPage from "@/app/components/recruitmentPage";
import { GetAllJobs } from "@/app/service/employer";
import { Metadata } from "next";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "Tuyển dụng",
};

async function page() {
  const token = (await cookies()).get("authToken")?.value;
  let dataJob: JobPostingProps[] = [] as JobPostingProps[];
  const handleGetAllJobs = async () => {
    try {
      const response = await GetAllJobs();
      if (response.status === 200) {
        console.log(response.data.result);
        dataJob = response?.data?.result?.data;
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  await handleGetAllJobs();

  return (
    <>
      <RecruitmentPage token={token || ""} jobsData={dataJob} />

      {/* <PrivateChat token={token || ""} /> */}
    </>
  );
}

export default page;
