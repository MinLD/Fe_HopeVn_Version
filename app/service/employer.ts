import axiosClient from "@/app/service/ApiClient";

const GetDetailsCompany = async (id: string) => {
  return await axiosClient.get(`/company/${id}`);
};
const CreateCompany = async (token: string, formData: FormData) => {
  return await axiosClient.post("/company", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
const PostJobCategory = async (token: string, data: any) => {
  return await axiosClient.post("/jobCategory", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const GetAllJobCategory = async (token: string) => {
  return await axiosClient.get("/jobCategory", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const CreateJobsCategory = async (token: string, data: any) => {
  console.log(token, data);
  return await axiosClient.post("/jobCategory", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const CreatePostJob = async (token: string, data: any) => {
  return await axiosClient.post("/job", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const GetAllJobs = async () => {
  return await axiosClient.get("/job/getAll");
};

const GetJobDetail = async (id: string) => {
  if (!id) return;
  return await axiosClient?.get(`/job/detail?jobId=${id}`);
};
const GetAllJobByCompany = async (token: string) => {
  return await axiosClient.get("/job/company", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const ApplyCompany = async (token: string, jobId: number, cvId: number) => {
  return await axiosClient.post(
    `/application?jobId=${jobId}&cvId=${cvId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
const GetAllAppliedJob = async (token: string, jobId: number) => {
  return await axiosClient.get(`/application/getAll?jobId=${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export {
  GetAllAppliedJob,
  GetJobDetail,
  CreateCompany,
  PostJobCategory,
  GetAllJobCategory,
  CreateJobsCategory,
  CreatePostJob,
  GetAllJobs,
  GetAllJobByCompany,
  GetDetailsCompany,
  ApplyCompany,
};
