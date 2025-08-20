"use client";
import Spanning from "@/app/components/Spanning";
import { DonatePostVolunteer } from "@/app/service/User";
import Button from "@/app/ui/Button";
import { Dog, Heart, Shield, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  onClose: () => void;
  idPostVolunteer: number;
  token: string;
};
interface DonationData {
  amount: string;
  message: string;
  anonymous: boolean;
  paymentMethod: "bank" | "momo" | "zalopay" | "card";
  donorName: string;
  donorEmail: string;
  donorPhone: string;
}

function DonateCart({ onClose, idPostVolunteer, token }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [donationData, setDonationData] = useState<DonationData>({
    amount: "",
    message: "",
    anonymous: false,
    paymentMethod: "bank",
    donorName: "",
    donorEmail: "",
    donorPhone: "",
  });
  const quickAmounts = [
    10000, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000,
  ];
  const handleInputChange = (
    field: keyof DonationData,
    value: string | boolean
  ) => {
    setDonationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleDonate = async () => {
    if (!donationData.amount) return;
    if (Number(donationData.amount) < 10000) {
      toast.error("Số tiền phải lớn hơn 10.000 VNĐ");
    }
    setIsLoading(true);
    await DonatePostVolunteer(
      token,
      idPostVolunteer,
      Number(donationData.amount) || 0
    )
      .then((res) => {
        router.refresh();
        console.log(res);
        toast.success("Bạn đã quyên góp thành công");
        setIsLoading(false);
        onClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message || "An error occurred");
        setIsLoading(false);
      });
  };
  return (
    <div className="fixed flex items-center justify-center z-50 inset-0 bg-[rgba(0,0,0,0.5)]">
      <div className="bg-white text-black font-bold py-5 px-5 rounded w-[60vh] h-[60vh]">
        <div className="flex justify-between items-center ">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quyên góp</h1>
              <p className="text-gray-600">Giúp Luân Đỗ với yêu cầu của họ</p>
            </div>
          </div>
          <span onClick={onClose}>
            <XIcon />
          </span>
        </div>
        <div className="max-h-[38vh] overflow-y-auto  scrollbar mt-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 px-2 gap-8">
            {/* Donation Form */}
            <div className="lg:col-span-2 ">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Số tiền quyên góp (VND) *
                </label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() =>
                        handleInputChange("amount", amount.toString())
                      }
                      className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                        donationData.amount === amount.toString()
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-300 hover:border-green-300"
                      }`}
                    >
                      {amount.toLocaleString()} VND
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <Dog className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    required
                    min="10000"
                    value={donationData.amount}
                    onChange={(e) =>
                      handleInputChange("amount", e.target.value)
                    }
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Nhập số tiền tùy chỉnh (tối thiểu 10,000 VND)"
                  />
                </div>{" "}
                {/* Security Notice */}
                <div className="bg-blue-50 p-4 rounded-lg mt-4 mb-5">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">
                        Quyên góp an toàn
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Khoản quyên góp của bạn được xử lý an toàn. Chúng tôi sử
                        dụng mã hóa tiêu chuẩn công nghiệp để bảo vệ thông tin
                        cá nhân và thông tin thanh toán của bạn.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <Button
          type="submit"
          disabled={
            !donationData.amount ||
            isLoading ||
            parseInt(donationData.amount) < 10000
          }
          className="w-full"
          size="lg"
          onClick={() => handleDonate()}
        >
          {isLoading ? <Spanning /> : "Quyên góp"}
        </Button>
      </div>
    </div>
  );
}

export default DonateCart;
