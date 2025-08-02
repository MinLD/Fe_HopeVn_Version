import axiosClient from "@/app/service/ApiClient";

const exchangeCodeForToken = async (
  authCode: string
): Promise<string | null> => {
  try {
    const response = await axiosClient.post(
      `/auth/outbound/authentication?code=${authCode}`,
      {}
    );

    console.log("API response data for Google auth:", response.data);

    return response.data.result?.token || null;
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

const login = async (email: string, password: string) => {
  return await axiosClient.post("http://localhost:8080/api/auth/token", {
    email,
    password,
  });
};

export { exchangeCodeForToken, login };
