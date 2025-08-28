"use client";
import React, { useState } from "react";
import {
  CreditCard,
  QrCode,
  DollarSign,
  History,
  Wallet,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useProfileStore } from "@/app/zustand/userStore";
import AvatarProfile from "@/app/components/AvatarProfile";
import { GetQrCode } from "@/app/service/payment";
import Image from "next/image";
import Spanning from "@/app/components/Spanning";

interface Transaction {
  id: string;
  type: "deposit" | "contribution" | "withdrawal";
  amount: number;
  description: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}
type prop = {
  token: string;
};
export const DepositPage = ({ token }: prop) => {
  const { profileUser } = useProfileStore();

  const [depositAmount, setDepositAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<"card" | "qr" | "bank">(
    "qr"
  );

  // Mock user balance and transactions
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "deposit",
      amount: 100.0,
      description: "Credit card deposit",
      status: "completed",
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      type: "contribution",
      amount: -50.0,
      description: "Contributed to John Patient - Emergency Surgery",
      status: "completed",
      createdAt: "2024-01-14T15:45:00Z",
    },
    {
      id: "3",
      type: "deposit",
      amount: 200.0,
      description: "Bank transfer deposit",
      status: "pending",
      createdAt: "2024-01-13T09:15:00Z",
    },
    {
      id: "4",
      type: "contribution",
      amount: -25.0,
      description: "Contributed to Sarah Johnson - Transportation Help",
      status: "completed",
      createdAt: "2024-01-12T14:20:00Z",
    },
  ]);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);

    if (amount > 0) {
      if (selectedMethod === "qr") {
        setIsLoading(true);
        try {
          const response = await GetQrCode(token, amount);
          if (response.status === 200) {
            const qrCodeDataUrl = response?.data.result.qr;
            setQrCodeUrl(qrCodeDataUrl);
            setShowQRCode(true);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Process other payment methods
        alert(`Processing $${amount} deposit via ${selectedMethod}`);
        setDepositAmount("");
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ví & Tiền gửi
          </h1>
          <p className="text-gray-600">
            Quản lý tiền của bạn và đóng góp để giúp đỡ những người đang gặp khó
            khăn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Balance Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-6 w-6" />
                  <span className="text-green-100">Số dư hiện tại</span>
                </div>
                <AvatarProfile
                  name={profileUser?.profile.fullName}
                  url={profileUser?.profile.profilePicture.url || ""}
                />
              </div>
              <div className="text-3xl font-bold mb-2">
                {Number(profileUser?.fund).toLocaleString() || 0} VNĐ
              </div>
              <div className="text-green-100 text-sm">Có sẵn để đóng góp</div>
            </div>

            {/* User Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin tài khoản
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Họ và tên:</span>
                  <span className="font-medium text-gray-900">
                    {profileUser?.profile.fullName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">E-mail:</span>
                  <span className="font-medium text-gray-900">
                    {profileUser?.email}
                  </span>
                </div>

                {/* <div className="flex justify-between">
                  <span className="text-gray-600">Member since:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(user?. || "").toLocaleDateString()}
                  </span>
                </div> */}
              </div>
            </div>
          </div>

          {/* Deposit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Nạp tiền
              </h2>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Chọn phương thức thanh toán
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* creadit */}
                  {/* <button
                    type="button"
                    onClick={() => setSelectedMethod("card")}
                    className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors duration-200 ${
                      selectedMethod === "card"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span className="font-medium">Thẻ tín dụng</span>
                  </button> */}
                  {/* QrCode */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("qr")}
                    className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors duration-200 ${
                      selectedMethod === "qr"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <QrCode className="h-5 w-5" />
                    <span className="font-medium">QR Code</span>
                  </button>

                  {/* bank */}
                  {/* <button
                    type="button"
                    onClick={() => setSelectedMethod("bank")}
                    className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-colors duration-200 ${
                      selectedMethod === "bank"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <DollarSign className="h-5 w-5" />
                    <span className="font-medium">Chuyển khoản ngân hàng</span>
                  </button> */}
                </div>
              </div>

              <form onSubmit={handleDeposit} className="space-y-6">
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Số tiền gửi (VNĐ)
                  </label>
                  <input
                    id="amount"
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                    placeholder="Nhập số tiền cần nạp"
                  />
                </div>

                {/* Quick Amount Buttons */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600 mr-2">
                    Số tiền nhanh:
                  </span>
                  {[25000, 50000, 100000, 250000, 500000].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDepositAmount(amount.toString())}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
                    >
                      {amount.toLocaleString()} VNĐ
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  <span>
                    {selectedMethod === "qr" ? "Quét mã QR" : "Process Deposit"}
                  </span>
                </button>
              </form>

              {/* QR Code Modal */}
              {showQRCode && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Quét mã QR để nạp tiền
                      </h3>
                      <div className="bg-gray-100 p-8 rounded-lg mb-4">
                        {/* Mock QR Code - In real app, generate actual QR code */}
                        <div className="relative w-48 h-48 mx-auto bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                          {isLoading ? (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                              <Spanning />
                            </div>
                          ) : (
                            <>
                              {qrCodeUrl ? (
                                <Image
                                  width={100}
                                  height={100}
                                  src={qrCodeUrl}
                                  alt="QR Code"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <QrCode className="h-24 w-24 text-gray-400" />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">
                        Số tiền: {Number(depositAmount).toLocaleString()} VNĐ
                      </p>
                      <p className="text-sm text-gray-500 mb-6">
                        Quét mã QR này bằng ứng dụng ngân hàng di động của bạn
                        để hoàn tất việc nạp tiền
                      </p>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setShowQRCode(false)}
                          className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
                        >
                          hủy bỏ
                        </button>
                        <button
                          onClick={() => {
                            setShowQRCode(false);
                            setDepositAmount("");
                            alert(
                              "QR code payment initiated. Please complete the payment in your banking app."
                            );
                          }}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                        >
                          Xong
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <History className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Lịch sử giao dịch
                </h2>
              </div>

              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "deposit"
                            ? "bg-green-100"
                            : transaction.type === "contribution"
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        }`}
                      >
                        {transaction.type === "deposit" && (
                          <DollarSign className="h-5 w-5 text-green-600" />
                        )}
                        {transaction.type === "contribution" && (
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        )}
                        {transaction.type === "withdrawal" && (
                          <Wallet className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.createdAt).toLocaleDateString()}{" "}
                          at{" "}
                          {new Date(transaction.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-semibold ${
                          transaction.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}$
                        {Math.abs(transaction.amount).toFixed(2)}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(transaction.status)}
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
