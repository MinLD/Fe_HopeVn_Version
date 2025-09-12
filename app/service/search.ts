import axiosClient from "@/app/service/ApiClient";

const SearchAll = async (keyword: string) => {
  return await axiosClient.get(`/search/all?keyword=${keyword}`);
};

export { SearchAll };
