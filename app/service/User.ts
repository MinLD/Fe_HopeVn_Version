import axiosClient from "@/app/service/ApiClient";
import { headers } from "next/headers";

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
    const response = await fetch("http://localhost:3000/api/user/profile", {
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
  return axiosClient.get("/post/getAll");
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
  return await axiosClient.post("/postVolunteer", formData, {
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
  return await axiosClient.post(
    `/comments`,
    {
      postVolunteerId: postVolunteerId || null,
      content: content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
const getAllCommentsPost = async (token: string, postId: number) => {
  return await axiosClient.get(`/comments/post/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const getAllCommentsPostVolunteer = async (token: string, postId: number) => {
  return await axiosClient.get(`/comments/post-volunteer/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export {
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
};
