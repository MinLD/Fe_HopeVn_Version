import axiosClient from "@/app/service/ApiClient";

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
const GetAllJobs = async (token: string) => {
  return await axiosClient.get("/job/getAll");
};

const GetJobDetail = async (token: string, id: string) => {
  if (!token || !id) return;
  return await axiosClient.get(`/job/detail?jobId=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const GetAllJobByCompany = async (token: string) => {
  return await axiosClient.get("/job/company", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  GetJobDetail,
  CreateCompany,
  PostJobCategory,
  GetAllJobCategory,
  CreateJobsCategory,
  CreatePostJob,
  GetAllJobs,
  GetAllJobByCompany,
};
