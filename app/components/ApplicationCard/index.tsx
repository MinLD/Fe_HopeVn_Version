"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { Ty_CvApplied } from "@/app/types/UserList";
import Button from "@/app/ui/Button";
import Portal from "@/app/components/Portal";
import ViewCvCart from "@/app/components/ViewCvCart";
import Image from "next/image";

type Props = {
  image: string;
  cvForm: Ty_CvApplied;
};

function ApplicationCart({ image, cvForm }: Props) {
  const [isShowCvForm, setIsShowCvForm] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200">
        <div className="flex items-center space-x-4">
          <Image
            width={40}
            height={40}
            src={image}
            alt="Applicant"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="max-w-xl">
            <h4 className="font-semibold text-gray-900">{cvForm.userName}</h4>
            <p className="text-sm text-gray-600 line-clamp-1">{cvForm.skill}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 self-end sm:self-auto ">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsShowCvForm(true)}
          >
            Xem CV
          </Button>
          <Button variant="primary" size="sm" className="cursor-pointer">
            Nhắn tin
          </Button>
        </div>
      </div>

      {isShowCvForm && (
        <Portal>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsShowCvForm(false)}
              aria-hidden="true"
            ></div>
            <div
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-lg flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-[#c5c5c5]">
                <h2 className="text-xl font-semibold text-gray-800">
                  Hồ sơ ứng viên: {cvForm.userName}
                </h2>
                <button
                  onClick={() => setIsShowCvForm(false)}
                  className="p-1 text-gray-500 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="Đóng"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-grow p-6 overflow-y-auto">
                <ViewCvCart cv={cvForm} />
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

export default ApplicationCart;
