import axiosClient from "@/app/service/ApiClient";

const GetProfileUser = async (token: string) => {
  return await axiosClient.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export { GetProfileUser };
