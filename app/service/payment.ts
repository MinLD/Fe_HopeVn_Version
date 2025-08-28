import axiosClient from "@/app/service/ApiClient";

const GetQrCode = async (token: string, amount: number) => {
  return await axiosClient.get(`hooks/sepay-payment/qr?amount=${amount}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { GetQrCode };
