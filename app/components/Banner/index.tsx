"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import { Heart, Users, HelpingHand } from "lucide-react";
import Image from "next/image";
import bn2 from "../../../public/logo/bannerHome.jpeg";

function Banner() {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;
    const typed = new Typed(textRef.current, {
      strings: [
        "Hãy cùng nhau lan tỏa hy vọng!",
        "Giúp đỡ những người khó khăn!",
        "Mỗi hành động nhỏ mang đến sự thay đổi lớn!",
        "“Lá lành đùm lá rách”",
        "“Một miếng khi đói bằng một gói khi no”",
        "“Thương người như thể thương thân”",
        "“Bầu ơi thương lấy bí cùng, tuy rằng khác giống nhưng chung một giàn”",
        "“Nhiễu điều phủ lấy giá gương, người trong một nước phải thương nhau cùng",
        "“Đồng tiền bát gạo khi khốn khó, bằng một kho khi dư dả” ",
        "“Đỡ nhau lúc hoạn nạn, sẻ chia lúc cơ hàn”",
        "“Chia ngọt sẻ bùi”",
        "“Hạt muối cắn đôi, bát cơm sẻ nửa” ",
        "“Giúp người là giúp mình”",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      startDelay: 1000,
      backDelay: 2000,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <div className="relative flex h-[450px] w-full flex-col items-center justify-center overflow-hidden bg-[#fff] sm:h-500px] md:h-[600px]">
      {/* Image */}
      <Image
        fill
        className="absolute top-0 h-[450px]  sm:h-[500px] md:h-[600px] w-full object-cover"
        src={bn2}
        alt="Hình ảnh banner cho chiến dịch từ thiện"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 h-full bg-black opacity-50"></div>

      {/* Content */}
      <motion.div
        className="absolute z-10 flex flex-col items-center px-4 text-center text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div>
          <h1 className="text-lg font-bold drop-shadow-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            Chung tay trao yêu thương và Thắp sáng hy vọng
          </h1>
          <p className="mt-2 text-sm font-semibold sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            <span ref={textRef}></span>
          </p>
          <p className="mt-2 text-sm font-semibold sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Ngày 04 tháng 04 Năm 2025
          </p>

          <button
            className="mt-4 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-bold shadow-lg transition hover:bg-yellow-600 sm:text-base md:text-lg"
            aria-label="Tham gia chiến dịch từ thiện"
          >
            Tham gia ngay
          </button>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-[0]  left-1/2 z-10 flex w-[90%] -translate-x-1/2 transform items-center justify-center rounded-t bg-[#fdf1e3] p-4 shadow-lg sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[60%]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-3 gap-2 text-center sm:gap-4">
          <div className="flex flex-col items-center">
            <Heart className="text-red-500" size={20} />
            <p className="mt-1 text-[10px] font-semibold text-gray-700 sm:text-xs md:text-sm">
              Giúp đỡ người khó khăn
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="text-blue-500" size={20} />
            <p className="mt-1 text-[10px] font-semibold text-gray-700 sm:text-xs md:text-sm">
              Hỗ trợ người tìm việc
            </p>
          </div>
          <div className="flex flex-col items-center">
            <HelpingHand className="text-green-500" size={20} />
            <p className="mt-1 text-[10px] font-semibold text-gray-700 sm:text-xs md:text-sm">
              Đồng hành cùng người khuyết tật
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Banner;
