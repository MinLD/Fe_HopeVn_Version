// File: services/messageService.ts

import axiosClient, { baseUrl } from "@/app/service/ApiClient";
import { GetMessageRequest, MessageResponse } from "@/app/types/message";

const API_URL = baseUrl;

async function getMessageHistory(
  token: string,
  requestData: GetMessageRequest
): Promise<MessageResponse[]> {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: "GET", // Đổi thành POST để gửi body
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) throw new Error("Không thể tải lịch sử tin nhắn");

    const data = await response.json();
    return data.result || [];
  } catch (error) {
    console.error("Lỗi khi tải lịch sử tin nhắn:", error);
    return [];
  }
}

const AddMessageBox = async (token: string, receiverEmail: string) => {
  return await axiosClient.get(`/message-boxes/with/${receiverEmail}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const GetAllUsersIbed = async (token: string) => {
  return await axiosClient.get("/message-boxes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getMessageHistory, AddMessageBox, GetAllUsersIbed };
