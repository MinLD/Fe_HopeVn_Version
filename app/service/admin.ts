import axiosClient from "@/app/service/ApiClient";

const GetAllUsers = async (token: string) => {
  return await axiosClient.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const DeleteUsers = async (token: string, id: string) => {
  return await axiosClient.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const UpdateUsers = async (token: string, formData: FormData, id: string) => {
  return await axiosClient.put(`/users/${id}`, {
    formData,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
const CreateUsers = async (token: string, data: any) => {
  console.log(token, data);
  return await axiosClient.post("/users", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const BanUsers = async (token: string, id: string, accepted: boolean) => {
  console.log(token, id, accepted);
  return await axiosClient.patch(
    `/users/ban/${id}`,
    {
      userId: id,
      isBanned: accepted,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// company

const GetAllCompany_non_Active = async (token: string) => {
  return await axiosClient.get("/company/non-active", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const ActiveCompany = async (token: string, id: string) => {
  console.log(token);
  return await axiosClient.patch(
    `/company/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// post Volunteer
const GetAllPostVolunteer_non_Active = async (token: string) => {
  return await axiosClient.get("/postVolunteer/non-active", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const ActivePostVolunteer = async (token: string, id: number, fund: number) => {
  console.log(token);
  return await axiosClient.patch(
    `/postVolunteer`,
    {
      postVolunteerId: id,
      fund: fund,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
//post
const GetAllPost_non_Active = async (token: string) => {
  return await axiosClient.get("/post/non-active", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const ActivePost = async (token: string, id: number) => {
  console.log(token);
  return await axiosClient.patch(
    `/post/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export {
  GetAllUsers,
  DeleteUsers,
  UpdateUsers,
  CreateUsers,
  BanUsers,
  GetAllCompany_non_Active,
  ActiveCompany,
  GetAllPostVolunteer_non_Active,
  ActivePostVolunteer,
  GetAllPost_non_Active,
  ActivePost,
};
