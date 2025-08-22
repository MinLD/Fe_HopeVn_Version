import axiosClient from "@/app/service/ApiClient";

const exchangeCodeForToken = async (
  authCode: string
): Promise<string | null | any> => {
  try {
    const response = await axiosClient.post(
      `/auth/outbound/authentication?code=${authCode}`,
      {}
    );

    console.log("API response data for Google auth:", response.data.result);

    return {
      token: response.data.result.token,
      refreshToken: response.data.result.refreshToken,
    };
  } catch (error: any) {
    console.error(
      "Error exchanging code for Google token:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to exchange Google code for token."
    );
  }
};

const login_Api = async (email: string, password: string) => {
  return await axiosClient.post("/auth/token", {
    email,
    password,
  });
};
const register_Api = async (
  email: string,
  password: string,
  fullName: string
) => {
  return await axiosClient.post("/users", {
    email,
    password,
    fullName,
  });
};

const GetRoles_Api = async (token: string) => {
  return fetch(`https://fe-hope-vn-version.vercel.app/api/get-roles`, {
    method: "GET",
    headers: {
      Cookie: `authToken=${token}`,
    },
  });
};

export { exchangeCodeForToken, login_Api, GetRoles_Api, register_Api };
