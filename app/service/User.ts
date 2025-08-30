import axiosClient, { FeUrl } from "@/app/service/ApiClient";
import { Ty_Cv, Ty_profile_User, Ty_User } from "@/app/types/UserList";
const baseURL = FeUrl;
// Cache để tránh gọi lại liên tục
export const profileCache = new Map<string, Ty_profile_User | null>();

async function getInitialProfile(
  token: string | undefined
): Promise<Ty_User | null> {
  console.log("Token trong getInitialProfile:", token);
  if (!token) return null;

  // const cacheKey = token;
  // if (profileCache.has(cacheKey)) {
  //   return profileCache.get(cacheKey) as Ty_User | null;
  // }
  try {
    const response = await fetch(`${baseURL}/api/user/profile`, {
      headers: {
        Cookie: `authToken=${token}`,
      },
      cache: "no-store",
    });
    console.log("Response status từ API profile:", response.status);
    const data = await response.json();
    console.log("Data mới từ API profile:", JSON.stringify(data)); // Log dữ liệu để kiểm tra

    if (response.ok) {
      // profileCache.set(cacheKey, data); // Bỏ set cache tạm thời
      return data as Ty_User;
    } else {
      console.log("API profile lỗi:", response.statusText);
      return null;
    }
  } catch (error: any) {
    console.error("Lỗi fetch profile:", error.message);
    return null;
  }
}

const GetProfileUser = async (token: string) => {
  return await axiosClient.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const ForgotPassword = async (email: string) => {
  return await axiosClient.post("users/send-otp", { email });
};
const ResetPassword = async (email: string, otp: string, password: string) => {
  console.log(email, otp, password);
  return await axiosClient.post("users/reset-password", {
    email,
    otp,
    password,
  });
};
const UpdateProfileUser = async (formData: FormData, token: string) => {
  return await axiosClient.put(
    "/profile",
    formData, // <-- Sửa ở đây: gửi trực tiếp FormData
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//đăng bài viết
const Post = async (token: string, formData: FormData) => {
  return await axiosClient.post("/post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token} `,
    },
  });
};

const getAllPost = async () => {
  return axiosClient.get("/post/getAll?page=1&size=1000");
};

const patchLikePost = async (token: string, postId: number) => {
  return await axiosClient.patch(
    `/post/like?postId=${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// đăng bài viết hoàn vốn
const PostVolunteer = async (token: string, formData: FormData) => {
  return await axiosClient.post("/postVolunteer?page=1&size=1000", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token} `,
    },
  });
};

const GetAllPostVolunteer = async () => {
  return axiosClient.get("/postVolunteer/getAll");
};
const patchLikePostVolunteer = async (token: string, postId: number) => {
  return await axiosClient.patch(
    `/postVolunteer/like?postId=${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
// donate post Volunteer
const DonatePostVolunteer = async (token: string, id: number, fund: number) => {
  return await axiosClient.patch(
    `/postVolunteer/donate`,
    {
      postVolunteerId: id,
      amount: fund,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//get user id
const getUserId = async (id: string) => {
  return await axiosClient.get(`/users/${id}`);
};

// comment post
const CommentPost = async (
  token: string,
  postId?: number | null,
  content?: string | null
) => {
  return await axiosClient.post(
    `/comments`,
    {
      postId: postId || null,
      content: content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
const CommentPostVolunteer = async (
  token: string,
  postVolunteerId?: number | null,
  content?: string | null
) => {
  return await axiosClient.post(`/comments`, {
    postVolunteerId: postVolunteerId || null,
    content: content,
  });
};
const getAllCommentsPost = async (token: string, postId: number) => {
  return await axiosClient.get(`/comments/post/${postId}`);
};
const getCountCommentPost = async (postId: number) => {
  return await axiosClient.get(`/post/${postId}/count`);
};
const getAllCommentsPostVolunteer = async (token: string, postId: number) => {
  return await axiosClient.get(`/comments/post-volunteer/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//CV
const getAllCv = async (token: string) => {
  return await axiosClient.get("/cv/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const CreateCv = async (token: string, data: Ty_Cv) => {
  return await axiosClient.post("/cv", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export {
  ResetPassword,
  ForgotPassword,
  GetProfileUser,
  getInitialProfile,
  UpdateProfileUser,
  Post,
  getAllPost,
  PostVolunteer,
  GetAllPostVolunteer,
  DonatePostVolunteer,
  getUserId,
  patchLikePost,
  patchLikePostVolunteer,
  CommentPost,
  CommentPostVolunteer,
  getAllCommentsPost,
  getAllCommentsPostVolunteer,
  getAllCv,
  CreateCv,
  getCountCommentPost,
};
