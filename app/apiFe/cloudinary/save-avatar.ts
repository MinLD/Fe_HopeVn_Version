import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ error: "Thiếu publicId" });
    }

    try {
      const response = await fetch("https://your-backend-api/save-avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi gửi publicId đến backend");
      }

      res.status(200).json({ message: "Lưu publicId thành công" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
