"use client";
import { useState } from "react";
import BoxAdding from "./Component/BoxAdding";
import Image from "next/image";

const GettingStarted = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const data: { id: number; label: string; src: string; title: string }[] = [
    {
      title: "Tìm kiếm người cần giúp đỡ",
      id: 0,
      label:
        "Chúng tôi cung cấp một hệ thống đăng tin trên trang web, nơi các cá nhân hoặc tổ chức có thể đăng thông tin về những hoàn cảnh khó khăn. Những người có nhu cầu hỗ trợ hoặc người thân của họ có thể gửi thông tin kèm theo bằng chứng xác thực.",
      src: "https://s.udemycdn.com/teaching/plan-your-curriculum-v3.jpg",
    },
    {
      title: "Xác minh thông tin",
      id: 1,
      label:
        "Sau khi tiếp nhận thông tin, đội ngũ tình nguyện viên sẽ đến tận nơi để điều tra, xác thực hoàn cảnh thực tế của người cần giúp đỡ. Chúng tôi đảm bảo rằng mọi thông tin đều minh bạch và chính xác trước khi tiến hành hỗ trợ.",
      src: "https://s.udemycdn.com/teaching/record-your-video-v3.jpg",
    },
    {
      title: "Gây quỹ minh bạch qua Blockchain",
      id: 2,
      label:
        "Sau khi xác thực, hệ thống sẽ tạo một quỹ quyên góp công khai trên nền tảng blockchain, đảm bảo mọi giao dịch được theo dõi minh bạch và rõ ràng. Người dân có thể quyên góp trực tiếp thông qua các phương thức thanh toán an toàn.",
      src: "https://s.udemycdn.com/teaching/plan-your-curriculum-v3.jpg",
    },
    {
      title: "   Hợp tác với doanh nghiệp để hỗ trợ trực tiếp",
      id: 3,
      label:
        "Bên cạnh việc kêu gọi đóng góp từ cộng đồng, chúng tôi còn liên kết với các doanh nghiệp, tổ chức từ thiện để đến tận nơi cung cấp nhu yếu phẩm, chăm sóc y tế, giáo dục và các hỗ trợ thiết thực khác.",
      src: "https://s.udemycdn.com/teaching/launch-your-course-v3.jpg",
    },
    {
      title: "Báo cáo và cập nhật tình hình",
      id: 4,
      label:
        "Mọi khoản quyên góp và tiến trình hỗ trợ sẽ được cập nhật thường xuyên trên hệ thống để đảm bảo tính minh bạch. Người đóng góp có thể theo dõi trực tiếp sự thay đổi tích cực mà họ đã góp phần tạo ra.",
      src: "https://s.udemycdn.com/teaching/plan-your-curriculum-v3.jpg",
    },
  ];

  return (
    <div className="pb-10">
      <div className="mx-auto hidden max-w-5xl flex-col px-4 py-10 text-center lg:flex">
        <h2 className="mb-6 text-3xl font-bold">
          Cách thức hoạt động quyên góp từ thiện và giúp đỡ những người khó khăn
        </h2>

        <div className="flex justify-center space-x-8 border-b">
          <button
            onClick={() => setActiveTab(0)}
            className={`font-semibold ${
              activeTab === 0 ? "border-b-1 border-black" : "text-gray-500"
            }`}
          >
            Tìm kiếm người cần giúp đỡ
          </button>
          <button
            onClick={() => setActiveTab(1)}
            className={`font-semibold ${
              activeTab === 1 ? "border-b-1 border-black" : "text-gray-500"
            }`}
          >
            Xác minh thông tin
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`font-semibold ${
              activeTab === 2 ? "border-b-1 border-black" : "text-gray-500"
            }`}
          >
            Gây quỹ minh bạch qua Blockchain
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className={`font-semibold ${
              activeTab === 3 ? "border-b-1 border-black" : "text-gray-500"
            }`}
          >
            Hợp tác với doanh nghiệp để hỗ trợ trực tiếp
          </button>
          <button
            onClick={() => setActiveTab(4)}
            className={`font-semibold ${
              activeTab === 4 ? "border-b-1 border-black" : "text-gray-500"
            }`}
          >
            Báo cáo và cập nhật tình hình
          </button>
        </div>

        <div className="mt-6">
          {data.map((i, k) => (
            <div key={i.id}>
              {activeTab === k && (
                <div className="flex justify-between gap-1">
                  <p className="text-left text-lg">{i.label}</p>
                  <Image
                    width={100}
                    height={100}
                    src={i.src}
                    alt=""
                    className="h-auto w-1/2 object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="lg:hidden">
        <h2 className="mb-2 pt-5 text-[20px] font-bold">
          Cách thức hoạt động quyên góp từ thiện và giúp đỡ những người khó khăn
        </h2>
        {data.map((i) => (
          <div key={i.id}>
            <BoxAdding label={i.label} src={i.src} title={i.title} id={i.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GettingStarted;
